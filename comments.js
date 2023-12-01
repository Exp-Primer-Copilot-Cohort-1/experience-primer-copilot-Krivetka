// Create web server
// Authors: Kyle, Eric, and David
// Date: 11/24/2018

// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Require path
var path = require('path');
var session = require('express-session');
// Require mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/message_board');
var Schema = mongoose.Schema;
// Use native promises
mongoose.Promise = global.Promise;

// Define Schema variable
var PostSchema = new mongoose.Schema({
 name: { type: String, required: true, minlength: 4},
 text: { type: String, required: true },
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, {timestamps: true });
var CommentSchema = new mongoose.Schema({
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},
 name: { type: String, required: true, minlength: 4},
 text: { type: String, required: true }
}, {timestamps: true });
// Set our models by passing them their respective Schemas
mongoose.model('Post', PostSchema);
mongoose.model('Comment', CommentSchema);
// Store our models in variables
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

// Use native promises
mongoose.Promise = global.Promise;

// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
app.use(session({secret: 'codingdojorocks'}));  // string for encryption
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');