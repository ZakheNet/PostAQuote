async function SetLink() {
    const Link = await cookieStore.get("gameLink")
    document.getElementById("shareLink").innerText = Link["value"]
    document.getElementById("pressLink").setAttribute("href",Link["value"])
}


SetLink()

async function copyLink(){
    const Link = await cookieStore.get("gameLink")
    navigator.clipboard.writeText(Link["value"]).then(()=>{
        document.getElementById("copyLink").innerText="COPIED!!!"
    })
}
