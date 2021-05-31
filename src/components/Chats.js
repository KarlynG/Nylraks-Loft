import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        await auth.signOut();

        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {

        if (!user) {
            history.push('/');

            return;
        }

        let newUsername = user.displayName.replace(/\s/g, "");
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "b82d0db2-cebb-425b-8daa-d2176e490eb4",
                "user-name": newUsername,
                "user-secret": user.uid,
            }
        })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                let formdata = new FormData();
                formdata.append('email', user.email);
                formdata.append('username', newUsername);
                formdata.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formdata.append('avatar', avatar, avatar.name);
                        axios.post('https://api.chatengine.io/users/',
                            formdata,
                            { headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                        )
                            .then(() => {
                                // Test
                                let formdata2 = new FormData();
                                formdata2.append('username', newUsername);
                                let axios = require('axios');
                                let config = {
                                    method: 'post',
                                    url: 'https://api.chatengine.io/chats/27810/people/',
                                    headers: {
                                        "Project-ID": process.env.REACT_APP_CHAT_ENGINE_ID,
                                        "User-Name": process.env.REACT_APP_CHAT_ENGINE_USER,
                                        "User-Secret": process.env.REACT_APP_CHAT_ENGINE_SECRET
                                    },
                                    data: formdata2
                                };

                                axios(config)
                                    .then(function (response) {
                                        console.log("Added to global chat");
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                setLoading(false);
                            })
                            .catch((error) => console.log(error))
                    });

            })
    }, [user, history]);

    if (!user || loading) return (
        <div class="loader-wrapper">
            <span class="loader"><span class="loader-inner"></span></span>
        </div>
    );

    return (
        <div className="chats-page">
            <header class="version-1">
                <nav>
                    <ul>
                        <li><h4><i class="far fa-chart-bar"></i>Nyl'sLoft</h4></li>
                    </ul>
                </nav><a class="user" href="#" onClick={handleLogout}><i class="far fa-user"></i>Logout</a>
            </header>

            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.displayName.replace(/\s/g, "")}
                userSecret={user.uid}
            />
            <footer>
                <p id="footer">
                    Made by Nylrak using React and Firebase
                </p>
            </footer>
        </div>
    );
}

export default Chats;