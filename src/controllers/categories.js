import { getAllCategories, getProjectsByCategoryId, getCategoryById } from '../models/categories.js';

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';

    res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', {title, categoryDetails, projects});
};

export { categoriesPage, showCategoryDetailsPage };