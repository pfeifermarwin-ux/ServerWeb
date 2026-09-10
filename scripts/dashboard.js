const loginStatus = localStorage.getItem('loginStatus');
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');
const version = localStorage.getItem('version');
const userNameText = document.getElementById('userNameText');
const greatingTitle = document.getElementById('greatingTitle');
const siteBarVersionText = document.getElementById('siteBarVersionText')
const profileBTN = document.getElementById('userBTN')
const dropdown = document.getElementById('dropdown')
const logoutBTN = document.getElementById('logoutBTN')

async function checkTokenValidity() {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/check_token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username, token: token}),
    });
    const data = await response.json();
    if (data.status === 'success'){
        localStorage.setItem('loginStatus', 'true');
    }else {
        alert('Token is invalid. Please log in again.');
        localStorage.setItem('loginStatus', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
}

async function logout() {
    const respone = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: token})
    });
    const data = await respone.json();
    if (data.status === 'success'){
        localStorage.setItem('loginStatus', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }else {
        alert('Error at Logout')
        console.log(data)
    }
}

function toggleDropdown() {
    dropdown.classList.toggle("show");
};

profileBTN.addEventListener('click', () => {
    toggleDropdown()
});

logoutBTN.addEventListener('click', () => {
    logout()
});

// loginStatus === 'true'
if (1===1) {
    // checkTokenValidity();
    siteBarVersionText.textContent = `${version}`
    userNameText.textContent = `${username}`;
    greatingTitle.textContent = `Hello, ${username}`;
}else {
    // window.location.href = '/login';
};
