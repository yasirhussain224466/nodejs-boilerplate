const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const APIFeatures = require("./../utils/apiFeatures");
const appConfig = require("../config/appConfig");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/email");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError(req.t("No document found with that ID"), 404));
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError(req.t("No document found with that ID"), 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: doc,
    });
  });

exports.getRelatedDocuments = (Model, sourceKey, popOptions) =>
  catchAsync(async (req, res, next) => {
    if (!Model || typeof sourceKey !== "string") {
      return next(new AppError("Invalid Model or sourceKey", 400));
    }

    const SourceId = req.params.id;
    let queryObj = { [sourceKey]: SourceId };
    let query = Model.find(queryObj);

    if (popOptions) {
      query = query.populate(popOptions);
    }

    const features = new APIFeatures(query, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const relatedDocuments = await features.query;

    if (!relatedDocuments) {
      return next(new AppError(req.t("No document found with that ID"), 404));
    }

    res.status(200).json({
      status: "success",
      data: relatedDocuments,
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return next(new AppError(req.t("No document found with that ID"), 404));
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  });

exports.getAll = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    if (!Model) {
      return next(new AppError("Invalid Model", 400));
    }

    const baseFeatures = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort();

    const totalDocCount = await Model.countDocuments(
      baseFeatures.query.getFilter()
    );

    const features = baseFeatures.limitFields().paginate();

    let doc = [];

    if (popOptions) {
      doc = await features.query.populate(popOptions);
    } else {
      doc = await features.query;
    }

    res.status(200).json({
      results: totalDocCount,
      status: "success",
      data: doc,
    });
  });

const signToken = (id) => {
  return jwt.sign({ id }, appConfig.JWT_SECRET, {
    expiresIn: appConfig.JWT_EXPIRES_IN,
  });
};

exports.createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user?._id);

  res.cookie("jwt_token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: true,
    httpOnly: false,
    sameSite: "None",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

async function handleMobileReset(user, email, emailTemplates, template) {
  const resetCode = user.createPasswordResetCode();
  await user.save({ validateBeforeSave: false });
  await sendEmail({
    recipientEmail: email,
    subject: emailTemplates.mobile_password_reset.subject(user),
    bodyHTML: template.defaultTemplate({
      content: emailTemplates.mobile_password_reset.body({
        ...user,
        reset_code: resetCode,
      }),
      buttonText: req.t("Reset Password"),
      buttonLink: resetCode,
    }),
  });
}

async function handleWebReset(user, email, emailTemplates, template) {
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  const resetURL = `${appConfig.HOST_URL}/new-password?token=${resetToken}`;
  await sendEmail({
    recipientEmail: email,
    subject: emailTemplates.password_reset.subject(user),
    bodyHTML: template.defaultTemplate({
      content: emailTemplates.password_reset.body(user),
      buttonText: req.t("Reset Password"),
      buttonLink: resetURL,
    }),
  });
}

exports.handleMobileReset = handleMobileReset;
exports.handleWebReset = handleWebReset;
