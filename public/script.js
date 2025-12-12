function LogIn(){
    console.log("Submit!")
    let name = document.getElementById("name").value
    let password = document.getElementById("password").value

    if(name==""){
        console.log("No Name!");
        document.getElementById("logWarnText").innerText="Name/Nickname is missing"
        document.getElementById("logWarning").setAttribute("class","logWarnOn")
    }
    else if(password==""){
        console.log("No Name!");
        document.getElementById("logWarnText").innerText="Pin/Password is missing"
        document.getElementById("logWarning").setAttribute("class","logWarnOn")
    }
    else{document.getElementById("logWarning").setAttribute("class","logWarnOff")}
   
}

console.log("Script Connected");
