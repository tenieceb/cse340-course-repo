import { getAllProjects, getUpcomingProjects, getProjectsByOrganizationId, getProjectById, getCategoriesByProjectId, createProject} from '../models/projects.js';
import { getAllOrganizations } from '../models/organizations.js';
import {body, validationResult} from 'express-validator';

const projectValidation = [
    
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required')
        .isLength({ max: 200 }).withMessage('Location must be less than 200 characters'),
    body('date')
        .notEmpty().withMessage('Date is required')
        .isISO8601().withMessage('Date must be a valid date format'),
    body('organizationId')
        .notEmpty().withMessage('Organization is required')
        .isInt().withMessage('Organization must be a valid integer')
];

const number_of_upcoming_projects = 5;

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(number_of_upcoming_projects);
    const title = 'Upcoming Service Projects';

    res.render('projects', { title, projects });
};

const showProjectDetailsPage = async (req, res) => {
    const { id } = req.params;
    const projectDetails = await getProjectById(id);
    const projectCategories = await getCategoriesByProjectId(id);
    const title = 'Project Details';

    res.render('project', { title, projectDetails, projectCategories });
};

const showNewProjectForm = async (req, res) => {
    const organizations = await getAllOrganizations();
    const title = 'Add New Project';

    res.render('new-project', { title, organizations });
};

const processNewProjectForm = async (req, res) => {
    const {organizationId, title, description, location, date} = req.body;
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/new-project');
        return;
    }
    try {
        const newProjectId = await createProject(organizationId, title, description, location, date);
        req.flash('success', 'Project added successfully!');
        res.redirect(`/project/${newProjectId}`);
    } catch (error) {
        console.error('Error creating project:', error);
        req.flash('error', 'Failed to add project.');
        res.redirect('/new-project');
    }
}


export { projectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation };