
module.exports = {
    development: {
      root: require('path').normalize(__dirname + '/..'),
      app: {
        name: 'Advanced Todo List'
      },
      db: 'mongodb://localhost/todo',
      facebook: {
          clientID: "1472449532971224"
        , clientSecret: "c0e2d6e47d8799bddec65b42d848b69f"
        , callbackURL: "http://localhost:8180/auth/facebook/callback"
      },
      twitter: {
          clientID: "FZRhtrp7GLrinmuxMMOkBg"
        , clientSecret: "qneTskQ7dsGmWl4rSIgbRT1POSM3T7FjpIGIUL8U"
        , callbackURL: "http://localhost:8180/auth/twitter/callback"
      }
    }
  , test: {

    }
  , production: {

    }
}
