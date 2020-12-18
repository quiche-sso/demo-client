(function () {
    document.addEventListener("DOMContentLoaded", function() {
        const signupButton = document.querySelector('#signup-button');
        const signinButton = document.querySelector('#signin-button');

        const redirect_url = `http://localhost:5000/login-callback`
        const public_key = 'pub_642abc8e03eced3bfcfd9df43e2ff8655e2b270aaebdf66ef36782ddfd436b81ce2e72997a6df003ed5664634aea17a5707b'

        function handleSignin(e) {
            e.preventDefault();

            window.location = `https://sso.maxencemottard.com/login?redirect_url=${redirect_url}&public_key=${public_key}`
        }

        function handleSignup(e) {
            e.preventDefault();

            window.location = `https://sso.maxencemottard.com/register?redirect_url=${redirect_url}&public_key=${public_key}`
        }

        signinButton.addEventListener('click', handleSignin)
        signupButton.addEventListener('click', handleSignup)
    });
})()
