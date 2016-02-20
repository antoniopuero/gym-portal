import config from './config';
import nconf from 'nconf';
import _ from 'lodash';
import fs from 'fs';

let env = process.env.NODE_ENV || 'development';

let {defaults} = config;

let current = config[env];

if (!current) {
  throw new Error(`Can't find config for NODE_ENV=${env}`);
}

let result = _.merge({env: env}, defaults, current);

if (fs.existsSync(`${__dirname}/config.local.js`)) {
    let local = require('./config.local');
    result = _.merge(result, local);
}

console.log(result);

export default nconf.defaults(result);
