
import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = ({ appId }) => {
    const [userData, setUserData] = useState(null);

    const responseFacebook = (response) => {
        if (response.status !== 'unknown') {
            setUserData({
                name: response.name,
                email: response.email,
                picture: response.picture.data.url
            });
        } else {
            setUserData(null);
        }
    };

    const handleLogout = () => {
        setUserData(null);
    };

    return (
        <div>
            {userData ? (
                <div>
                    <h3>Welcome, {userData.name}!</h3>
                    <img src={userData.picture} alt="Profile" />
                    <p>Email: {userData.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <FacebookLogin
                    appId={appId}
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon="fa-facebook"
                    textButton="Login with Facebook"
                />
            )}
        </div>
    );
};


export default FacebookLoginComponent;


