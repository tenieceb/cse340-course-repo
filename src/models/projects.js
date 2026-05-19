import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT 
        p.project_id,
        p.title,
        p.date,
        p.description,
        o.name as organization_name
        FROM public.project p
        JOIN public.organization o
        ON p.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
      const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          date
        FROM project
        WHERE organization_id = $1
        ORDER BY date;
      `;
      
      const queryParams = [organizationId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT
        p.project_id,
        p.organization_id,
        p.title,
        p.date,
        p.description,
        o.name as organization_name
        FROM public.project p
        JOIN public.organization o
        ON p.organization_id = o.organization_id
        WHERE p.date >= CURRENT_DATE
        ORDER BY p.date
        LIMIT $1;
    `;
    const result = await db.query(query, [number_of_projects]);

    return result.rows;
}

const getProjectById = async (projectId) => {
    const query = `
        SELECT
        p.project_id,
        p.organization_id,
        p.title,
        p.date,
        p.description,
        p.location,
        o.name as organization_name
        FROM public.project p
        JOIN public.organization o
        ON p.organization_id = o.organization_id
        WHERE p.project_id = $1
    `;
    const queryParams = [projectId];
    const result = await db.query(query, queryParams);

    return result.rows[0];
}

const getCategoriesByProjectId = async (projectId) => {
      const query = `
        SELECT
        c.category_id,
        c.name
        FROM project_category pc
        JOIN category c ON pc.category_id = c.category_id
        WHERE pc.project_id = $1
      `;
      
      const queryParams = [projectId];
      const result = await db.query(query, queryParams);

      return result.rows;
};

export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectById, getCategoriesByProjectId}