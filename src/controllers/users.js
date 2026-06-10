import bcrypt from 'bcrypt';
import { createUser, authenticateUser} from '../models/users.js';

const showUserRegistrationForm = async (req, res) => {
    const title = 'Register';
    res.render('register', { title });
}

const processUserRegistrationForm = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const salt= await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        const userId = await createUser(name, email, passwordHash);
        req.flash('success', 'Registration successful. Please log in.');
        res.redirect('/login');
    } catch (error) {
        console.error('Error processing user registration:', error);
        req.flash('error', 'An error occurred during registration. Please try again.');
        res.redirect('/register')    }
};

const showLoginForm = async (req, res) => {
    const title = 'Login';
    res.render('login', { title });
}

const processLoginForm = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authenticateUser(email, password);
        if (user) {
            req.session.user = user; // Store user info in session
            req.flash('success', 'Login successful.');
            
            if (res.locals.NODE_ENV === 'development') {
                console.log('User logged in:', user);
            }
        res.redirect('/dashboard');
        } else {
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
        }
    } catch (error) {
        console.error('Error processing login:', error);
        req.flash('error', 'An error occurred during login. Please try again.');
        res.redirect('/login');
    }
};

const processLogout = async (req, res) => {
    if (req.session.user) {
        delete req.session.user; // Clear user info from session
        req.flash('success', 'Logout successful.');
    }
    res.redirect('/login');
};

const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        req.flash('error', 'You must be logged in to access this page.');
        return res.redirect('/login');
    }
    next();
}

const showDashboard = (req, res) => {
    const user = req.session.user;
    res.render('dashboard', { 
        title: 'Dashboard',
        name: user.name,
        email: user.email
    });
};

/**
 * Middleware factory to require specific role for route access
 * Returns middleware that checks if user has the required role
 * 
 * @param {string} role - The role name required (e.g., 'admin', 'user')
 * @returns {Function} Express middleware function
 */
const requireRole = (role) => {
    return (req, res, next) => {
        // Check if user is logged in first
        if (!req.session || !req.session.user) {
            req.flash('error', 'You must be logged in to access this page.');
            return res.redirect('/login');
        }

        // Check if user's role matches the required role
        if (req.session.user.role_name !== role) {
            req.flash('error', 'You do not have permission to access this page.');
            return res.redirect('/');
        }

        // User has required role, continue
        next();
    };
};     
export { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole };