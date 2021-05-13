const logger = require('./logger')
const atob = require('atob')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
    next()
  } else {
    response.status(400).send({
      error: 'no authorization token'
    }).end()
    // next()
  }
}

const userExtractor = (request, response, next) => {

  parseJwt = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    const decoded = JSON.parse(atob(base64));
    return decoded.username;
  }

  if (request.token) {
    request.user = parseJwt(request.token)
  }
  next()
}


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// const errorHandler = (error, request, response, next) => {
//   logger.error(error.message)

//   if (error.name === 'CastError') {
//     return response.status(400).send({
//       error: 'malformatted id'
//     })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({
//       error: error.message
//     })
//   } else if (error.name === 'JsonWebTokenError') {
//     return response.status(401).json({
//       error: 'invalid token'
//     })
//   } else if (error.name === 'TokenExpiredError') {
//     return response.status(401).json({
//       error: 'token expired'
//     })
//   }
//   logger.error(error.message)

//   next(error)
// }

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}