(function () {
    document.addEventListener("DOMContentLoaded", function() {

        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const refreshToken = urlParams.get('refresh_token')

        const tokenInput = document.querySelector('#token-input');
        const refreshTokenInput = document.querySelector('#refreshToken-input');

        const nameElement = document.querySelector('#user-name');
        const mailElement = document.querySelector('#user-mail');
        const idElement = document.querySelector('#user-id');

        const editProfileButton = document.querySelector('#edit-profil-button');

        editProfileButton.addEventListener('click', (e) => {
            e.preventDefault()

            window.open('https://sso.maxencemottard.com/profile', '_blank')
        })

        function setInputs(token, refreshToken) {
            tokenInput.value = token
            refreshTokenInput.value = refreshToken
        }

        setInputs(token, refreshToken)

        fetch('/me', {
            method: 'GET',
            headers: { authorization: token },
        })
            .then(result => result.json())
            .then(user => {
                nameElement.innerText = `${user.firstname} ${user.lastname}`
                mailElement.innerText = user.mail
                idElement.innerText = `id: ${user._id}`
            })

        fetch('/data', {
            method: 'GET',
            headers: { authorization: token },
        })
            .then(result => result.json())
            .then(data => {
                console.log(data)
            })

    });
})()
