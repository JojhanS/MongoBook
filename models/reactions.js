const { Schema, Types } = require('mongoose');


//NOT A MODEL
//will be used as the reactions fields subdocument schema in the thought model
const responseSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    responseBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
);

module.exports = responseSchema;
