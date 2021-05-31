import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import "firebase/app";
import Videoback from '../img/background.mp4';

import { auth } from '../firebase';
import firebase from 'firebase/app';
import $ from 'jquery';

const Login = () => {
    return (
        <React.Fragment>
            <div id="login-page">
                <div class="twp-video-background">
                    <div class="twp-video-foreground">
                        <video controls autoPlay loop muted id="myVideo">
                            <source src={Videoback} type="video/mp4" />
                        </video>
                    </div>
                    <div class="twp-video-layer"></div>
                </div>


                <div id="login-card">
                    <div class="accordion accordion-flush" id="accordionFlushExample" >
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="flush-headingOne">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                    <h4 id="btn-text">Welcome to Nyl'sLoft!</h4>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div
                                    className="login-button google mb-5"
                                    onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                                >
                                    <GoogleOutlined id="google-ico" /> Sign In with Google
                </div>

                                <div
                                    className="login-button facebook mb-5"
                                    onClick={() => auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider())}
                                >
                                    <FacebookOutlined id="facebook-ico" /> Sign In with Facebook
                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment >
    );
}

export default Login;