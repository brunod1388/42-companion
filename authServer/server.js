// const express = require("express")
// const bodyParser = require("body-parser")
// const oauthServer = require("oauth2-server")
// const Request = oauthServer.Request
// const Response = oauthServer.Response

// const app = express()

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))

// // Create an OAuth2 server object, this will allow
// // us to create and manage clients and users.
// const oauth = new oauthServer({
//   model: require("./model"), // See https://github.com/oauthjs/node-oauth2-server for specification
// })

// // Post token.
// app.post("/oauth/token", (req, res) => {
//   const request = new Request(req)
//   const response = new Response(res)

//   console.log("request", request)
//   oauth
//     .token(request, response)
//     .then((token) => {
//       // Todo: remove unnecessary values in response
//       return res.json(token)
//     })
//     .catch((err) => {
//       return res.status(500).json(err)
//     })
// })

// app.listen(3000)

var passport = require('passport');
var FortyTwoStrategy = require('passport-42').Strategy;

const FORTYTWO_APP_ID = 'u-s4t2ud-d551e084d3aeffa9c29cf946de33a5e520e4c81e25acbe66ee5168fd517a3899';
const FORTYTWO_APP_SECRET = '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';

passport.use(
  new FortyTwoStrategy(
    {
      clientID: FORTYTWO_APP_ID,
      clientSecret: FORTYTWO_APP_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/42/callback'
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ fortytwoId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);

const app = express();

app.use(passport.initialize());

app.get('/auth/42', passport.authenticate('42'));

app.get('/auth/42/callback', passport.authenticate('42', { failureRedirect: '/login' }), function (req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
