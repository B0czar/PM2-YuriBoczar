const Category = require("../models/CategoryModel");

exports.createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const category = await Category.create(categoryData);
        res.status(201).json({ success: true, data: category, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

exports.listCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json({ success: true, data: categories, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

exports.getCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ success: false, data: null, error: "Categoria não encontrada" });
        }
        res.status(200).json({ success: true, data: category, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const categoryData = req.body;
        const category = await Category.update(id, categoryData);
        if (!category) {
            return res.status(404).json({ success: false, data: null, error: "Categoria não encontrada" });
        }
        res.status(200).json({ success: true, data: category, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.delete(id);
        if (!category) {
            return res.status(404).json({ success: false, data: null, error: "Categoria não encontrada" });
        }
        res.status(200).json({ success: true, data: { message: "Categoria deletada com sucesso" }, error: null });
    } catch (error) {
        res.status(500).json({ success: false, data: null, error: error.message });
    }
};
