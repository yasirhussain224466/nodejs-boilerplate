const AppError = require("./../utils/appError");
const appConfig = require("../config/appConfig");

const handleCastErrorDB = (err, req) => {
  const message = `${req.t("Invalid")} ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err, req) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const errorType = Object.keys(err?.keyPattern)?.[0];
  let message = `${req.t("Duplicate field value:")} ${value}. ${req.t(
    "Please use another value!"
  )}`;

  if (errorType === "email_address") {
    message = `${req.t("*Please check your email, and try again")}`;
  }

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err, req) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `${req.t("Invalid input data.")} ${req.t(errors.join(". "))}`;
  return new AppError(message, 400);
};

const handleJWTError = (req) =>
  new AppError(req.t("Invalid token. Please log in again!"), 401);

const handleJWTExpiredError = (req) =>
  new AppError(req.t("Your token has expired! Please log in again."), 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  console.error("ERROR 💥", err);
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message: req.t("Something went very wrong!"),
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: req.t("Something went wrong!"),
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: req.t("Something went wrong!"),
    msg: req.t("Please try again later."),
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (appConfig.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (appConfig.NODE_ENV === "production") {
    if (err?.name === "CastError") err = handleCastErrorDB(err, req);
    if (err?.code === 11000) err = handleDuplicateFieldsDB(err, req);
    if (err?.name === "ValidationError")
      err = handleValidationErrorDB(err, req);
    if (err?.name === "JsonWebTokenError") err = handleJWTError(req);
    if (err?.name === "TokenExpiredError") err = handleJWTExpiredError(req);

    sendErrorProd(err, req, res);
  }
};
