const express = require('express');
const route = require('./routes/auth.js');

const { default: mongoose } = require('mongoose');

const app = express();


app.use(express.json());



mongoose.connect("mongodb+srv://sonuk:kamble123@cluster0.vfrmzq9.mongodb.net/snabbtech-DB" )
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

  app.use('/',route)  

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});