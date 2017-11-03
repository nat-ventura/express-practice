const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');

const app = express();

// view engine
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// bad practice section
app.use((req, res, next) => {
  res.locals.errors = null;
  next();
});

// express validator middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    let namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

  while (namespace.length) {
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param : formParam,
    msg : msg,
    value : value
  };
  }
}));

let users = [
      {
        id: 1,
        firstName: 'nat',
        lastName: 'v',
        email: 'cool@kid.com'
      },
      {
        id: 2,
        firstName: 'bat',
        lastName: 'tree',
        email: 'bat@kid.com'
      },
      {
        id: 3,
        firstName: 'tea',
        lastName: 'tree',
        email: 'whack@kid.com'
      }
]

app.get('/', (req, res) => {
  res.render('index', {
    title: 'customers',
    users: users
  });
});

// this handles the form's POST method and action-'/users/add'
// this saves the submitted form data as a newUser
app.post('/users/add', (req, res) => {

  req.checkBody('firstName', 'first name is required').notEmpty();
  req.checkBody('lastName', 'last name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();

  let errors = req.validationErrors();
  
  if (errors) {
    console.log('errors.. please enter creds');
    res.render('index', {
      title: 'customers',
      users: users,
      errors: errors
    });
  } else {
    let newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  console.log('success', newUser);
  }
  
});

app.listen(3000, () => {
  console.log('server started on port 3000');
});
