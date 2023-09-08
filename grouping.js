var _a;
// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
var form = document.getElementsByTagName("form")[0];
var local_index = localStorage.getItem("total");
var index = local_index == null ? form.childElementCount : Number(local_index) - 1;
if (index != null) {
    console.log("Init");
    var localContents = localStorage.getItem("formContents");
    if (localContents != null) {
        localContents = localContents.slice(1, localContents.length - 2);
        form.insertAdjacentHTML("beforeend", localContents);
    }
}
function localSave() {
    localStorage.setItem("total", String(index ? index + 1 : 0));
    var formContents = form.innerHTML;
    formContents = formContents.replace(/(\r\n|\n|\r)/gm, "");
    formContents = formContents.trim();
    localStorage.setItem("formContents", JSON.stringify(formContents));
}
(_a = document.getElementById("addGrouping")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addGrouping);
function addGrouping() {
    var element = "\n        <label for=\"label_".concat(index, "\" name=\"grouping").concat(index, "\">Grouping ").concat(index, "</label>\n        <section id=\"label").concat(index, "\">\n            <textarea></textarea>\n            <textarea></textarea>\n        </section>\n    ");
    form.insertAdjacentHTML("beforeend", element);
    index += 1;
    localSave();
}
// Note: we can store items from previous session
// if (localStorage.getItem("key") == null) {
//     localStorage.setItem("key", "string")
// } else {
//     console.log("Key is already stored from previous session")
// }
// On button click, get the total amount of elements w
// export {};
