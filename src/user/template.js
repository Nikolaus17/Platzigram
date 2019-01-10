var yo =  require ('yo-yo');
var layout =  require ('../layout');
var translate =  require ('../translate').message;

module.exports =  function userPageTemplate(user) {
    var el = yo`<div class="container user">
        <div class="row">
            <div class="col s12 m10 offset-m1 l8 offset-l2 center-align heading">
                <div class="row">
                    <div class="col s12 m10 offset-m1 l3 center">
                        <img src="${user.avatar}" class="responsive-img circle"> 
                    </div>
                    <div class="col s12 m10 offset-m1 l6 offset-1 l6 left-align">
                        <h2 class="hide-on-large-only right-align">@${user.username}</h2>
                        <h2 class="hide-on-med-and-down left-align">@${user.username}</h2>
                        <h6>${user.description}</h6>   
                    </div>
                </div>
            </div>
            <div class="row">
                ${user.pictures.map(function (picture) {
                    return yo`<div class="col s12 m6 l4">
                        <a href="/${user.username}/${picture.id}" class="picture-container">
                            <img src="${picture.url}" class="picture" width="${picture.width}" height="${picture.height}" />
                            <div class="likes"><i class="fa fa-heart"></i> ${picture.likes}</div>
                        </a>
                      
                        <!-- Modal Structure -->
                        <div id="modal${picture.id}" class="modal modal-fixed-footer">
                          <div class="modal-content">
                            <img src="${picture.url}" />
                          </div>
                          <div class="modal-footer">
                            <div class="btn btn-flat likes"><i class="fa fa-heart"></i> ${translate('likes', { likes: picture.likes})}
                            </div>
                          </div>
                        </div>`;
                })}
            </div>
        </div>    
    </div>`;

    return layout(el);
}
