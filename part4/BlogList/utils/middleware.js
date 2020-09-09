const logger = require("./logger");


const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};
const unknownEndpoint = (req, res) => {
  res.status(404).send({
    error: 'unknown endpoint'
  })
}

const tokenExtractor = (request, response, next) => {
  
  const auth = request.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer')){
    request.token = auth.substring(7)
  }
  next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
    if (error.name === "CaseError") {
      return response.status(400).send({
        error: 'malformatted id'
      })
    } else if (error.name === "Validation error") {
      return response.status(400).json({
        error: error.message
      })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
      
    }
    logger.error(error.message)
    next(error)
  }
    module.exports = {
      requestLogger,
      unknownEndpoint,
      errorHandler,
      tokenExtractor
    };