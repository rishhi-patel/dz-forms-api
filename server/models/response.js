var mongoose = require("mongoose");

var ResponseSchema = new mongoose.Schema(
  {
    formId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },

    userEmail: {
      type: String,
    },

    response: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Response = mongoose.model("Response", ResponseSchema);

module.exports = Response;
