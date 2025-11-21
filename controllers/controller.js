const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Get all items
 * @route GET /api/items
 */
const getAllItems = async (req, res) => {
    try {
        const items = await prisma.item.findMany();
        
        return res.status(200).json({
            success: true,
            data: items
        });
    } catch (error) {
        console.error('Error fetching items:', error);
        return res.status(500).json({ 
            success: false,
            error: 'Failed to fetch items' 
        });
    }
};

/**
 * Get single item by ID
 * @route GET /api/items/:id
 */
const getItemById = async (req, res) => {
    const { id } = req.params;
    
    try {
        const item = await prisma.item.findUnique({
            where: {
                id: parseInt(id),
            }
        });
        
        if (!item) {
            return res.status(404).json({ 
                success: false,
                error: 'Item not found' 
            });
        }
        
        return res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        console.error('Error fetching item:', error);
        return res.status(500).json({ 
            success: false,
            error: 'Failed to fetch item' 
        });
    }
};

/**
 * Create new item
 * @route POST /api/items
 */
const createItem = async (req, res) => {
    const { name, description } = req.body;
    
    // Validation
    if (!name || !description) {
        return res.status(400).json({ 
            success: false,
            error: 'Name and description are required' 
        });
    }
    
    try {
        const newItem = await prisma.item.create({
            data: {
                name,
                description,
            },
        });
        
        return res.status(201).json({ 
            success: true,
            message: 'Item created successfully', 
            data: newItem 
        });
    } catch (error) {
        console.error('Error creating item:', error);
        return res.status(500).json({ 
            success: false,
            error: 'Failed to create item' 
        });
    }
};

/**
 * Update item by ID
 * @route PUT /api/items/:id
 */
const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    
    // Validation
    if (!name && !description) {
        return res.status(400).json({ 
            success: false,
            error: 'At least one field (name or description) is required' 
        });
    }
    
    try {
        const updatedItem = await prisma.item.update({
            where: { id: parseInt(id) },
            data: {
                ...(name && { name }),
                ...(description && { description })
            }
        });
        
        return res.status(200).json({
            success: true,
            message: 'Item updated successfully',
            data: updatedItem
        });
    } catch (error) {
        console.error('Error updating item:', error);
        
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                error: 'Item not found' 
            });
        }
        
        return res.status(500).json({ 
            success: false,
            error: 'Failed to update item' 
        });
    }
};

/**
 * Delete item by ID
 * @route DELETE /api/items/:id
 */
const deleteItem = async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedItem = await prisma.item.delete({
            where: {
                id: parseInt(id),
            },
        });
        
        return res.status(200).json({
            success: true,
            message: 'Item deleted successfully',
            data: deletedItem
        });
    } catch (error) {
        console.error('Error deleting item:', error);
        
        if (error.code === 'P2025') {
            return res.status(404).json({ 
                success: false,
                error: 'Item not found' 
            });
        }
        
        return res.status(500).json({ 
            success: false,
            error: 'Failed to delete item' 
        });
    }
};

module.exports = { 
    getAllItems, 
    getItemById,
    createItem, 
    updateItem,
    deleteItem 
};
