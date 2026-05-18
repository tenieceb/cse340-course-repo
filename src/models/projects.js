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

export {getAllProjects, getProjectsByOrganizationId}