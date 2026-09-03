const loginStatus = localStorage.getItem('loginStatus');

if (loginStatus === 'true') {
    alert('Login')
}else {
    window.location.href = '/login.html';
}