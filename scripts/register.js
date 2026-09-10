const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const errorLabel = document.getElementById('errorLabel');
const registerButton = document.getElementById('registerButton')

async function register(name, password) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: name, password: password}),
    });
    const data = await response.json();
    if (data.status === 'success'){
        alert(data.message)
        window.location.href = '/login'
    } else {
        errorLabel.textContent = data.message;
        usernameInput.style.borderColor = 'red';
        passwordInput.style.borderColor = 'red';
        usernameInput.focus();
    }
    console.log(data)
};

registerButton.addEventListener('click', () => {
    if (usernameInput.value === '' && passwordInput.value === '') {
        errorLabel.textContent = 'Please enter a username and password.';
        usernameInput.style.borderColor = 'red';
        passwordInput.style.borderColor = 'red';
        usernameInput.focus();
    }else if (usernameInput.value === '') {
        errorLabel.textContent = 'Please enter a username.';
        usernameInput.focus();
        usernameInput.style.borderColor = 'red';
    }else if (passwordInput.value === '') {
        errorLabel.textContent = 'Please enter a password.';
        passwordInput.focus();
        passwordInput.style.borderColor = 'red';
    }else {
        register(usernameInput, passwordInput)
    }
});

loginButton.addEventListener('click', () => {
    window.location.href = '/login'
});

passwordInput.addEventListener('keypress', () => {
    errorLabel.textContent = '';
    passwordInput.style.borderColor = 'transparent';
    usernameInput.style.borderColor = 'transparent';
});

usernameInput.addEventListener('keypress', () => {
    errorLabel.textContent = '';
    usernameInput.style.borderColor = 'transparent';
    passwordInput.style.borderColor = 'transparent';
});