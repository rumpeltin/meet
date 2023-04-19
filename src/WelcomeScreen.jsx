import React from "react";

function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
    (
        <div className="WelcomeScreen fixed w-full top-0 left-0 min-h-screen flex items-center text-center flex-col py-10 bg-gray-50 gap-6">
            <h1 className="text-3xl sm:text-4xl text-blue-500 mt-36">Welcome to Meet</h1>
            <h4 className="text-2xl sm:text-2xl">Log in to see upcoming events around the world for full-stack developers!</h4>
            <div className="button_cont">
                    <button onClick={() => { props.getAccessToken() }}
                        rel="nofollow noopener"
                        className="btn flex items-center justify-center"
                    >
                      <b>Sign in with Google</b>
                    </button>

            </div>
            <a href="https://rumpeltin.github.io/meet/privacy.html" rel="nofollow noopener">
                Privacy policy
            </a>
        </div>
    )
    : null
}

export default WelcomeScreen;