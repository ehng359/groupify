var _a;
// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
var form = document.getElementById("main");
var local_index = localStorage.getItem("total");
var index = local_index == null ? form.childElementCount : Number(local_index) - 1;
if (index != null) {
    console.log("Init");
    var localContents = localStorage.getItem("formContents");
    if (localContents != null) {
        localContents = localContents.replace(/(\\|\")/g, "");
        console.log(localContents);
        form.insertAdjacentHTML("beforeend", localContents);
    }
}
var delegateTextAreas = function () {
    var textareas = document.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener("keydown", function (event) {
            console.log(event.key);
            var target = event.currentTarget;
            switch (event.key) {
                case "Control":
                case "Enter":
                case "Alt":
                case "Meta":
                    event.preventDefault();
                    break;
                case "Tab":
                    break;
                case "Backspace":
                    var selectionBkSpc = window.getSelection();
                    if (selectionBkSpc != null) {
                        console.log("Selection backspace");
                        console.log(selectionBkSpc.deleteFromDocument());
                    }
                    else {
                        console.log("Simple deletion");
                        target.innerHTML = target.innerHTML.slice(0, -1);
                    }
                    console.log(target);
                    break;
                default:
                    event.preventDefault();
                    var selectionDefault = document.getSelection();
                    // selectionDefault != null
                    if (false) {
                        console.log(selectionDefault === null || selectionDefault === void 0 ? void 0 : selectionDefault.anchorOffset);
                    }
                    else {
                        target.innerHTML = target.innerHTML + event.key;
                        console.log(target);
                    }
            }
            localSave();
        });
    }
    return textareas;
};
var textarea = delegateTextAreas();
function localSave() {
    localStorage.setItem("total", String(index ? index + 1 : 0));
    var formContents = form.innerHTML;
    formContents = formContents.replace(/(\r\n|\n|\r)/gm, "");
    formContents = formContents.trim();
    localStorage.setItem("formContents", JSON.stringify(formContents));
}
(_a = document.getElementById("addGrouping")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addGrouping);
function addGrouping() {
    var element = "\n        <label for=label".concat(index, " name=grouping").concat(index, ">Grouping ").concat(index, "</label>\n        <section id=label").concat(index, ">\n            <textarea id=key").concat(index, "></textarea>\n            <textarea id=value").concat(index, "></textarea>\n        </section>\n    ");
    form.insertAdjacentHTML("beforeend", element);
    console.log(element);
    index += 1;
    textarea = delegateTextAreas();
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
