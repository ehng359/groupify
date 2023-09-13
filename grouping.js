var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b;
var _this = this;
// Script
var main = document.getElementsByTagName("body")[0];
main.addEventListener("click", function () {
    selectionRange = [-1, -1];
});
var form = document.getElementById("main");
var textarea;
var tabs;
var local_index = localStorage.getItem("total");
var index = local_index == null ? form.childElementCount : Number(local_index) - 1;
var selectionRange = [-1, -1];
var textAreaStyling = "resize-none";
var buttonStyling = "bg-gray-600 w-10 text-center";
var sectionStyling = "flex-row";
function localSave() {
    localStorage.setItem("total", String(index ? index + 1 : 0));
    var formContents = form.innerHTML;
    formContents = formContents.replace(/(\r\n|\n|\r|\\|\")/gm, "");
    formContents = formContents.trim();
    localStorage.setItem("formContents", JSON.stringify(formContents));
}
var getTabs = function () { return __awaiter(_this, void 0, void 0, function () {
    var queryResults;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, chrome.tabs.query({
                    "currentWindow": true,
                    "groupId": -1,
                })];
            case 1:
                queryResults = _a.sent();
                tabs = queryResults;
                return [2 /*return*/];
        }
    });
}); };
var createGroupings = function () { return __awaiter(_this, void 0, void 0, function () {
    var groupUpdate, i, groupName, keys, search, matches;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                groupUpdate = function (matches, groupName, color) {
                    if (color === void 0) { color = "red"; }
                    return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, chrome.tabs.group({ tabIds: matches }, function (groupId) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, chrome.tabGroups.update(groupId, {
                                                        "title": groupName,
                                                        "color": color,
                                                        "collapsed": false
                                                    })];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); })];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    });
                };
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < textarea.length)) return [3 /*break*/, 5];
                return [4 /*yield*/, getTabs()];
            case 2:
                _a.sent();
                groupName = textarea[i].innerHTML;
                keys = textarea[i + 1].innerHTML;
                if (keys == "") {
                    return [3 /*break*/, 4];
                }
                search = keys.split(',');
                matches = [];
                tabs.map(function (tab, index) {
                    var title = tab.title;
                    var url = tab.url;
                    var hasMatchingKey = search.map(function (key) {
                        var re = new RegExp(key);
                        if (re.exec(title) || re.exec(url))
                            return true;
                        return false;
                    })
                        .reduce(function (acc, x) { return acc || x; });
                    if (hasMatchingKey && tab.groupId == -1) {
                        matches.push(tab.id);
                    }
                });
                if (!matches.length) return [3 /*break*/, 4];
                return [4 /*yield*/, groupUpdate(matches, groupName, "blue")];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i += 2;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}); };
var delegateButtons = function () {
    var buttons = document.getElementsByTagName("button");
    for (var i = 0; i < buttons.length; i += 1) {
        if (buttons[i].id == "addGrouping" || buttons[i].id == "createGrouping") {
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
// Initialization
if (index != null) {
    console.log("Init");
    var localContents = localStorage.getItem("formContents");
    if (localContents != null) {
        localContents = localContents.replace(/(\\|\")/g, "");
        localContents = localContents.replace(RegExp("".concat(buttonStyling), 'g'), "\"".concat(buttonStyling, "\""));
        localContents = localContents.replace(RegExp("".concat(sectionStyling), 'g'), "\"".concat(sectionStyling, "\""));
        localContents = localContents.replace(RegExp("".concat(textAreaStyling), 'g'), "\"".concat(textAreaStyling, "\""));
        form.insertAdjacentHTML("beforeend", localContents);
        // Initializing existing interactables
        textarea = delegateTextAreas();
        delegateButtons();
    }
    getTabs();
}
(_a = document.getElementById("addGrouping")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addGrouping);
(_b = document.getElementById("createGrouping")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", createGroupings);
function addGrouping() {
    var element = "<div id=d".concat(index, ">\n            <label for=label").concat(index, " name=grouping").concat(index, ">Grouping</label>\n            <section id=label").concat(index, " class=\"").concat(sectionStyling, "\">\n                <textarea id=key").concat(index, " class=\"").concat(textAreaStyling, "\"></textarea>\n                <textarea id=value").concat(index, " class=\"").concat(textAreaStyling, "\"></textarea>\n            </section>\n            <button id=b").concat(index, " class=\"").concat(buttonStyling, "\">X</button>\n        </div>");
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
// chrome.tabs.group({"groupId" : })
// Get ID of the tabs wanting to group based on the keyword
// Create the grouping.
