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
const overviewButton = document.getElementById('overviewButton');
const userManage = document.getElementById('userManage');
const logInspect = document.getElementById('logInspect');
const changePassword = document.getElementById('changePassword');
const changePasswordCancelButton = document.getElementById('changePasswordCancelButton');
const changePasswordApplyButton = document.getElementById('changePasswordApplyButton');


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

async function getUsers() {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/get_users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username,token: token})
    });
    const data = await response.json();
    if (response.status == 200){
        return data
    }else {
        await openNotification(`Error: ${response.status}`, data.detail)
    }
}

async function getUserInfo(useruuid) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/get_user_info', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            useruuid: useruuid,
            requestUserName: username,
            requestUserToken: token
        })
    });
    const data = await response.json();
    if (response.status == 200){
        return data
    }else {
        let errorDetail = "Unbekannter Serverfehler";
        try {
            const data = await response.json();
            errorDetail = data.detail || JSON.stringify(data);
        } catch (e) {
            errorDetail = await response.text();
        }
        await openNotification(`Error: ${response.status}`, errorDetail);
    }
}

async function getLogs(uuid) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/getUserLogs', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            useruuidforlog: uuid,
            username: username,
            token: token
        })
    });
    const data = await response.json();
    if (response.status === 200){
        return data
    }else {
        let errorDetail = "Unbekannter Serverfehler";
        try {
            const data = await response.json();
            errorDetail = data.detail || JSON.stringify(data);
        } catch (e) {
            errorDetail = await response.text();
        }
        await openNotification(`Error: ${response.status}`, errorDetail);
    }
}

async function getLog(loguuid) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/get_log_by_loguuid', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({loguuid: loguuid, username: username, token: token})
    });
    const data = await response.json();
    if (response.status === 200){
        return data
    }else {
        let errorDetail = "Unbekannter Serverfehler";
        try {
            const data = await response.json();
            errorDetail = data.detail || JSON.stringify(data);
        } catch (e) {
            errorDetail = await response.text();
        }
        await openNotification(`Error: ${response.status}`, errorDetail);
    }
}

async function blockUser(uuid) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/block_user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({useruuidToBlock: uuid, username: username, token: token})
    });
    const data = await response.json();
    if (response.status === 200){
        return
    }else {
        let errorDetail = "Unbekannter Serverfehler";
        try {
            const data = await response.json();
            errorDetail = data.detail || JSON.stringify(data);
        } catch (e) {
            errorDetail = await response.text();
        }
        await openNotification(`Error: ${response.status}`, errorDetail);
    }
};

async function unblockUser(uuid) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/unblock_user', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({useruuidToUnblock: uuid, username: username, token: token})
    });
    const data = await response.json();
    if (response.status === 200){
        return
    }else {
        let errorDetail = "Unbekannter Serverfehler";
        try {
            const data = await response.json();
            errorDetail = data.detail || JSON.stringify(data);
        } catch (e) {
            errorDetail = await response.text();
        }
        await openNotification(`Error: ${response.status}`, errorDetail);
    }
};

async function changeOwnPassword(oldPassword, newPassword) {
    const response = await fetch('https://ubuntuserver.tail818fdd.ts.net/api/change_password', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, token: token, old_password: oldPassword, new_password: newPassword})
    });
    const data = await response.json();
    if (response.status === 200){
        return data
    }else {
        let errorDetail = "Unbekannter Serverfehler";
        try {
            const data = await response.json();
            errorDetail = data.detail || JSON.stringify(data);
        } catch (e) {
            errorDetail = await response.text();
        }
        await openNotification(`Error: ${response.status}`, errorDetail);
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

async function manageUser(uuid) {
    userManage.style.display = 'flex';
    const userInfo = await getUserInfo(uuid);
    let lastLoginFormated;
    if (userInfo.lastLogin !== null && userInfo.lastLogin !== undefined){
        const lastLogin = new Date(userInfo.lastlogin)
        lastLoginFormated = lastLogin.toLocaleString('de-DE', {
            dateStyle: 'medium',
            timeStyle: 'short'
        });
    }else {
        lastLoginFormated = "-"
    }
    let registerAtFormated;
    if (userInfo.registerAt !== null && userInfo.registerAt !== undefined){
        const registerAt = new Date(userInfo.registerAt)
        registerAtFormated = registerAt.toLocaleString('de-DE', {
            dateStyle: 'medium',
            timeStyle: 'short'
        })
    }else {
        registerAtFormated = "-"
    }
    if (userInfo.isblocked === false){
        document.getElementById('userManageOverviewHeadBlockButton').classList.remove("userManageOverviewHeadUnblockButton");
        document.getElementById('userManageOverviewHeadBlockButton').classList.add("userManageOverviewHeadBlockButton");
        document.getElementById('userManageOverviewHeadBlockButtonIcon').classList.remove("userManageOverviewHeadUnblockButtonIcon");
        document.getElementById('userManageOverviewHeadBlockButtonIcon').classList.add("userManageOverviewHeadBlockButtonIcon");
        document.getElementById('userManageOverviewHeadBlockButtonIcon').src = "assets/lock_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
        document.getElementById('userManageOverviewHeadBlockButtonText').classList.remove("userManageOverviewHeadUnblockButtonText");
        document.getElementById('userManageOverviewHeadBlockButtonText').classList.add("userManageOverviewHeadBlockButtonText");
        document.getElementById('userManageOverviewHeadBlockButtonText').textContent = "Block User";
        document.getElementById('userManageOverviewHeadBlockButton').onclick = async () => {
            await blockUser(uuid);
            await manageUser(uuid);
        }
    }else {
        document.getElementById('userManageOverviewHeadBlockButton').classList.remove("userManageOverviewHeadBlockButton");
        document.getElementById('userManageOverviewHeadBlockButton').classList.add("userManageOverviewHeadUnblockButton");
        document.getElementById('userManageOverviewHeadBlockButtonIcon').classList.remove("userManageOverviewHeadBlockButtonIcon");
        document.getElementById('userManageOverviewHeadBlockButtonIcon').classList.add("userManageOverviewHeadUnblockButtonIcon");
        document.getElementById('userManageOverviewHeadBlockButtonIcon').src = "assets/lock_open_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
        document.getElementById('userManageOverviewHeadBlockButtonText').textContent = "Unblock User";
        document.getElementById('userManageOverviewHeadBlockButtonText').classList.remove("userManageOverviewHeadBlockButtonText");
        document.getElementById('userManageOverviewHeadBlockButtonText').classList.add("userManageOverviewHeadUnblockButtonText");
        document.getElementById('userManageOverviewHeadBlockButton').onclick = async () => {
            await unblockUser(uuid);
            await manageUser(uuid);
        }
    }
    const userManageOverviewHeadNameDivUsername = document.getElementById('userManageOverviewHeadNameDivUsername');
    const userManageOverviewHeadNameDivRegistertDivText = document.getElementById('userManageOverviewHeadNameDivRegistertDivText');
    const userManageOverviewCardRoleText = document.getElementById('userManageOverviewCardRoleText');
    const userManageOverviewCardLastLoginText = document.getElementById('userManageOverviewCardLastLoginText');
    const userManageOverviewInfoNameAnswer = document.getElementById('userManageOverviewInfoNameAnswer');
    const userManageOverviewInfoEmailAnswer = document.getElementById('userManageOverviewInfoEmailAnswer');
    const userManageOverviewInfoUuidAnswer = document.getElementById('userManageOverviewInfoUuidAnswer');
    const userManageOverviewInfoBirthdayAnswer = document.getElementById('userManageOverviewInfoBirthdayAnswer');
    const userManageOverviewInfoRegisteratAnswer = document.getElementById('userManageOverviewInfoRegisteratAnswer');
    userManageOverviewHeadNameDivUsername.textContent = userInfo.username;
    userManageOverviewHeadNameDivRegistertDivText.textContent = `Registert at: ${registerAtFormated}`;
    userManageOverviewCardRoleText.textContent = userInfo.role;
    userManageOverviewCardLastLoginText.textContent = lastLoginFormated;
    userManageOverviewInfoNameAnswer.textContent = userInfo.name;
    userManageOverviewInfoEmailAnswer.textContent = userInfo.email;
    userManageOverviewInfoUuidAnswer.textContent = userInfo.useruuid;
    userManageOverviewInfoBirthdayAnswer.textContent = userInfo.birthdate;
    userManageOverviewInfoRegisteratAnswer.textContent = registerAtFormated

    const userManageOverviewAktivitiesTable = document.querySelector('#userManageOverviewAktivitiesTable tbody');
    const logs = await getLogs(uuid)
    if (!logs) {
        return;
    }
    userManageOverviewAktivitiesTable.innerHTML = "";
    logs.logs.reverse().forEach(log => {
        const createdAtUnf = new Date(log.created_at);
        const createdAtFor = createdAtUnf.toLocaleString('de-DE', {
            dateStyle: 'medium',
            timeStyle: 'short'
        })
        const newRow = userManageOverviewAktivitiesTable.insertRow()
        const createdat = newRow.insertCell(0);
        createdat.textContent = createdAtFor;
        const level = newRow.insertCell(1);
        level.textContent = log.level;
        const path = newRow.insertCell(2);
        path.textContent = log.path;
        path.classList.add("userManageOverviewAktivitiesTablePath")
        const message = newRow.insertCell(3);
        message.textContent = log.message;
        message.classList.add("userManageOverviewAktivitiesTableMessage");
        newRow.classList.add("userManageOverviewAktivitiesTableRow");
        createdat.classList.add("userManageOverviewAktivitiesTableCreatedat");
        if (log.level === "WARNING"){
            level.classList.add("userManageOverviewAktivitiesTableLevelWarning");
        }
        if (log.level == "ERROR"){
            level.classList.add("userManageOverviewAktivitiesTableLevelError");
        }
        if (log.level == "INFO"){
            level.classList.add("userManageOverviewAktivitiesTableLevelInfo");
        }
        newRow.onclick = () => {
            openLog(log.loguuid)
        };
    });
}

async function openLog(loguuid) {
    logInspect.style.display = 'flex';
    const LogData = await getLog(loguuid);
    const logLevel = LogData.log.level;
    const message = LogData.log.message;
    const path = LogData.log.path;
    const code = LogData.log.code;
    const metadata = LogData.log.metadata;
    const logInspectLevel = document.getElementById('logInspectLevel');
    if (logLevel === 'INFO'){
        logInspectLevel.classList.remove('logInspectLevelWarning', 'logInspectLevelError');
        logInspectLevel.classList.add('logInspectLevelInfo');
        logInspectLevel.textContent = 'INFO';
    }else if(logLevel === 'WARNING') {
        logInspectLevel.classList.remove('logInspectLevelInfo', 'logInspectLevelError');
        logInspectLevel.classList.add('logInspectLevelWarning')
        logInspectLevel.textContent = 'WARNING';
    }else if(logLevel === 'ERROR') {
        logInspectLevel.classList.remove('logInspectLevelInfo', 'logInspectLevelWarning');
        logInspectLevel.classList.add('logInspectLevelError')
        logInspectLevel.textContent = 'ERROR';
    }
    const logInspectMessage = document.getElementById('logInspectMessage');
    logInspectMessage.textContent = message;
    const logInspectPath = document.getElementById('logInspectPath');
    logInspectPath.textContent = path;
    const logInspectCode = document.getElementById('logInspectCode');
    logInspectCode.textContent = `Status Code: ${code}`;
    const logInspectLogUUID = document.getElementById('logInspectLogUUID');
    logInspectLogUUID.textContent = `Log UUID: ${loguuid}`;
    const logInspectMetadataViewCode = document.getElementById('logInspectMetadataViewCode');
    logInspectMetadataViewCode.textContent = JSON.stringify(metadata, null, 2);
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

siteBarManageUserBTN.onclick = async () => {
    setMainPage("manageUsersSite")
    const table = document.querySelector('#usersTable tbody')
    const users = await getUsers()
    if (!users) {
        return;
    }
    table.innerHTML = "";
    users.users.forEach(user => {
        const newRow = table.insertRow()
        newRow.insertCell(0).textContent = user.username;
        newRow.insertCell(1).textContent = user.useruuid;
        newRow.insertCell(2).textContent = user.createdat;
        newRow.insertCell(3).textContent = user.role;

        newRow.onclick = () => {
            manageUser(user.useruuid)
        };
    });
};

overviewButton.onclick = () => {
    setMainPage("overviewSite")
};

changePasswordCancelButton.onclick = () => {
    document.getElementById('changePasswordOldPassword').textContent = '';
    document.getElementById('changePasswordNewPassword').textContent = '';
    document.getElementById('changePasswordRepeatNewPassword').textContent = '';
    changePassword.style.display = 'none';
};

const changePasswordOldPassword = document.getElementById('changePasswordOldPassword');
const changePasswordNewPassword = document.getElementById('changePasswordNewPassword');
const changePasswordRepeatNewPassword = document.getElementById('changePasswordRepeatNewPassword');
const changePasswordErrorLabel = document.getElementById('changePasswordErrorLabel');

changePasswordApplyButton.onclick = async () => {
    if (changePasswordRepeatNewPassword.value === "") {
        changePasswordErrorLabel.textContent = 'Please fill in all fields.';
        changePasswordRepeatNewPassword.style.borderColor = 'red';
        changePasswordRepeatNewPassword.focus();
    }
    if (changePasswordNewPassword.value === "") {
        changePasswordErrorLabel.textContent = 'Please fill in all fields.';
        changePasswordNewPassword.style.borderColor = 'red';
        changePasswordNewPassword.focus();
    }
    if (changePasswordOldPassword.value === "") {
        changePasswordErrorLabel.textContent = 'Please fill in all fields.';
        changePasswordOldPassword.style.borderColor = 'red';
        changePasswordOldPassword.focus();
    }
    if (changePasswordOldPassword.value !== '' && changePasswordNewPassword.value !== '' && changePasswordRepeatNewPassword.value !== '') {
        if (changePasswordNewPassword.value === changePasswordRepeatNewPassword.value){
            const response = await changeOwnPassword(changePasswordOldPassword.value, changePasswordNewPassword.value);
            changePassword.style.display = 'none';
            await openNotification(response.status, response.message)
            localStorage.setItem('loginStatus', 'false');
            localStorage.removeItem('username');
            localStorage.removeItem('token');
            window.location.href = '/login';
        }else{
            changePasswordErrorLabel.textContent = 'Passwords do not match.';
            changePasswordNewPassword.style.borderColor = 'red';
            changePasswordRepeatNewPassword.style.borderColor = 'red';
            changePasswordNewPassword.focus();
        }
    }
};

changePasswordOldPassword.addEventListener('keypress', () => {
    changePasswordErrorLabel.textContent = '';
    changePasswordOldPassword.style.border = '#ffffff0a solid 1px';
    changePasswordNewPassword.style.border = '#ffffff0a solid 1px';
    changePasswordRepeatNewPassword.style.border = '#ffffff0a solid 1px';
});

changePasswordNewPassword.addEventListener('keypress', () => {
    changePasswordErrorLabel.textContent = '';
    changePasswordOldPassword.style.border = '#ffffff0a solid 1px';
    changePasswordNewPassword.style.border = '#ffffff0a solid 1px';
    changePasswordRepeatNewPassword.style.border = '#ffffff0a solid 1px';
});

changePasswordRepeatNewPassword.addEventListener('keypress', () => {
    changePasswordErrorLabel.textContent = '';
    changePasswordOldPassword.style.border = '#ffffff0a solid 1px';
    changePasswordNewPassword.style.border = '#ffffff0a solid 1px';
    changePasswordRepeatNewPassword.style.border = '#ffffff0a solid 1px';
});

settingsPopup.addEventListener('click', function(event){
    if (event.target === this){
        settingsPopup.style.display = 'none';
    }
});

site.addEventListener('click', function(event){
    if (!dropdown.contains(event.target) && !profileBTN.contains(event.target)){
        dropdown.classList.remove("show");
    };
    if (event.target == userManage && userManage.contains(event.target)){
        userManage.style.display = 'none';
    };
    if (event.target == logInspect && logInspect.contains(event.target)){
        logInspect.style.display = 'none';
    }
});
// loginStatus === 'true''
(async () => {
    if (loginStatus === 'true') {
        await checkTokenValidity();
        setMainPage("overviewSite")
        const role = await getRole();
        if (role !== 'ADMIN') {
            siteBarManageUserBTN.style.display = 'none';
        };
        siteBarVersionText.textContent = `${version}`
        userNameText.textContent = `${username}`;
        greatingTitle.textContent = `Hello, ${username}`;

    }else {
        window.location.href = '/login';
    };
})();
