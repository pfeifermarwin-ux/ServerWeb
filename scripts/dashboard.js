const loginStatus = localStorage.getItem('loginStatus');
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

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

if (loginStatus === 'true') {
    // checkTokenValidity();
}else {
    // window.location.href = '/login';
}