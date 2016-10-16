/**
 * Created by xc- on 16.10.2016.
 */
const express = require('express');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

const routes = require('./routeConfig');

const SELF_NAME = 'CentralAuth';

const CENTRAL_GOVERNOR_ADDRESS = 'http://127.0.0.1';
const CENTRAL_GOVERNOR_PORT = '12000';
const CENTRAL_GOVERNOR_PATH = '/api/cgov/services/';

const central_governor_connection = `${CENTRAL_GOVERNOR_ADDRESS}:${CENTRAL_GOVERNOR_PORT}${CENTRAL_GOVERNOR_PATH}`;

const MONGODB_ADDRESS = 'mongodb://localhost';
const MONGODB_PORT = '27017';
const MONGODB_DATABASE = 'CentralAuth';
const MONGODB_REPLICASET = undefined;

var connection_string = `${MONGODB_ADDRESS}:${MONGODB_PORT}/${MONGODB_DATABASE}`;
if (MONGODB_REPLICASET) {
  connection_string += `?replicaSet=${MONGODB_REPLICASET}`
}
mongoose.Promise = global.Promise;

mongoose.connect(connection_string);

const db = mongoose.connection;

function cgovFetchFailure(reason) {
  console.log(reason);
  console.error('Fetching the configuration failed. Exiting...');
  process.exit(1);
}

db.on('error', (error) => {
  console.error('Connection error: ', error);
  process.exit(1);
});

db.once('open', () => {
  fetch(`${central_governor_connection}${SELF_NAME}`)
    .then((response) => {
      if (response.status >= 400) return cgovFetchFailure(response.status);
      return response.json();
    })
    .then((response) => {
      const app = routes(express(), response.prefix);
      const port = response.port || 3132;
      console.log(response);
      app.listen(port, (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.info(`Listening port: ${port}`)
      })
    })
    .catch(cgovFetchFailure)
});
