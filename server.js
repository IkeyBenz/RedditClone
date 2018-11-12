const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 5000;

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(require('./controllers/miscRoutes'));
app.use('/posts', require('./controllers/posts'));

app.listen(PORT, () => {
    console.log('Runnning Reddit on ' + PORT);
    require('./data/database');
});

module.exports = {app}