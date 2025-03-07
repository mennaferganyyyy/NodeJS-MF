const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const CategoryModel = require('../models/categoryModel');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({ results: categories.length, data: categories });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
        return res.status(404).json({ msg: `No category for this id ${id}` });
    }
    res.status(200).json({ data: category });
});

// @desc    Create category
// @route   POST /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await CategoryModel.create({ name, slug: slugify(name) });
    res.status(201).json({ data: category });
});

// @desc    Update category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    const category = await CategoryModel.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true }
    );

    if (!category) {
        return res.status(404).json({ msg: `No category for this id ${id}` });
    }

    res.status(200).json({ data: category });
});

// @desc    Delete category
// @route   DELETE /api/v1/categories/:id
// @access  Private
exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);

    if (!category) {
        return res.status(404).json({ msg: `No category for this id ${id}` });
    }

    res.status(204).send();
});
