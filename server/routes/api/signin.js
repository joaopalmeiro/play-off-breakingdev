const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  /*
   * Sign up
   */

  app.post('/api/account/signup', (req, res, next) => {
    const {
      body
    } = req;

    const {
      username,
      password
    } = body;

    let {
      email
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: "Error: Username cannot be blank."
      });
    }

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }

    email = email.toLowerCase();

    // Steps:
    // 1. Verify email doesn't exist
    // 2. Save
    User.find({
      email: email
    }, (err, previousUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: "Error: Server error."
        });
      } else if (previousUsers.length > 0) {
        return res.send({
          success: false,
          message: "Error: Account already exists."
        });
      }

      // Save the new user
      const newUser = new User();

      newUser.email = email;
      newUser.username = username;
      newUser.password = newUser.generateHash(password);
      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: "Error: Server error."
          });
        }

        return res.send({
          success: true,
          message: "Signed up!"
        });
      })
    });
  });

  /*
   * Sign in
   */

  app.post('/api/account/signin', (req, res, next) => {
    const {
      body
    } = req;

    const {
      password
    } = body;

    let {
      email
    } = body;

    if (!email) {
      return res.send({
        success: false,
        message: "Error: Email cannot be blank."
      });
    }

    if (!password) {
      return res.send({
        success: false,
        message: "Error: Password cannot be blank."
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }

      if (users.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid user.'
        });
      }

      const user = users[0];

      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid password.'
        });
      }

      // Otherwise correct user
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.username = user.username;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          });
        }

        return res.send({
          success: true,
          message: 'Valid sign in!',
          token: doc._id,
          user: user.username
        });
      });
    });


  });

  /*
   * Verify
   */

  app.get('/api/account/verify', (req, res, next) => {
    // Get the token
    const {
      query
    } = req;
    const {
      token
    } = query;
    //?token=test

    // Verify the token is one of a kind and it's not deleted.
    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }

      if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid session.'
        });
      } else {
        return res.send({
          success: true,
          message: 'Valid session!',
          username: sessions[0].username
        });
      }
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    // Get the token
    const {
      query
    } = req;
    const {
      token
    } = query;
    //?token=test

    // Verify the token is one of a kind and it's not deleted.
    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true
      }
    }, null, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }

      return res.send({
        success: true,
        message: 'Bye!'
      });
    });
  });
};
