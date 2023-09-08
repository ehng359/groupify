// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
let form = document.getElementById("main")

let local_index = localStorage.getItem("total")
let index = local_index == null ? form!.childElementCount : Number(local_index) - 1

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
            console.log(event.key)
            let target = <HTMLElement> event.currentTarget
            switch (event.key) {
                case "Control":
                case "Enter":
                case "Alt":
                case "Meta":
                    event.preventDefault()
                    break;
                case "Tab":
                    break;
                case "Backspace":
                    let selectionBkSpc = window.getSelection()
                    if (selectionBkSpc != null) {
                        console.log("Selection backspace")
                        console.log(selectionBkSpc.deleteFromDocument())
                    } else {
                        console.log("Simple deletion")
                        target.innerHTML = target.innerHTML.slice(0, -1)
                    }
                    console.log(target)
                    break;
                default:
                    event.preventDefault()
                    let selectionDefault = document.getSelection()
                    // selectionDefault != null
                    if (false) {
                        console.log(selectionDefault?.anchorOffset)
                    } else {
                        target.innerHTML = target.innerHTML + event.key
                        console.log(target)
                    }
            }
            localSave()
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
    const element = `
        <label for=label${index} name=grouping${index}>Grouping ${index}</label>
        <section id=label${index}>
            <textarea id=key${index}></textarea>
            <textarea id=value${index}></textarea>
        </section>
    `
    form!.insertAdjacentHTML("beforeend", element)
    console.log(element)
    index += 1
    textarea = delegateTextAreas()
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