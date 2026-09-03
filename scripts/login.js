const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const errorLabel = document.getElementById('errorLabel');

async function login(name, password) {
    const response = await fetch('https://ubuntu-server.tail818fdd.ts.net/api/app/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: name, password: password, app: 'website' }),
    });
    const data = await response.json();
    console.log(data);
};

loginButton.addEventListener('click', () => {
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
        login(usernameInput.value, passwordInput.value);
    }
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