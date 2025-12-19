
const Topic = ["animal", "app", "brand", "car", "color", "country", "flower", "food", "club", "game", "hobby", "movie", "music", "sport", "subject", "visit"]

const Item = { "animal": ["bird", "cat", "dog", "fish", "pig", "snake"], "app": ["facebook", "netflix", "spotify", "tiktok", "whatsapp", "youtube"], "car": ["audi", "bmw", "chevrolet", "mercedes", "toyota", "vw"], "color": ["black", "blue", "green", "pink", "red", "yellow"], "country": ["brazil", "england", "france", "korea", "sa", "usa"], "flower": ["dandelion", "hibiscus", "hydrangea", "lily", "rose", "sunflower"], "food": ["burger", "cake", "icecream", "pie", "pizza", "salad"], "club": ["barcelona", "liverpool", "mancity", "manunited", "psg", "realmadrid"], "hobby": ["cooking", "dancing", "drawing", "gaming", "singing", "sleeping"], "game": ["candycrush", "chess", "cod", "fifa", "ludo", "minecraft"], "movie": ["action", "animation", "comedy", "horror", "romance", "scifi"], "music": ["electronic", "gospel", "hiphop", "reggae", "rnb", "pop"], "sport": ["basketball", "boxing", "criket", "football", "rugby", "tennis"], "subject": ["geography", "history", "math", "physics", "science", "tourism"], "visit": ["amusementpark", "beach", "city", "museum", "park", "zoo"], "brand": ["addidas", "lacoste", "louisvuitton", "nike", "puma", "reebok"] }

let TopicOder = []
let Picks = {}
let questionText = ""
let onRound = 1
let username ="noName"
let officialTopics = []
let browseTopic = -1
let onTopic = "Loading... :)"


setName()

function SetUpQuizMake() {


    function TopicOderGen() {
        let oderList = []
        let randomNum = 0

        while (oderList.length < Topic.length) {

            randomNum = Math.ceil(Math.random() * Topic.length)

            if (!oderList.includes(Topic[randomNum - 1])) { oderList.push(Topic[randomNum - 1]) }

        }
        return oderList
    }

    TopicOder = TopicOderGen()

}
SetUpQuizMake()


function NextRound() {
    document.getElementById("round").innerText = `${onRound} of 10`

    browseTopic += 1
    if (browseTopic >= TopicOder.length - 1) { browseTopic = 0 }

    function SetRoundValues() {
        if (officialTopics.includes(TopicOder[browseTopic])) {
            SetRoundValues()
        }
        else {
            onTopic = TopicOder[browseTopic]
            switch (onTopic) {
                case "hobby": questionText = "Which hobby do you like?"
                    break;
                case "movie": questionText = "Which movie genre do you prefer?"
                    break;
                case "country": questionText = "Which country would you visit?"
                    break;
                case "car": questionText = "Which car brand do you prefer?"
                    break;
                case "subject": questionText = "Which school subject do you prefer?"
                    break;
                case "animal": questionText = "Which pet do you prefer?"
                    break;
                case "visit": questionText = "Which place would you visit?"
                    break;
                default: questionText = `Which ${onTopic} do you prefer?`
                    break;
            }


        }
        document.getElementById("roundTopic").innerText = questionText

        function SetLogos() {
            for (let index = 1; index < 7; index++) {

                document.getElementById(`logoTittle${index}`).innerText = TittleFix(Item[onTopic][index - 1])

                document.getElementById(`logo${index}`).setAttribute("src", ``)

                document.getElementById(`logo${index}`).setAttribute("src", `./logo/${onTopic}/${Item[onTopic][index - 1]}.png`)

            }
        }
        SetLogos()

    }

    SetRoundValues()
}

NextRound()

function skipTopic() {
    NextRound()
}


function pick1() { picked(1) }
function pick2() { picked(2) }
function pick3() { picked(3) }
function pick4() { picked(4) }
function pick5() { picked(5) }
function pick6() { picked(6) }

function picked(num){
    Picks[onTopic] = Item[onTopic][num - 1]
    officialTopics.push(onTopic)

    if (onRound < 10) {
        onRound += 1
        NextRound()
    }
    else {
        Finished()
    }
}


function TittleFix(word) {

    switch (word) {
        case "sa": return "South Africa"
        case "usa": return "USA"
        case "scifi": return "Sci-Fi"
        case "psg": return "PSG";
        case "manunited": return "Man United"
        case "mancity": return "Man City"
        case "realmadrid": return "Real Madrid"
        case "whatsapp": return "WhatsApp"
        case "youtube": return "YouTube"
        case "tiktok": return "TikTok"
        case "rnb": return "R&B"
        case "hiphop": return "HipHop"
        case "icecream": return "IceCream"
        case "vw": return "VW"
        case "bmw": return "BMW"
        case "amusementpark": return "Amusement Park"
        case "candycrush": return "Candy Crush"
        case "cod": return "Call Of Duty"
        case "louisvuitton": return "Louis Vuitton"
        case "": return ""
        default:
            break;
    }

    return word.slice(0, 1).toUpperCase() + word.slice(1)
}

async function setName(){
    username = await cookieStore.get("username").then(res=>res["value"])      
}

async function Finished(){

    document.getElementById("makeBody").innerHTML="<h1>Loading...</h1>"
    const response = await fetch("/sharing",{method:"POST",headers:{"Content-Type":"application/json"},body:  JSON. stringify({"name":username,Picks,officialTopics})})
    console.log("::::::"+username);
    
    if(response.status!=200){
        console.log("Error Occured");
        
        return
    }
    if(response.status==200){
        console.log("EVERYTHIGN GOOOD");
        const resData = await response.json()
        console.log(await resData);
        if(resData["state"]=="good"){
            cookieStore.set("gameLink",resData["link"])
            window.location.href=resData["page"]
        }
    }

}