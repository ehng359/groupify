var _a;
// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
var main = document.getElementsByTagName("body")[0];
main.addEventListener("click", function () {
    selectionRange = [-1, -1];
});
var form = document.getElementById("main");
var local_index = localStorage.getItem("total");
var index = local_index == null ? form.childElementCount : Number(local_index) - 1;
var selectionRange = [-1, -1];
if (index != null) {
    console.log("Init");
    var localContents = localStorage.getItem("formContents");
    if (localContents != null) {
        localContents = localContents.replace(/(\\|\")/g, "");
        form.insertAdjacentHTML("beforeend", localContents);
    }
}
var delegateTextAreas = function () {
    var textareas = document.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener("keydown", function (event) {
            var target = event.currentTarget;
            var inputTarget = event.currentTarget;
            var cursorPosition = inputTarget.selectionStart;
            console.log("Initial Cursor position", cursorPosition);
            switch (event.key) {
                case "Shift":
                case "Control":
                case "Enter":
                case "Alt":
                case "Meta":
                    event.preventDefault();
                    break;
                case "Tab":
                    break;
                case "Backspace":
                    console.log("Delete");
                    event.preventDefault();
                    if (selectionRange[0] != -1) {
                        console.log("Multi-delete");
                        var str = target.innerHTML;
                        target.innerHTML = str.slice(0, selectionRange[0]) + str.slice(selectionRange[1], str.length);
                        selectionRange = [-1, -1];
                    }
                    else {
                        console.log("Single-delete");
                        target.innerHTML = target.innerHTML.slice(0, -1);
                        cursorPosition = cursorPosition == 0 ? 0 : cursorPosition - 1;
                    }
                    break;
                default:
                    event.preventDefault();
                    // selectionDefault != null
                    console.log("Insert");
                    if (selectionRange[0] != -1) {
                        console.log("multi-select replace char");
                        var str = target.innerHTML;
                        target.innerHTML = str.slice(0, selectionRange[0]) + event.key + str.slice(selectionRange[1], str.length);
                        selectionRange = [-1, -1];
                    }
                    else {
                        console.log("Single char");
                        target.innerHTML = target.innerHTML + event.key;
                        cursorPosition += 1;
                    }
            }
            console.log("End cursor position", cursorPosition);
            inputTarget.setSelectionRange(cursorPosition, cursorPosition);
            localSave();
        });
        textareas[i].addEventListener("select", function (event) {
            var target = event.currentTarget;
            var start = target.selectionStart;
            var end = target.selectionEnd;
            console.log("Selecting item");
            if (start != end) {
                selectionRange[0] = start;
                selectionRange[1] = end;
            }
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
