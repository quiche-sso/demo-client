const redirect_url = `${window.location.origin}/login-callback`
const public_key = 'pub_cf0e6283ca55af43944a4d49f9a09c7efb696a78c947e298339495c1ccc7edb1acdc0938cf3b1e032617538e8a4cc2bdcb80'

function handleSignin(e) {
    e.preventDefault();

    window.location = `https://sso.maxencemottard.com/login?redirect_url=${redirect_url}&public_key=${public_key}`
}

function handleSignup(e) {
    e.preventDefault();

    window.location = `https://sso.maxencemottard.com/register?redirect_url=${redirect_url}&public_key=${public_key}`
}

(function () {
    document.addEventListener("DOMContentLoaded", function() {
        const signupButton = document.querySelector('#signup-button');
        const signinButton = document.querySelector('#signin-button');

        signinButton.addEventListener('click', handleSignin)
        signupButton.addEventListener('click', handleSignup)
    });
})()
