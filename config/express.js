var express = require('express');
//var home = require("../routes/home");
var load = require('express-load');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var helmet = require('helmet');

module.exports = function() {
	var app = express();

	app.set('port', 3000);

	app.use(morgan('dev'));

	app.use(cookieParser());
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use(
		session({
			secret: 'homem aveztruz',
			resave: true,
			saveUninitialized: true
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.use(helmet());
	app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' }));
	app.use(helmet.frameguard());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.disable('x-powered-by');

	app.use(express.static('./public'));

	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	app.use(methodOverride());

	load('models', { cwd: 'app' }).then('controllers').then('routes/auth.js').then('routes').into(app);

	app.get('*', function(req, res) {
		res.status(404).render('404');
	});

	return app;
};
