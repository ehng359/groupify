// Script
let main = document.getElementsByTagName("body")[0]
main.addEventListener("click", () => {
    selectionRange = [-1, -1]
})

let form = document.getElementById("main")
var textarea : HTMLCollectionOf<HTMLTextAreaElement>
var tabs : Array<chrome.tabs.Tab>

let local_index = localStorage.getItem("total")
let index = local_index == null ? form!.childElementCount : Number(local_index) - 1
let selectionRange = [-1, -1]

let textAreaStyling = "resize-none"
let buttonStyling = "bg-gray-600 w-10 text-center"
let sectionStyling = "flex-row"

function localSave() : void {
    localStorage.setItem("total", String(index ? index + 1 : 0))
    let formContents = form!.innerHTML
    formContents = formContents.replace(/(\r\n|\n|\r|\\|\")/gm, "")
    formContents = formContents.trim()
    localStorage.setItem("formContents", JSON.stringify(formContents))
}

const getTabs = async () => {
    var queryResults = await chrome.tabs.query(
        {   
            "currentWindow" : true,
            "groupId" : -1,
        }
    )
    tabs = queryResults
}

const createGroupings = async() => {
    // Iterating through every instance of the groupings (each key-value pairing)
    const groupUpdate = async(matches: Array<number>, groupName : string, color: chrome.tabGroups.ColorEnum = "red") => {
        await chrome.tabs.group({tabIds: matches}, async (groupId) => {
            await chrome.tabGroups.update(groupId, { 
                "title": groupName,
                "color": color,
                "collapsed": false
            })
        })
    }

    for (var i = 0; i < textarea.length; i+=2) {
        await getTabs()
        var groupName = textarea[i].innerHTML
        var keys = textarea[i + 1].innerHTML
        if (keys == "") {
            continue
        }

        var search = keys.split(',')

        var matches : Array<number> = []
        tabs.map((tab, index) => {
            var title = tab.title!
            var url = tab.url!

            var hasMatchingKey : boolean = search.map((key) => { 
                var re = new RegExp(key)
                if (re.exec(title) || re.exec(url))
                    return true
                return false
            })
            .reduce((acc, x) =>  acc || x)
            
            if (hasMatchingKey && tab.groupId == -1) {
                matches.push(tab.id!)
            }
        })

        // Create groupings with the presented matches
        if (matches.length){
            await groupUpdate(matches, groupName, "blue")
        }
    }
}

const delegateButtons = () => {
    let buttons = document.getElementsByTagName("button")
    for (let i = 0; i < buttons.length; i+=1) {
        if (buttons[i].id == "addGrouping" || buttons[i].id == "createGrouping") {
            continue
        }
        buttons[i].addEventListener("click", (event) => {
            let target = <HTMLButtonElement> event.currentTarget
            let id = target.id.slice(1, target.id.length)
            console.log("id", id)
            let div = document.getElementById(`d${id}`)
            div!.innerHTML = ""
            div?.remove()
            localSave()
        })
    }
}

function textAreaInputHandler(event : KeyboardEvent) {
    let target = <HTMLElement> event.currentTarget
    let inputTarget = <HTMLInputElement> event.currentTarget
    let cursorPosition = inputTarget.selectionStart!
    switch (event.key) {
        case "Shift":
        case "Control":
        case "Enter":
        case "Alt":
        case "Meta":
            event.preventDefault()
            break;
        case "Tab":
            break;
        case "Backspace":
            event.preventDefault()
            if (selectionRange[0] != -1) {
                let str = target.innerHTML
                target.innerHTML = str.slice(0, selectionRange[0]) + str.slice(selectionRange[1], str.length)
                selectionRange = [-1, -1]
            } else {
                target.innerHTML = target.innerHTML.slice(0, -1)
                cursorPosition = cursorPosition == 0 ? 0 : cursorPosition - 1
            }
            break;
        default:
            event.preventDefault()
            if (selectionRange[0] != -1) {
                let str = target.innerHTML
                target.innerHTML = str.slice(0, selectionRange[0]) + event.key + str.slice(selectionRange[1], str.length)
                selectionRange = [-1, -1]
            } else {
                target.innerHTML = target.innerHTML + event.key
                cursorPosition += 1
            }
    }
    console.log("End cursor position", cursorPosition)
    inputTarget.setSelectionRange(cursorPosition, cursorPosition)
    localSave()
}

function textAreaSelectionHandler (event : Event) {
    var target = <HTMLInputElement> event.currentTarget
    let start = target.selectionStart!
    let end = target.selectionEnd!
    console.log("Selecting item")
    if (start != end) {
        selectionRange[0] = start
        selectionRange[1] = end
    }
}

const delegateTextAreas = () => {
    let textareas = document.getElementsByTagName("textarea")
    for (let i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener("keydown", textAreaInputHandler)
        textareas[i].addEventListener("select", textAreaSelectionHandler)
    }
    return textareas
}

// Initialization
if (index != null) {
    console.log("Init")
    let localContents = localStorage.getItem("formContents")
    if (localContents != null) {
        localContents = localContents.replace(/(\\|\")/g, "")
        localContents = localContents.replace(RegExp(`${buttonStyling}`, 'g'), `\"${buttonStyling}\"`)
        localContents = localContents.replace(RegExp(`${sectionStyling}`, 'g'), `\"${sectionStyling}\"`)
        localContents = localContents.replace(RegExp(`${textAreaStyling}`, 'g'), `\"${textAreaStyling}\"`)
        form!.insertAdjacentHTML("beforeend", localContents)

        // Initializing existing interactables
        textarea = delegateTextAreas()
        delegateButtons()
    }
    getTabs()
}

document.getElementById("addGrouping")?.addEventListener("click", addGrouping)
document.getElementById("createGrouping")?.addEventListener("click", createGroupings)

function addGrouping() : void {
    const element = 
        `<div id=d${index}>
            <label for=label${index} name=grouping${index}>Grouping</label>
            <section id=label${index} class="${sectionStyling}">
                <textarea id=key${index} class="${textAreaStyling}"></textarea>
                <textarea id=value${index} class="${textAreaStyling}"></textarea>
            </section>
            <button id=b${index} class="${buttonStyling}">X</button>
        </div>`
    form!.insertAdjacentHTML("beforeend", element)

    let button = document.getElementById(`b${index}`)
    button!.addEventListener("click", (event) => {
        let target = <HTMLButtonElement> event.currentTarget
        let id = target.id.slice(1, target.id.length)
        let div = document.getElementById(`d${id}`)
        div!.innerHTML = ""
        div?.remove()
        localSave()
    })

    let textAreaKey = document.getElementById(`key${index}`)
    textAreaKey?.addEventListener("keydown", textAreaInputHandler)
    textAreaKey?.addEventListener("select", textAreaSelectionHandler)

    let textAreaValue = document.getElementById(`value${index}`)
    textAreaValue?.addEventListener("keydown", textAreaInputHandler)
    textAreaValue?.addEventListener("select", textAreaSelectionHandler)

    // Cleanup
    index += 1
    localSave()
}



// chrome.tabs.group({"groupId" : })

// Get ID of the tabs wanting to group based on the keyword

// Create the grouping.