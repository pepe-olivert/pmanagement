const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config=require('./config');



const app= express();

app.disable('x-powered-by');
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
//app.use('/',express.static(config.FRONTEND_DIR))

app.use("/pmi", require("./pmi"));
//require('./resources/users/users.controller').addRoutesTo(app);





app.listen(config.SERVER_PORT, () => {
	const mode = config.NODE_ENV;
	console.log(`PMI API Server (mode ${mode}) listening on port :${config.SERVER_PORT}`);
});

  

console.log("server.js finished")

