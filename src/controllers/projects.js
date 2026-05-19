import { getAllProjects, getUpcomingProjects, getProjectsByOrganizationId, getProjectById} from '../models/projects.js';

const number_of_upcoming_projects = 5;

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(number_of_upcoming_projects);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const { id } = req.params;
    const projectDetails = await getProjectById(id);
    const title = 'Project Details';

    res.render('project', { title, projectDetails });
};

export { projectsPage, showProjectDetailsPage };