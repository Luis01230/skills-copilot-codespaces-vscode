// Create web server
var express = require('express');
var router = express.Router();
var path = require('path');

// Database
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/comments');

// Model
var Comment = require('../models/comment.js');

// Get all comments
router.get('/comments', function(req, res, next) {
    console.log("In get all comments route");
    Comment.find(function(err, comments) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(comments);
    });
});

// Post a new comment
router.post('/comments', function(req, res, next) {
    console.log("In post comment route");
    var comment = new Comment(req.body);
    comment.save(function(err, comment) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(comment);
    });
});

// Delete a comment
router.delete('/comments/:id', function(req, res, next) {
    console.log("In delete comment route");
    Comment.findByIdAndRemove(req.params.id, req.body, function(err, comment) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(comment);
    });
});

// Update a comment
router.put('/comments/:id', function(req, res, next) {
    console.log("In update comment route");
    Comment.findByIdAndUpdate(req.params.id, req.body, function(err, comment) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(comment);
    });
});

module.exports = router;