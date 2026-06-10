CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES organization(organization_id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL
);

INSERT INTO project (organization_id, title, description, location, date)
VALUES
(1, 'Community Park Renovation', 'Renovating the central park with new playground equipment, landscaping, and seating areas.', 'Central Park, Springfield', '2026-09-15'), 
(1, 'Neighborhood Clean-Up', 'Organizing a community clean-up event to beautify local streets and public spaces.', 'Downtown Springfield', '2026-10-05'), 
(1, 'Affordable Housing Project', 'Building affordable housing units to support low-income families in the area.', 'Eastside Springfield', '2026-11-20'),
(1, 'Public Art Installation', 'Creating a mural and sculpture installation to celebrate local culture and history.', 'Springfield Art District', '2026-12-10'), 
(1, 'Community Center Expansion', 'Expanding the community center to include new classrooms, a gymnasium, and a library.', 'Springfield Community Center', '2027-01-15'), 

(2, 'Urban Farm Expansion', 'Expanding the existing urban farm to include more growing space and educational facilities.', 'GreenHarvest Urban Farm, Springfield', '2026-08-01'), 
(2, 'Community Composting Program', 'Launching a community composting program to reduce waste and create nutrient-rich soil for local gardens.', 'Various locations in Springfield', '2026-09-10'), 
(2, 'Urban Garden Installation', 'Creating a new urban garden to provide fresh produce and educational opportunities for residents.', 'Riverside Community Center, Springfield', '2026-08-20'), 
(2, 'Farmers Market Launch', 'Launching a weekly farmers market to support local growers and provide fresh food options.', 'Main Street Plaza, Springfield', '2026-09-01'), 
(2, 'Composting Workshop', 'Hosting workshops to teach residents about composting and waste reduction.', 'GreenHarvest Community Garden, Springfield', '2026-10-15'), 

(3, 'Youth Mentorship Program', 'Connecting local youth with mentors to provide guidance, support, and opportunities for personal growth.', 'Springfield Youth Center', '2026-09-01'), 
(3, 'Community Tutoring Initiative', 'Organizing volunteer tutors to provide free academic support to students in need.', 'Springfield Public Library', '2026-10-01'), 
(3, 'Holiday Toy Drive', 'Collecting and distributing toys to children in need during the holiday season.', 'Springfield Community Hall', '2026-12-10'), 
(3, 'Senior Assistance Program', 'Providing support and companionship to senior citizens through regular visits and activities.', 'Various locations in Springfield', '2026-11-01'), 
(3, 'Food Bank Support', 'Organizing food drives and volunteer shifts to support the local food bank.', 'Springfield Food Bank', '2026-10-01');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE
	);

INSERT INTO category (name)
	VALUES
	('Community Development'),
	('Environment and Sustainability'),
	('Education and Mentorship'),
	('Food and Agriculture'),
	('Volunteer Outreach'),
	('Arts and Culture'),
	('Housing and Infrastructure');

CREATE TABLE project_category (
    project_id INTEGER NOT NULL REFERENCES project(project_id) ON DELETE CASCADE,
    category_id INTEGER NOT NULL REFERENCES category(category_id) ON DELETE CASCADE,
    PRIMARY KEY (project_id, category_id)
);

INSERT INTO project_category (project_id,category_id)
	VALUES
	-- Community Park Renovation
	(1, 1),
	-- Neighborhood Clean-Up
	(2, 1),
	(2, 5),
	-- Affordable Housing Project
	(3, 7),
	-- Public Art Installation
	(4, 6),
	-- Community Center Expansion
	(5, 1),	
	-- Urban Farm Expansion
	(6, 2),
	(6, 4),
	-- Community Composting Program
	(7, 2),
	-- Urban Garden Installation
	(8, 2),
	(8, 4),
	-- Farmers Market Launch
	(9, 4),
	-- Composting Workshop
	(10, 2),
	(10, 3),
	-- Youth Mentorship Program
	(11, 3),
	-- Community Tutoring Initiative
	(12, 3),
	-- Holiday Toy Drive
	(13, 5),
	-- Senior Assistance Program
	(14, 5),
	-- Food Bank Support
	(15, 5),
	(15, 4);

CREATE TABLE roles (
	role_id SERIAL PRIMARY KEY,
	role_name VARCHAR(50) NOT NULL UNIQUE,
	role_description TEXT NOT NULL
);

INSERT INTO roles (role_name, role_description)
	VALUES
	('user','Standard user with basic access'),
	('admin', 'Administrator with full system access');

CREATE TABLE users (
	user_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	password_hash VARCHAR(255) NOT NULL,
	role_id INTEGER NOT NULL REFERENCES roles(role_id),
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);