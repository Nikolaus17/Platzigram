var yo = require('yo-yo');
var translate = require('../translate');

module.exports = function pictureCard(pic) {
    var el;
    
    function render(picture) { 
        return yo`<div class="card ${picture.liked ? 'liked' : ''}">
            <div class="card-image">
                <img class="activator" src="${picture.url}"  ondblclick="${like.bind(null, true)}" >
                <i class="fa${picture.unlikedHeart ? 's' : ''} fa-heart${picture.unlikedHeart ? '-broken' : ''} like-heart ${picture.likedHeart ? 'liked' : ''}"></i>
            </div>
            <div class="card-content">
                <a href="/${picture.user.username}" class="card-title">
                    <img src="${picture.user.avatar}" class="avatar" />
                    <span class="username">${picture.user.username}</span>
                </a>
                <small class="right time">${translate.date.format(picture.createdAt)}</small>
                <p>
                    <a class="left" href="#" onclick="${like.bind(null, true)}"><i class="far fa-heart"></i></a>
                    <a class="left" href="#" onclick="${like.bind(null, false)}"><i class="fas fa-heart"></i></a>
                    <span class="left likes">${translate.message('likes', { likes: picture.likes })}</span>
                </p>
            </div>
        </div>`;
    }

    function like(liked) {
        if (pic.liked) {
            pic.unlikedHeart = true;
            pic.likes -= 1;
            liked = false;
        } else {
            pic.likes += 1;
            liked = true;
        }
        pic.likedHeart = pic.liked = liked;
        var newEl = render(pic);
        yo.update(el, newEl);

        setTimeout(function () {
            pic.likedHeart = false;
            pic.unlikedHeart = false;
            var newEl = render(pic);
            yo.update(el, newEl);
        }, 1111);

        return false;
    }

    el = render(pic);
    return el;
}