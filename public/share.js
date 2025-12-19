/*
*/
console.log(124454);

async function SetLink() {
    const Link = await cookieStore.get("gameLink")
    document.getElementById("shareLink").innerText = Link["value"]
    document.getElementById("pressLink").setAttribute("href",Link["value"])
}


SetLink()
