// routes/itemRoutes.js

const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer();

// Controllers
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} = require("../controllers/itemController");

// Middleware Validation
const {
  validateItemCreate,
  validateItemUpdate,
} = require("../validation/itemValidation");

// ===========================
// Routes
// ===========================

/**
 * @route   GET /api/items
 * @desc    Get all items
 * @access  Public
 */
router.get("/", getAllItems);

/**
 * @route   GET /api/items/:id
 * @desc    Get single item by ID
 * @access  Public
 */
router.get("/:id", getItemById);

/**
 * @route   POST /api/items
 * @desc    Create new item
 * @access  Public
 */
router.post("/", validateItemCreate, createItem);

/**
 * @route   PUT /api/items/:id
 * @desc    Update item by ID
 * @access  Public
 */
router.put("/:id", upload.none(), validateItemUpdate, updateItem);

/**
 * @route   DELETE /api/items/:id
 * @desc    Delete item by ID
 * @access  Public
 */
router.delete("/:id", deleteItem);

module.exports = router;
