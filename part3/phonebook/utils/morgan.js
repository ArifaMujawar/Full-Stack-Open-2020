
const morgan = require("morgan");


//app.use(morgan('tiny'));

morgan.token("host", function (req, res) {
  return JSON.stringify(req.body);
});
morgan(":method :url :status :res[content-length] - :response-time ms :host")
module.exports = {}