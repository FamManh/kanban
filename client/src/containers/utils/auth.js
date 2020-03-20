export const isAuthenticated = () => {
    // send request check 

    let info = window.localStorage.getItem("kauth");
    info = JSON.parse(info)
    if (info && info.token && info.token.accessToken) return true;
    return false
};
