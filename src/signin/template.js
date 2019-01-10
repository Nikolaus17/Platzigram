var yo = require('yo-yo');
var landing = require('../landing');
var translate = require('../translate');

var signinForm = yo`<div class="col s12 m7">
                        <div class="row">
                            <div class="signup-box">
                                <h1 class="platzigram">Platzigram</h1>
                                <form class="signup-form">
                                    <div class="section">
                                        <a class="btn btn-fb hiden-on-small-only">${translate.message('signup.facebook')}</a>
                                        <a class="btn btn-fb hide-on-med-and-up"><i class="fab fa-facebook-f"></i>${translate.message('signin')}</a>
                                        <div class="divider"></div>
                                        <div class="section">
                                            <input type="text" name="username" placeholder="${translate.message('username')}">
                                            <input type="password" name="password" placeholder="${translate.message('password')}">
                                            <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signin')}</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="row">
                                <div class="login-box">
                                    ¿No tienes una cuenta? <a href="/signup">Regístrate</a>
                                </div>
                            </div>
                        </div>
                    </div>`;

module.exports = landing(signinForm);