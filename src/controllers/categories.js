import { getAllCategories } from '../models/categories.js';

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    const title = 'Categories';

    res.render('categories', { title, categories });
};
export { categoriesPage };