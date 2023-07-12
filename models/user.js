const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /.+\@.+\..+/,
    },
    thoughts: {
        //array of id referencing to thought model
    },
    friends: {
        //array of id referencing the user model
      },
  },
  {
    toJSON: {
        virtuals: true
    }
  }
);

//virtual that retrieves the length of the users friends array field on query
userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends ? this.friends.length : 0;
  });

const User = model('user', userSchema);

module.exports = User;
