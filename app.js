const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db'); // Your MongoDB connection
const userRoutes = require('./routes/userRoutes');
const app = express();
const PORT = 5000;

// Connect to MongoDB
connectDB();

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname)); // Set the root directory as the views folder

// Middleware
app.use(express.json());
app.use(cors());

// Static file serving from relevant folders
// Serve static files from the "About us/static" folder
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.use('/about-us/static', express.static(path.join(__dirname, 'About us', 'static')));
app.use('/prb/static', express.static(path.join(__dirname, 'prb', 'static')));
app.use('/Podcasts/static', express.static(path.join(__dirname, 'Podcasts', 'static')));
app.use('/student-corner/static', express.static(path.join(__dirname, 'student-corner', 'static')));
app.use('/wholesale-buyer/static', express.static(path.join(__dirname, 'wholesale-buyer', 'static')));
app.use('/req-quote-wholesale-buyer/static', express.static(path.join(__dirname, 'req-quote-wholesale-buyer', 'static')));
app.use('/seller-form/static', express.static(path.join(__dirname, 'seller-form', 'static')));
app.use('/cart/static', express.static(path.join(__dirname, 'cart', 'static')));
app.use('/signup-page/static', express.static(path.join(__dirname, 'signup-page', 'static')));
app.use('/login/static', express.static(path.join(__dirname, 'login', 'static')));
app.use('/views/landing-page/static', express.static(path.join(__dirname, 'views','landing-page','static')));


// Serve static files for other pages
app.use(express.static(path.join(__dirname, 'login')));
app.use(express.static(path.join(__dirname, 'signup page')));
app.use(express.static(path.join(__dirname, 'landing page')));
app.use(express.static(path.join(__dirname, 'prb')));
app.use(express.static(path.join(__dirname, 'public'))); // Common public files (CSS, JS, images)

// API Routes
app.use('/api/users', userRoutes);

// Page Routes (EJS rendering)
app.get('/', (req, res) => {
    res.render('views/landing-page/landing'); // Path relative to 'views'
});


app.get('/about-us', (req, res) => {
    res.render('About us/form_1'); // About Us page
});

app.get('/prb', (req, res) => {
    res.render('prb/index'); // prb page
});

app.get('/Podcasts', (req, res) => {
    res.render('Podcasts/pod'); // podcasts page
});
app.get('/student-corner', (req, res) => {
    res.render('student-corner/index'); // Student Corner page
});

app.get('/wholesale-buyer', (req, res) => {
    res.render('wholesale-buyer/index'); // Wholesale buyer
});
app.get('/req-quote-wholesale-buyer', (req, res) => {
    res.render('req-quote-wholesale-buyer/index'); //request quote wholesale buyer
});
app.get('/seller-form', (req, res) => {
    res.render('seller-form/index'); //seller form
});
app.get('/cart', (req, res) => {
    res.render('cart/index'); //cart
});
app.get('/signup-page', (req, res) => {
    res.render('signup-page/signup'); //sign up
});
app.get('/login', (req, res) => {
    res.render('login/form_1'); //login
});





// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});