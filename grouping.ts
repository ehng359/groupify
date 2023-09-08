// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
let form = document.getElementsByTagName("form")[0]

let local_index = localStorage.getItem("total")
let index = local_index == null ? form.childElementCount : Number(local_index) - 1

if (index != null) {
    console.log("Init")
    let localContents = localStorage.getItem("formContents")
    if (localContents != null) {
        localContents = localContents.slice(1, localContents.length - 2)
        form.insertAdjacentHTML("beforeend", localContents)
    }
}

function localSave() : void {
    localStorage.setItem("total", String(index ? index + 1 : 0))
    let formContents = form.innerHTML
    formContents = formContents.replace(/(\r\n|\n|\r)/gm, "")
    formContents = formContents.trim()
    localStorage.setItem("formContents", JSON.stringify(formContents))
}

document.getElementById("addGrouping")?.addEventListener("click", addGrouping)

function addGrouping() : void {
    const element = `
        <label for="label_${index}" name="grouping${index}">Grouping ${index}</label>
        <section id="label${index}">
            <textarea></textarea>
            <textarea></textarea>
        </section>
    `
    form.insertAdjacentHTML("beforeend", element)
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