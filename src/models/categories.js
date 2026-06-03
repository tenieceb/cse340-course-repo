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

const assignCategoryToProject = async (projectId, categoryId) => {
    
    const query = `
        INSERT INTO project_category (project_id, category_id) VALUES ($1, $2)
    `;
    const queryParams = [projectId, categoryId];
    await db.query(query, queryParams);
};

const updateCategoryAssignment = async (projectId, categoryIds) => {
    const deleteQuery = `
        DELETE FROM project_category 
        WHERE project_id = $1;
    `;
    const queryParams = [projectId];
    await db.query(deleteQuery, queryParams);
    for (const categoryId of categoryIds) {
        await assignCategoryToProject(projectId, categoryId);
    }
};

const createCategory = async (name) => {
    const query = `
        INSERT INTO category (name) VALUES ($1) RETURNING category_id;
    `;
    const queryParams = [name];
    const result = await db.query(query, queryParams);
    return result.rows[0].category_id;
};

const updateCategory = async (categoryId, name) => {
    const query = `
        UPDATE category SET name = $1 WHERE category_id = $2;
    `;
    const queryParams = [name, categoryId];
    await db.query(query, queryParams);
};

export {getAllCategories, getCategoryById, getProjectsByCategoryId, updateCategoryAssignment, createCategory, updateCategory}