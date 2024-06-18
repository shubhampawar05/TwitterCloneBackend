const passport = require("passport");
const dotenv = require("dotenv");
const usersModel = require("./../models/user")
dotenv.config();

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtSecretKey = process.env.JWTKEY;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = jwtSecretKey;

const strategy = new JwtStrategy(opts, async function (jwt_payload, done) {
  const userId = jwt_payload.id;
  const user = await usersModel.findById(userId);
  if (!user) {
    return done("Invalid user", false);
  }
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
});

passport.use(strategy);

module.exports = passport;
