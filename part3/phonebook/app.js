const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");

const personRouter = require("./controllers/persons");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const morgan = require('./utils/morgan')

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    console.log('error MESS ', error)
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use(middleware.requestLogger);

app.use("/api/persons", personRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
//app.use(morgan);
module.exports = app;
