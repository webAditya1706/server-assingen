const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/crud-with-men_2')
  .then(() => console.log('Connected!'));
