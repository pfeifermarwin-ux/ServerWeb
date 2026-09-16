const loginStatus = localStorage.getItem('loginStatus');

if (loginStatus === 'true') {
    window.location.href = '/dashboard'
}else {
    window.location.href = '/login';
}