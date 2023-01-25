const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config=require('./config');

const db = require('./db');

const app= express();

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//app.use('/',express.static(config.FRONTEND_DIR))


require('./resources/users/users.controller').addRoutesTo(app);
/*require('./resources/items/items.controller').addRoutesItemsTo(app)
require('./resources/claves/claves.controller').addRoutesClavesTo(app)*/



const start = async () => {
	await db.connect();
	app.listen(config.SERVER_PORT, () => {
	  const mode = config.NODE_ENV.toUpperCase();
	  console.log(`PMI API Server (mode ${mode}) listening on port :${config.SERVER_PORT}`);
	});
  };
  
start();
console.log("server.js finished")