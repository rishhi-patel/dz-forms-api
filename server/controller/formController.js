const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Form = require("../models/forms");
const url = require("url");
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

// @desc    get forms
// @route   get /api/forms
// @access  Private

const getFormDetails = asyncHandler(async (req, res) => {
  // const { _id, creator_id } = req.body;
  const { _id, creator_id } = url.parse(req.url, true).query;
  const form = await Form.findOne({ _id });

  if (form) {
    if (form.createdBy == creator_id) {
      res.status(200).json({
        form,
      });
    } else {
      res.status(400);
      throw new Error("Not Authorised");
    }
  } else {
    res.status(400);
    throw new Error("form Not found");
  }
});

// @desc    update form
// @route   get /api/forms/update
// @access  Private

const updateForm = asyncHandler(async (req, res) => {
  const data = req.body;
  const form = await Form.findOne({ _id: data._id });

  if (form) {
    form.name = data.name;
    form.description = data.description;
    form.questions = data.questions;
    const updatedForm = await form.save();

    res.status(200).json({
      updatedForm,
    });
  } else {
    res.status(400);
    throw new Error("form Not found");
  }
});

module.exports = { createForm, updateForm, getFormDetails };
