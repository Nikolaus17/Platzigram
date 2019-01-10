import page from 'page'
import header from '../header'
import title from 'title'
import empty from 'empty-element'
import template from './template'

page('/:username', loadUser, header,  function (ctx, next) {
    var main = document.getElementById('main-container');
    title('Platzigram - ' + ctx.params.username);
    empty(main).appendChild(template(ctx.user));
}); 

page('/:username/:id', loadUser, header, modalInitializator, function (ctx, next) {
    var main = document.getElementById('main-container');
    title(`Platzigram - ${ctx.params.username}`);
    empty(main).appendChild(template(ctx.user));
}); 

async function loadUser(ctx, next) {
    try {
        ctx.user = await fetch(`/api/user/${ctx.params.username}`).then(res => res.json());
        next();
    }catch (err) {
        console.log(err);
    }
}

function modalInitializator(ctx, next) {
    $(function () {
        //Initialize all modals
        $('.modal').modal({
            complete: function () {
                page(`/${ctx.params.username}`)    
            }
        });

        //Now we the modal from code
        $(`#modal${ctx.params.id}`).modal('open');
    });
}(jQuery);