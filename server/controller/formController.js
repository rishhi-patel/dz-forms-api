const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Form = require("../models/forms");

// @desc    create form
// @route   get /api/forms
// @access  Private

const createForm = asyncHandler(async (req, res) => {
  // const { _id } = url.parse(req.url, true).query;
  const { _id } = req.body;
  const user = await User.findOne({ _id });

  if (user) {
    const form = await Form.create({
      createdBy: _id,
      name: "untitled",
      description: "",
      questions: [],
    });
    res.status(200).json({
      form,
    });
  } else {
    res.status(400);
    throw new Error("user Not found");
  }
});

// @desc    update form
// @route   get /api/forms
// @access  Private

const updateForm = asyncHandler(async (req, res) => {
  // const { _id } = url.parse(req.url, true).query;
  const { _id, name, description, questions } = req.body;
  const form = await Form.findOne({ _id });

  if (form) {
    form.name = name;
    form.description = description;
    form.questions = questions;
    const updatedForm = await form.save();

    res.status(200).json({
      updatedForm,
    });
  } else {
    res.status(400);
    throw new Error("form Not found");
  }
});

module.exports = { createForm, updateForm };
