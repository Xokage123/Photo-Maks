export async function getTheToken(url, setFunction) {
    const answer = await fetch(url, {
        method: 'POST'
    });
    const infoToken = await answer.json();
    if (!infoToken.error) {
        localStorage.setItem("access_token", infoToken.access_token);
        localStorage.setItem("refresh_token", infoToken.refresh_token);
        setFunction(true);
    }
}