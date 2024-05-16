const express = require('express');
const router = express.Router();
const { 
    getAllCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
 } = require('../controller/categoryController');
const isAuth = require('../middleware/isAuth');
const isAdmin = require('../middleware/isAdmin');
const validateCategory = require('../middleware/Validation/validateCategories'); // Import validateCategory



// router.get('/', getAllCategories);
router.post('/create', createCategory);
// router.get('/:id', getCategory);
router.put('/update/:id', updateCategory);
router.delete('/delete/:id', deleteCategory);


module.exports = router;