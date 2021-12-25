var mongoose = require("mongoose");

var FormSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: String,

    description: {
      type: String,
      default: "",
    },

    questions: [
      {
        type: {
          type: String,
          default: "",
        },
        questionText: String,
        options: [
          {
            optionText: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;
