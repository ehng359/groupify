// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
let form = document.getElementsByTagName("form")[0]
let index = form.childElementCount
// <label for="label_{count}" name="grouping{count}">Grouping {count}</label>
// <section id="label{count}">
//     <textarea></textarea>
//     <textarea></textarea>
// </section>

document.getElementById("saveData")?.addEventListener("click", localSave)
function localSave() : void {
    let textBoxes = document.getElementsByTagName("textarea")
    // console.log("hello world!")
    // console.log(textBoxes)
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
}

// Note: we can store items from previous session
// if (localStorage.getItem("key") == null) {
//     localStorage.setItem("key", "string")
// } else {
//     console.log("Key is already stored from previous session")
// }
// On button click, get the total amount of elements w

export {};