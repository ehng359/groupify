var _a;
// Load currently available items that have been saved through localStorage.
// for (var i=0; i < ...; i++) loop through all of the sections
var main = document.getElementsByTagName("body")[0];
main.addEventListener("click", function () {
    selectionRange = [-1, -1];
});
var form = document.getElementById("main");
var textarea;
var local_index = localStorage.getItem("total");
var index = local_index == null ? form.childElementCount : Number(local_index) - 1;
var selectionRange = [-1, -1];
var delegateButtons = function () {
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i += 1) {
        if (buttons[i].id == "addGrouping") {
            continue;
        }
        buttons[i].addEventListener("click", function (event) {
            var target = event.currentTarget;
            var id = target.id.slice(1, target.id.length);
            console.log("id", id);
            var div = document.getElementById("d".concat(id));
            div.innerHTML = "";
            div === null || div === void 0 ? void 0 : div.remove();
            localSave();
        });
    }
};
function textAreaInputHandler(event) {
    var target = event.currentTarget;
    var inputTarget = event.currentTarget;
    var cursorPosition = inputTarget.selectionStart;
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
            event.preventDefault();
            if (selectionRange[0] != -1) {
                var str = target.innerHTML;
                target.innerHTML = str.slice(0, selectionRange[0]) + str.slice(selectionRange[1], str.length);
                selectionRange = [-1, -1];
            }
            else {
                target.innerHTML = target.innerHTML.slice(0, -1);
                cursorPosition = cursorPosition == 0 ? 0 : cursorPosition - 1;
            }
            break;
        default:
            event.preventDefault();
            if (selectionRange[0] != -1) {
                var str = target.innerHTML;
                target.innerHTML = str.slice(0, selectionRange[0]) + event.key + str.slice(selectionRange[1], str.length);
                selectionRange = [-1, -1];
            }
            else {
                target.innerHTML = target.innerHTML + event.key;
                cursorPosition += 1;
            }
    }
    console.log("End cursor position", cursorPosition);
    inputTarget.setSelectionRange(cursorPosition, cursorPosition);
    localSave();
}
function textAreaSelectionHandler(event) {
    var target = event.currentTarget;
    var start = target.selectionStart;
    var end = target.selectionEnd;
    console.log("Selecting item");
    if (start != end) {
        selectionRange[0] = start;
        selectionRange[1] = end;
    }
}
var delegateTextAreas = function () {
    var textareas = document.getElementsByTagName("textarea");
    for (var i = 0; i < textareas.length; i++) {
        textareas[i].addEventListener("keydown", textAreaInputHandler);
        textareas[i].addEventListener("select", textAreaSelectionHandler);
    }
    return textareas;
};
if (index != null) {
    console.log("Init");
    var localContents = localStorage.getItem("formContents");
    if (localContents != null) {
        localContents = localContents.replace(/(\\|\")/g, "");
        form.insertAdjacentHTML("beforeend", localContents);
        // Initializing existing interactables
        textarea = delegateTextAreas();
        delegateButtons();
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
    var element = "<div id=d".concat(index, ">\n            <label for=label").concat(index, " name=grouping").concat(index, ">Grouping ").concat(index, "</label>\n            <section id=label").concat(index, ">\n                <textarea id=key").concat(index, "></textarea>\n                <textarea id=value").concat(index, "></textarea>\n            </section>\n            <button id=b").concat(index, ">X</button>\n        </div>");
    form.insertAdjacentHTML("beforeend", element);
    var button = document.getElementById("b".concat(index));
    button.addEventListener("click", function (event) {
        var target = event.currentTarget;
        var id = target.id.slice(1, target.id.length);
        var div = document.getElementById("d".concat(id));
        div.innerHTML = "";
        div === null || div === void 0 ? void 0 : div.remove();
        localSave();
    });
    var textAreaKey = document.getElementById("key".concat(index));
    textAreaKey === null || textAreaKey === void 0 ? void 0 : textAreaKey.addEventListener("keydown", textAreaInputHandler);
    textAreaKey === null || textAreaKey === void 0 ? void 0 : textAreaKey.addEventListener("select", textAreaSelectionHandler);
    var textAreaValue = document.getElementById("value".concat(index));
    textAreaValue === null || textAreaValue === void 0 ? void 0 : textAreaValue.addEventListener("keydown", textAreaInputHandler);
    textAreaValue === null || textAreaValue === void 0 ? void 0 : textAreaValue.addEventListener("select", textAreaSelectionHandler);
    // Cleanup
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
