import app from '../app'

export default (responses) => {
  responses.History = responses.History.skip(1)
  return app(responses)
}