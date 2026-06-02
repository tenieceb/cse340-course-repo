import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm
} from './controllers/organizations.js';
import { projectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation } from './controllers/projects.js';
import { categoriesPage,showCategoryDetailsPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', projectsPage);
router.get('/project/:id', showProjectDetailsPage);

router.get('/categories', categoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

router.get('/new-organization', showNewOrganizationForm);
router.post('/new-organization', organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', showEditOrganizationForm);
router.post('/edit-organization/:id', organizationValidation, processEditOrganizationForm);

router.get('/new-project',  showNewProjectForm);
router.post('/new-project', projectValidation, processNewProjectForm);
// error-handling routes
router.get('/test-error', testErrorPage);

export default router;