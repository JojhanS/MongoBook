const { Schema, Types } = require('mongoose');

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
  // Getter
  .get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;
