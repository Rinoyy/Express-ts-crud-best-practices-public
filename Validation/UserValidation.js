// validation/itemValidation.js

const Joi = require("joi");

// ===========================
// Schema Definition
// ===========================

const itemSchema = Joi.object({
  name: Joi.string().min(4).max(30).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.min": "Name must be at least 4 characters",
    "string.max": "Name must not exceed 30 characters",
    "any.required": "Name is required",
  }),
  description: Joi.string().min(10).max(100).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description cannot be empty",
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must not exceed 100 characters",
    "any.required": "Description is required",
  }),
});

// Schema for partial update (all fields optional)
const itemUpdateSchema = Joi.object({
  name: Joi.string().min(4).max(30).optional().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must be at least 4 characters",
    "string.max": "Name must not exceed 30 characters",
  }),
  description: Joi.string().min(10).max(100).optional().messages({
    "string.base": "Description must be a string",
    "string.min": "Description must be at least 10 characters",
    "string.max": "Description must not exceed 100 characters",
  }),
}).min(1).messages({
  "object.min": "At least one field (name or description) must be provided",
});

// ===========================
// Validation Middleware
// ===========================

/**
 * Validate item data for create operation
 */
const validateItemCreate = (req, res, next) => {
  const { error, value } = itemSchema.validate(req.body, {
    abortEarly: false, // Return all errors, not just the first one
    stripUnknown: true, // Remove unknown fields
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors,
    });
  }

  // Replace req.body with validated and sanitized data
  req.body = value;
  next();
};

/**
 * Validate item data for update operation
 */
const validateItemUpdate = (req, res, next) => {
  const { error, value } = itemUpdateSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => ({
      field: detail.path[0],
      message: detail.message,
    }));

    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: errors,
    });
  }

  req.body = value;
  next();
};

// ===========================
// Exports
// ===========================

module.exports = {
  validateItemCreate,
  validateItemUpdate,
  itemSchema,
  itemUpdateSchema,
};
