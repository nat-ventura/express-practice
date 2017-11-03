const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

// view engine
app.engine('.hbs', exphbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// set static path
app.use(express.static(path.join(__dirname, 'public')));

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

app.listen(3000, () => {
  console.log('server started on port 3000');
});
