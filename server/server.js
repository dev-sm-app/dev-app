require('dotenv').config();
const express = require('express');
const axios = require('axios');
const massive = require('massive');
const bodyParser = require('body-parser');
const session = require('express-session');
const user = require('./controller/Usercontroller');
const friend = require('./controller/Friendcontroller');

