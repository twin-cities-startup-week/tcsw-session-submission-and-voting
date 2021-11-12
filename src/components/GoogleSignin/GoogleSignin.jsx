import React from 'react';
import { GoogleLogin } from 'react-google-login';

function GoogleSignin() {
    const clientId = process.env.CLIENT_ID;
    
    const onSuccess = (res) => {
        console.log('[Login Success] currentUser:', res.profileObj);
    }

    const onFailure = (res) => {
        console.log('[Login failure] res:', res);
    };

    return(
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ m: '10px' }}
                isSignedIn={true}
            />
        </div>
    )
}

export default GoogleSignin;