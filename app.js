const express = require("express");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const cors = require("cors");
const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");

const AppError = require("./utils/appError");

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/user");

const enTranslations = require("./utils/translation/en.json");
const esTranslations = require("./utils/translation/es.json");
const appConfig = require("./config/appConfig");

const resources = {
  en: { translation: enTranslations },
  es: { translation: esTranslations },
};

// Start express app
const app = express();

app.enable("trust proxy");

app.use(
  cors({
    origin: true,
    credentials: true,
    optionsSuccessStatus: 204,
    allowedHeaders: ["Content-Type", "Authorization", "Cache-Control"],
  })
);

// Set security HTTP headers
app.use(helmet());

// Development logging
if (appConfig.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.get("/", (_, res) => {
  res.status(200).send("Welcome to Server. use /api to access routes");
});

app.use("/api", limiter);

app.get("/health", (_, res) => {
  res.status(200).send("Server is running");
});

// Body parser, reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

i18next.use(i18nextMiddleware.LanguageDetector).init({
  resources,
  fallbackLng: "en",
  detection: {
    order: ["header"],
    lookupHeader: "accept-language",
  },
});

app.use(i18nextMiddleware.handle(i18next));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/users", userRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
