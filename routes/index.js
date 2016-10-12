var express = require('express');
var router = express.Router();

var fs = require('fs');
var zlib = require('zlib');
var Jimp = require('jimp');

var events = require('events');

var width = 0;
var height = 0;
// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {

    console.log('connection succesful.');

    // Fire the data_received event 

}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);

// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function() {

    Jimp.read("./outfiles/out1.png", function(err, lenna) {
        if (err) throw err;
        lenna.resize(parseInt(width * 2), parseInt(height * 2)) // resize
            .write("./outfiles/out2.png"); // save   
        lenna.resize(parseInt(width * 3), parseInt(height * 3)) // resize
            .write("./outfiles/out3.png"); // save   
        lenna.resize(parseInt(width * 4), parseInt(height * 4)) // resize
            .write("./outfiles/out4.png"); // save   
    });

// var readerStream1 = fs.createReadStream("./outfiles/out1.png");
// var readerStream2 = fs.createReadStream("./outfiles/out2.png");
// var readerStream3 = fs.createReadStream("./outfiles/out3.png");
// var readerStream4 = fs.createReadStream("./outfiles/out4.png");

// readerStream1.on('data', function(chunk) {
//     readerStream1.pipe(zlib.createGzip())
//         .pipe(fs.createWriteStream("./outfiles/out1.png.zip"));
// });

// readerStream2.on('data', function(chunk) {
//     readerStream2.pipe(zlib.createGzip())
//         .pipe(fs.createWriteStream("./outfiles/out2.png.zip"));
// });

// console.log('data received succesfully.');

// fs.createReadStream("./outfiles/out2.png")
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream("./outfiles/out2.png.zip"));
// console.log('data received succesfully.');

// fs.createReadStream("./outfiles/out3.png")
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream("./outfiles/out3.png.zip"));
// console.log('data received succesfully.');

// fs.createReadStream("./outfiles/out4.png")
//     .pipe(zlib.createGzip())
//     .pipe(fs.createWriteStream("./outfiles/out4.png.zip"));

console.log('data received succesfully.');
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/img', function(req, res, next) {

    var base64Data = req.body.imgBase64.replace(/^data:image\/png;base64,/, "");
    width = req.body.width;
    height = req.body.height;

    fs.writeFile("./outfiles/out1.png", base64Data, 'base64', function(err) {
        if (err) { console.log(err); return; }
        res.end("success");
    });

    eventEmitter.emit('data_received');
})



/*
router.get('/posts/:post', function(req, res, next) {
    req.post.populate('comments', function(err, pos) {
        if (err) { return next(err); }
        res.join(req.post);
    })

});

router.post('/posts/:post/comments', function(req, res, next) {
    var comment = new Comment(req.body);
    comment.post = req.post;

    comment.save(function(err, comment) {
        if (err) { return next(err); }

        req.post.comments.push(comment);
        req.post.save(function(err, post) {
            if (err) { return next(err); }

            res.json(comment);
        });
    });
});

router.put('/posts/:post/upvote', function(req, res, next) {
    req.post.upvote(function(err, post) {
        if (err) { return next(err); }

        res.json(post);
    });
});

router.param('post', function(req, res, next, id) {
    var query = Post.findById(id);

    query.exec(function(err, pos) {
        if (err) { return next(err); }
        if (!pos) { return next(new Error('can\'t find post')); }

        req.post = post;
        return next();
    })
})
router.post('/posts', function(req, res, next) {
    var post = new Post(req.body);

    post.save(function(err, post) {
        if (err) { return next(err); }
        res.json(post);
    })
});

router.get('/posts', function(req, res, next) {

    Post.find(function(err, posts) {
        if (err) { return next(err); }

        res.json(posts);
    })
})
*/
module.exports = router;