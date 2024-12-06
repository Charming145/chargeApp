const username = "Mario";
const password = "mario1";

exports.confirmPassword = (data, done) => {
  if (username === data.username && password === data.password)
    return done(true);
  return done(false);
};
