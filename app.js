const express = require('express');
const { title } = require('process');
const users = require('./models/users')
const app = express();
const mongoose = require('mongoose')
// for flash messages
const session = require('express-session')
const flash = require('connect-flash')

// to use session and flash
app.use(session({
    secret: 'kolobila',
    resave: false,
    saveUninitialized: true
}))

app.use(flash());
app.use((req, res, next) => {
    res.locals.successMessage = req.flash('success')
    res.locals.errorMessage = req.flash('error')
    next()
})

// mongoDB connection
const dbURL = 'mongodb+srv://kolobila:1111kwaku@nodetuta.migci.mongodb.net/users';
mongoose.connect(dbURL)
.then((result) => {console.log('connected to DB')})
.catch((err) => {console.log(err)})

// to include pages to your work. (first install 'ejs')
app.set('view engine', 'ejs');
// to include css
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// index page 
app.get('/', (req, res) =>{
    res.render('index', {title: 'Home'})
})

// about page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About'})
})

// service page
app.get('/service', (req, res) => {
    res.render('service', {title: 'Service'})
})

// contact page
app.get('/contact', (req, res) => {
    res.render('contact', {title: 'Contact'})
})

// project page
app.get('/project', (req, res) => {
    res.render('project', {title: 'Project'})
})

// testimonial page
app.get('/testimonial', (req, res) => {
    res.render('testimonial', {title: 'Testimonial'})
})

// email page
app.get('/email', (req, res) => {
    res.render('email', {title: 'Email Us'})
})

// manufacturing page
app.get('/manufac', (req, res) => {
    res.render('manufac', {title: 'Manufacturing'})
})

// electrical page 
app.get('/electricSolar', (req, res) => {
    res.render('electricSolar', {title: 'Electrical Solar'})
})

// flash page
app.get('/flash', (req, res) => {
    res.render('flash', { title: 'Email Sent' });
});
// trainingPro 
app.get('/trainingPro', (req, res) => {
    res.render('trainingPro', { title: 'Trianing programs' });
});
// SkillUp4industery
app.get('/SkillUp4industery', (req, res) => {
    res.render('SkillUp4industery', { title: 'SkillUp4industery' });
});
// apply for a program page
app.get('/applyProgram', (req, res) => {
    res.render('applyProgram', { title: 'Apply for a program' });
});

// consoltancy page
app.get('/consultancy', (req, res) => {
    res.render('consultancy', { title: 'Consultancy' });
});



app.post('/contact', (req, res) => {
    try{
        const newUser = users(req.body);
        newUser.save();
        req.flash('success', 'Record Added successfully!!')
        req.session.successMessage = "User saved successfully!";
        res.redirect('/contact')
    }catch(err){
        console.error('Error saving user', err)
        req.flash('error', "Error saving Record!")
        res.redirect('/contact')
    }

});

app.listen(3000, () => {
    console.log("listening to port 3000")
})
