// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
let main = document.getElementsByTagName("body")[0]
main.addEventListener("click", () => {
    selectionRange = [-1, -1]
})

let form = document.getElementById("main")

let local_index = localStorage.getItem("total")
let index = local_index == null ? form!.childElementCount : Number(local_index) - 1
let selectionRange = [-1, -1]

if (index != null) {
    console.log("Init")
    let localContents = localStorage.getItem("formContents")
    if (localContents != null) {
        localContents = localContents.replace(/(\\|\")/g, "")
        form!.insertAdjacentHTML("beforeend", localContents)
    }
}

const delegateTextAreas = () => {
    let textareas = document.getElementsByTagName("textarea")
    for (let i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener("keydown", (event) => {
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
        })
        textareas[i].addEventListener("select", (event) => {
            var target = <HTMLInputElement> event.currentTarget
            let start = target.selectionStart!
            let end = target.selectionEnd!
            console.log("Selecting item")
            if (start != end) {
                selectionRange[0] = start
                selectionRange[1] = end
            }
        })
    }
    return textareas
}

let textarea = delegateTextAreas()

function localSave() : void {
    localStorage.setItem("total", String(index ? index + 1 : 0))
    let formContents = form!.innerHTML
    formContents = formContents.replace(/(\r\n|\n|\r)/gm, "")
    formContents = formContents.trim()
    localStorage.setItem("formContents", JSON.stringify(formContents))
}

document.getElementById("addGrouping")?.addEventListener("click", addGrouping)

function addGrouping() : void {
    const element = 
        `<div id=d${index}>
            <label for=label${index} name=grouping${index}>Grouping ${index}</label>
            <section id=label${index}>
                <textarea id=key${index}></textarea>
                <textarea id=value${index}></textarea>
            </section>
            <button id=b${index}>X</button>
        </div>`
    form!.insertAdjacentHTML("beforeend", element)
    let button = document.getElementById(`b${index}`)!
    console.log(button)
    button.addEventListener("click", (event) => {
        let target = <HTMLButtonElement> event.currentTarget
        let id = target.id.slice(1, target.id.length)
        let div = document.getElementById(`d${id}`)
        div!.innerHTML = ""
        div?.remove()
    })
    textarea = delegateTextAreas()

    // Cleanup
    index += 1
    localSave()
}



// Note: we can store items from previous session
// if (localStorage.getItem("key") == null) {
//     localStorage.setItem("key", "string")
// } else {
//     console.log("Key is already stored from previous session")
// }
// On button click, get the total amount of elements w

// export {};