const { Schema, model } = require('mongoose');

const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        //user that created the thought
        type: String,
        required: true,
    },
    reactions: {
        //array of nested documents craeted with the reaction schema
      },
  },
  {
    toJSON: {
        virtuals: true
    }
  }
);

// virtual that retrieves the length of the thought's reactions array field on query
thoughtsSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.reactions.length;
  });

const Thoughts = model('thoughts', thoughtsSchema);

module.exports = Thoughts;
