const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('loginButton');
const errorLabel = document.getElementById('errorLabel');
const loginStatus = localStorage.getItem('loginStatus');
const registerButton = document.getElementById('registerButton')

if (loginStatus === 'true') {
    window.location.href = '/dashboard';
}


async function login(name, password) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: name, password: password}),
    });
    const data = await response.json();
    if (response.status==200){
        localStorage.setItem('loginStatus', 'true');
        localStorage.setItem('username', name);
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard';
    } else {
        errorLabel.textContent = data.detail;
        usernameInput.style.borderColor = 'red';
        passwordInput.style.borderColor = 'red';
        usernameInput.focus();
    }
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

registerButton.addEventListener('click', () => {
    window.location.href = '/register'
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