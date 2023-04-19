import React from "react";
import './WelcomeScreen.css';

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (
        <div className="WelcomeScreen">
            <h1>Welcome to Meet</h1>
            <p>Log in to see upcoming events around the world for full-stack developers!</p>
            <div className="button_cont">
                    <button onClick={() => { props.getAccessToken() }}
                        rel="nofollow noopener"
                        className="google-btn"
                    >
                      <p>Sign in with Google</p>
                    </button>

            </div>
            <a className="policy-link" href="https://rumpeltin.github.io/meet/privacy.html" rel="nofollow noopener">
                Privacy policy
            </a>
        </div>
    )
    : null
}

export default WelcomeScreen;