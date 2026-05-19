import db from './db.js'

const getAllCategories = async() => {
    const query = `
        SELECT category_id, name FROM public.category;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getCategoryById = async (categoryId) => {
    const query = `
        SELECT
        category_id,
        name
        FROM category
        WHERE category_id = $1
    `;
    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
}

const getProjectsByCategoryId = async (categoryId) => {
      const query = `
        SELECT
        p.project_id,
        p.organization_id,
        p.title,
        p.date,
        p.description,
        p.location
        FROM project_category pc
        JOIN project p ON pc.project_id = p.project_id
        WHERE pc.category_id = $1
      `;
      
      const queryParams = [categoryId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

export {getAllCategories, getCategoryById, getProjectsByCategoryId}