const crypto = require("crypto");
const User = require("../../models/user");
const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const { createSendToken } = require("../handlerFactory");
const appConfig = require("../../config/appConfig");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const factory = require("../handlerFactory");

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email_address: req.body.email_address,
    password: req.body.password,
    type: req.body.type,
  });

  createSendToken(newUser, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email_address, password } = req.body;

  if (!email_address || !password) {
    return next(new AppError(req.t("Please enter email and password!"), 400));
  }

  const user = await User.findOne({ email_address }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(req.t("Incorrect email or password"), 401));
  }

  createSendToken(user, 200, req, res);
});

exports.checkEmail = catchAsync(async (req, res, next) => {
  const { email_address } = req.body;

  if (!email_address) {
    return next(new AppError(req.t("Please enter email"), 400));
  }
  const user = await User.findOne({ email_address });

  if (!user) {
    return next(
      new AppError(req.t(`Incorrect email! Your email doesn't exists`), 401)
    );
  }

  res.status(200).json({
    status: "success",
  });
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt_token) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt_token,
        appConfig.JWT_SECRET
      );
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }

      if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next();
      }

      res.status(200).json({
        status: "success",
        data: currentUser,
      });
    } catch (err) {
      console.log(err);
      return next();
    }
  } else {
    res.status(400).json({
      status: "fail",
      message: "Cookie expired! Please log in again.",
    });
  }
});

exports.logout = (req, res) => {
  res.cookie("jwt_token", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt_token) {
    token = req.cookies.jwt_token;
  }

  if (!token) {
    return next(
      new AppError(
        req.t("You are not logged in! Please log in to get access."),
        401
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, appConfig.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        req.t("The user belonging to this token does no longer exist."),
        401
      )
    );
  }

  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        req.t("User recently changed password! Please log in again."),
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email_address } = req.body;
  const user = await User.findOne({ email_address });
  if (!user) {
    return next(
      new AppError(req.t("There is no user with email address."), 404)
    );
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    // send resetToken by email
    res.status(200).json({
      status: "success",
      message: "Please check your email for password reset instructions.",
      token: resetToken,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        req.t("There was an error sending the email. Try again later!")
      ),
      500
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError(req.t("Token is invalid or has expired"), 400));
  }
  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  res.status(200).json({
    status: "success",
    message: "Your password has been reset successfully!",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError(req.t("Your current password is wrong."), 401));
  }
  user.password = req.body.password;
  await user.save();

  createSendToken(user, 200, req, res);
});
