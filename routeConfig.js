/**
 * Created by xc- on 16.10.2016.
 */
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

module.exports = (app, prefix) => {
  app.use(cors());
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.get(`/${prefix}/`, (req, res) => {
    return res.status(418).json({
      message: 'I\'m a little teapot short and stout...'
    })
  });

  return app;
};
