

async function CreateQuiz() {
    console.log("Create Quiz!")
    let name = document.getElementById("name").value


    if (name == "") {
        console.log("No Name!");
        document.getElementById("logWarnText").innerText = "Name/Nickname is missing"
        document.getElementById("logWarning").setAttribute("class", "logWarnOn")
        return
    }
    else { document.getElementById("logWarning").setAttribute("class", "logWarnOff") }

    try {
        await cookieStore.set("username", name)
            .then(window.location.href = "/MakeQuiz")
    }
    catch (error) {
        console.log(error);
        document.getElementById("logWarnText").innerText = "Error saving your name, please update your browser or use a different browser!"
        document.getElementById("logWarning").setAttribute("class", "logWarnOn")
        return
    }
}
console.log("Script Connected");

