import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm
} from './controllers/organizations.js';
import { projectsPage, showProjectDetailsPage, showNewProjectForm, processNewProjectForm, projectValidation, showEditProjectForm, processEditProjectForm } from './controllers/projects.js';
import { categoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, usersPage } from './controllers/users.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

router.get('/projects', projectsPage);
router.get('/project/:id', showProjectDetailsPage);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

router.get('/assign-categories/:id', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:id', requireRole('admin'), processAssignCategoriesForm);


router.get('/categories', categoriesPage);
router.get('/category/:id', showCategoryDetailsPage);
router.get('/edit-category/:id',requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);

router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);

router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);
router.get('/dashboard', requireLogin, showDashboard);
router.get('/users', requireRole('admin'), usersPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;