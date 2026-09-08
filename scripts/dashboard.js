const loginStatus = localStorage.getItem('loginStatus');

if (loginStatus === 'true') {
    alert('Login true');
}else {
    window.location.href = '/login';
}