var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var axios = require('axios');
var yo = require('yo-yo');

page('/', header, preload, loadPicturesAxios,  function (ctx, next) {
    title('Platzigram');
    var main = document.getElementById('main-container');

    empty(main).appendChild(template(ctx.pictures));
});

function preload(ctx, next) {
    title('Platzigram');
    var el = yo`<div class="container timeline">
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
                <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-cyan-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    document.getElementById('main-container').appendChild(el);
    next();
}

function loadPictures(ctx, next) {
    request
    .get('/api/pictures')
    .end(function (err, res) {
        if (err) return console.log(err);
        
        ctx.pictures = res.body;
        next();
    })
}


function loadPicturesAxios(ctx, next) {
    axios
    .get('/api/pictures')
    .then(function (res) {
        ctx.pictures = res.data;
        next();
    })
    .catch(function (err) {
        console.log(err);
    })
}

async function asyncLoad() {
    try {
        ctx.pictures = await fetch('/api/pictures').then(res => res.json());
        next();
    } catch(err) {
        return console.log(err);
    }

}