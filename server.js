var express = require("express");
var multer  = require('multer');
var ext = require('file-extension');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, +Date.now() + '.' + ext(file.originalname))//file.fieldname + '-' + Date.now()
    }
})
   
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set('view engine', 'pug');

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', { title: 'Platzigram' });
});


app.get('/signup', function (req, res) {
    res.render('index', { title: 'Platzigram - Signup' });
});

app.get('/signin', function (req, res) {
    res.render('index', { title: 'Platzigram - Signin' });
});

app.get('/api/pictures', function (req, res, next) {
    var pictures = [
        {
            user: {
                username: 'nclscrdn',
                avatar: 'https://pbs.twimg.com/profile_images/1053147981959041026/NiyWj4i9_400x400.jpg'
            },
            url: 'office.jpg',
            likes: 156,
            liked: true,
            createdAt: new Date().getTime()
        },
        {
            user: {
                username: 'pablocardona',
                avatar: '12036865_1603934683201158_6651314923170431580_n.jpg'
            },
            url: 'sample-1.jpg',
            likes: 1391,
            liked: false,
            createdAt: new Date().setDate(new Date().getDate() - 10)
        },
    ];
    
    setTimeout(function () {
        res.send(pictures);
    }, 2000);
});

app.post('/api/pictures', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.send(500, "Error uploading file");
        }
        res.send('File uploaded');
    })
});

app.get('/api/user/:username', function (req, res) {
    const user = {
        username: 'nclscrdn',
        avatar: 'https://pbs.twimg.com/profile_images/1053147981959041026/NiyWj4i9_400x400.jpg',
        description: 'Self-thought programmer',
        pictures: [
            {
                id: 1,
                url: 'https://pbs.twimg.com/media/DwUu_E3W0AItt3g.jpg:large',
                likes: 7
            },
            {
                id: 2,
                url: 'https://terrigen-cdn-dev.marvel.com/content/prod/1x/xmen.png',
                likes: 45
            },
            {
                id: 3,
                url: 'https://screenshotscdn.firefoxusercontent.com/images/7b5dbac6-5770-4b7b-94e4-2ab0458ee754.png',
                likes: 52
            },
            {
                id: 4,
                url: 'https://images.pexels.com/photos/1034662/pexels-photo-1034662.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                likes: 34
            },
            {
                id: 5,
                url: 'https://images.pexels.com/photos/1769347/pexels-photo-1769347.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
                likes: 23
            }
        ]
    }
    res.send(user);
})

app.get('/:username', function (req, res) {
    res.render('index', {title: `Platzigram - ${req.params.username}`})
})

app.get('/:username/:id', function (req, res) {
    res.render('index', {title: `Platzigram - ${req.params.username}`})  
}) 

app.listen(3000, function (err) {
    if (err) return console.log('Hubo un error', process.exit(1));
    console.log('Platzigram escuchando en el puerto 3000');
});