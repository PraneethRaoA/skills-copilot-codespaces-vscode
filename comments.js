// Create web server
// Create a web server that listens on port 3000 and serves the following HTML file. The HTML file should be created as a separate file.
// npm install body-parser
// npm install mongoose
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB
// npm install mongodb
// mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true});

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/comment', (req, res) => {
    const comment = new Comment({
        name: req.body.name,
        comment: req.body.comment
    });
    comment.save((err) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Successfully saved comment');
        }
    });
    res.redirect('/');
});

app.get('/comment', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.send(comments);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

// Test
// http://localhost:3000/
// http://localhost:3000/comment
// http://localhost:3000/comment?name=John&comment=Good
// http://localhost:3000/comment?name=Tom&comment=Bad
// http://localhost:3000/comment?name=Mary&comment=Fine
// http://localhost:3000/comment?name=David&comment=Excellent
// http://localhost:3000/comment?name=Peter&comment=Nice
// http://localhost:3000/comment?name=Mike&comment=Great
// http://localhost:3000/comment?name=Chris&comment=Super
// http://localhost:3000/comment?name=Nick&comment=Awesome
// http://localhost:3000/comment?name=Sam&comment=Fantastic
// http://localhost:3000/comment?name=Daniel&comment=Terr
