var _a, _b;
// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
var form = document.getElementsByTagName("form")[0];
var index = form.childElementCount;
// <label for="label_{count}" name="grouping{count}">Grouping {count}</label>
// <section id="label{count}">
//     <textarea></textarea>
//     <textarea></textarea>
// </section>
(_a = document.getElementById("saveData")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", localSave);
function localSave() {
    var textBoxes = document.getElementsByTagName("textarea");
    // console.log("hello world!")
    // console.log(textBoxes)
}
(_b = document.getElementById("addGrouping")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", addGrouping);
function addGrouping() {
    var element = "\n        <label for=\"label_".concat(index, "\" name=\"grouping").concat(index, "\">Grouping ").concat(index, "</label>\n        <section id=\"label").concat(index, "\">\n            <textarea></textarea>\n            <textarea></textarea>\n        </section>\n    ");
    form.insertAdjacentHTML("beforeend", element);
    index += 1;
}
// Note: we can store items from previous session
// if (localStorage.getItem("key") == null) {
//     localStorage.setItem("key", "string")
// } else {
//     console.log("Key is already stored from previous session")
// }
// On button click, get the total amount of elements w
