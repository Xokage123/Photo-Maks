export function getTheToken(url) {
    fetch(url, {
            method: 'POST'
        }).then(answer => answer.json())
        .then(info => {
            localStorage.setItem("access_token", info.access_token);
            localStorage.setItem("refresh_token", info.refresh_token);
        })
}