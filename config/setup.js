global.randomstring = require("randomstring");
global.chai = require('chai');
global.should = chai.should();
global.server = `http://${process.env.NODE_ENV}.airwallex.com:30001`;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);