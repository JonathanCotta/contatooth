var passport = require('passport');
var mongoose = require('mongoose');
var GitHubStrategy = require('passport-github').Strategy;

var Usuario = mongoose.model('Usuario');

passport.use(
	new GitHubStrategy(
		{
			clientID: '24733a38bb806ac7ef49',
			clientSecret: 'ef44fd49b6da5c7ae16b0cb50a91429ca8f7bedb',
			callbackURL: 'http://localhost:3000/auth/github/callback'
		},
		function(accessToken, refreshToken, profile, done) {
			Usuario.findOrCreate({ login: profile.username }, { nome: profile.username }, function(erro, usuario) {
				if (erro) {
					console.log(erro);
					return done(erro);
				} else {
					return done(null, usuario);
				}
			});
		}
	)
);

passport.serializeUser(function(usuario, done) {
	done(null, usuario._id);
});

passport.deserializeUser(function(id, done) {
	Usuario.findById(id).exec().then(function(usuario) {
		done(null, usuario);
	});
});

module.exports = passport;
