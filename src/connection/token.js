export async function getTheToken(url) {
    const answer = await fetch(url, {
        method: 'POST'
    });
    console.log(answer);
    const infoToken = await answer.json();
    if (!infoToken.error) {
        localStorage.setItem("access_token", infoToken.access_token);
        localStorage.setItem("refresh_token", infoToken.refresh_token);
    }
}