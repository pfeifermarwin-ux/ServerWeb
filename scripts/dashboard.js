const loginStatus = localStorage.getItem('loginStatus');
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');
const version = localStorage.getItem('version');
const userNameText = document.getElementById('userNameText');
const greatingTitle = document.getElementById('greatingTitle');
const siteBarVersionText = document.getElementById('siteBarVersionText');
const profileBTN = document.getElementById('userBTN');
const dropdown = document.getElementById('dropdown');
const logoutBTN = document.getElementById('logoutBTN');
const settingsButton = document.getElementById('settingsButton');
const settingsPopup = document.getElementById('settingsPopup');
const settingsButtonDropdown = document.getElementById('settingsButtonDropdown');
const settingsCloseBTN = document.getElementById('settingsCloseBTN');
const site = document.getElementById('site');
const notification = document.getElementById('notification');
const notificationTitle = document.getElementById('notificationTitle');
const notificationMessage = document.getElementById('notificationMessage');
const notificationCloseBTN = document.getElementById('notificationCloseBTN');
const notificationCloseBTN2 = document.getElementById('notificationCloseBTN2');
const siteBarManageUserBTN = document.getElementById('siteBarManageUserBTN')
const overviewButton = document.getElementById('overviewButton')


async function checkTokenValidity() {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/check_token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ username: username, token: token}),
    });
    const data = await response.json();
    if (response.status == 200){
        localStorage.setItem('loginStatus', 'true');
    }else {
        await openNotification(`Error: ${response.status}`,data.detail)
        localStorage.setItem('loginStatus', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
};

async function logout() {
    const respone = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: token})
    });
    const data = await respone.json();
    if (respone.status == 200){
        localStorage.setItem('loginStatus', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        window.location.href = '/login';
    }else {
        await openNotification(`Error: ${respone.status}`, data.detail)
    }
};

async function getRole() {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/get_role', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username,token: token})
    });
    const data= await response.json();
    if (response.status == 200){
        return data.role
    }else {
        await openNotification(`Error: ${response.status}`, data.detail)
    }
}

function openNotification(title, message) {
    return new Promise((resolve) => {
        notification.style.display = 'flex';
        notificationMessage.textContent = message;
        notificationTitle.textContent = title;

        notificationCloseBTN.onclick = () => {
            notification.style.display = 'none';
            resolve();
        };

        notificationCloseBTN2.onclick = () => {
            notification.style.display = 'none';
            resolve();
        };
    });
    
};

function showSettingsPage(id) {
    document.querySelectorAll(".settingSite").forEach(settingSite => {
        settingSite.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
}

function toggleDropdown() {
    dropdown.classList.toggle("show");
};

function setMainPage(id) {
    document.querySelectorAll(".mainPageSite").forEach(mainSite => {
        mainSite.style.display = "none"
    })
    document.getElementById(id).style.display = "block"
}

profileBTN.addEventListener('click', () => {
    toggleDropdown()
});

logoutBTN.addEventListener('click', () => {
    logout()
});

settingsButton.addEventListener('click', () => {
    settingsPopup.style.display = 'flex';
});

settingsButtonDropdown.addEventListener('click', () => {
    settingsPopup.style.display = 'flex';
});

settingsCloseBTN.onclick = () => {
    settingsPopup.style.display = 'none';
};

siteBarManageUserBTN.onclick = () => {
    setMainPage("manageUsersSite")
    const table = document.querySelector('#usersTable tbody')
    const newRow = table.insertRow()

};

overviewButton.onclick = () => {
    setMainPage("overviewSite")
};

settingsPopup.addEventListener('click', function(event){
    if (event.target === this){
        settingsPopup.style.display = 'none';
    }
});

site.addEventListener('click', function(event){
    if (!dropdown.contains(event.target) && !profileBTN.contains(event.target)){
        dropdown.classList.remove("show");
    };
});
// loginStatus === 'true''
if (loginStatus === 'true') {
    checkTokenValidity();
    setMainPage("overviewSite")
    if (!getRole === 'ADMIN') {
        siteBarManageUserBTN.style.display = 'none';
    }
    siteBarVersionText.textContent = `${version}`
    userNameText.textContent = `${username}`;
    greatingTitle.textContent = `Hello, ${username}`;

}else {
    window.location.href = '/login';
};
