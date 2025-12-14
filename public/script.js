

async function CreateQuiz() {
    console.log("Create Quiz!")
    let name = document.getElementById("name").value
   

    if (name == "") {
        console.log("No Name!");
        document.getElementById("logWarnText").innerText = "Name/Nickname is missing"
        document.getElementById("logWarning").setAttribute("class", "logWarnOn")
        return
    }
    else{ document.getElementById("logWarning").setAttribute("class", "logWarnOff") }

    window.location.href = "/MakeQuiz" 

}
console.log("Script Connected");

