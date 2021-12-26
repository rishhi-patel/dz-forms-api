const asyncHandler = require("express-async-handler");
const User = require("../models/users");
const Form = require("../models/forms");
const url = require("url");
const Response = require("../models/response");
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

// @desc    get form Details
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

// @desc    get form Lists
// @route   get /api/forms/find
// @access  Private

const getFormList = asyncHandler(async (req, res) => {
  // const { _id, creator_id } = req.body;
  const { _id } = url.parse(req.url, true).query;

  const form = await Form.find(
    { createdBy: _id },
    { _id: 1, name: 1, createdBy: 1 }
  );

  if (form) {
    res.status(200).json({
      form,
    });
  } else {
    res.status(400);
    throw new Error("form Not found");
  }
});
// @desc    update form
// @route   post /api/forms/update
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

// @desc    submit form response
// @route   post /api/forms/response
// @access  Private

const submitResponse = asyncHandler(async (req, res) => {
  const data = req.body;
  const form = await Form.findOne({ _id: data.formId });

  if (form) {
    const response = await Response.create({
      formId: data.formId,
      userEmail: data.email,
      response: data.response,
    });

    res.status(201).json({
      status: "success",
    });
  } else {
    res.status(400);
    throw new Error("form Not found");
  }
});

// @desc    get single Response
// @route   get /api/forms/response
// @access  Private

const getSingleResponse = asyncHandler(async (req, res) => {
  // const { _id } = req.body;
  const { _id } = url.parse(req.url, true).query;
  const response = await Response.findOne({ _id });

  if (response) {
    res.status(200).json({
      response,
    });
  } else {
    res.status(400);
    throw new Error("response Not found");
  }
});

// @desc    get all single form Response
// @route   get /api/forms/response/all
// @access  Private

const getSingleFormResponses = asyncHandler(async (req, res) => {
  // const { _id } = req.body;
  const { _id } = url.parse(req.url, true).query;
  const response = await Response.find({ formId: _id });

  if (response) {
    res.status(200).json({
      response,
    });
  } else {
    res.status(400);
    throw new Error("response Not found");
  }
});

module.exports = {
  createForm,
  updateForm,
  getFormList,
  getFormDetails,
  submitResponse,
  getSingleResponse,
  getSingleFormResponses,
};
