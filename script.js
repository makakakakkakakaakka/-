document.getElementById("open-browser").addEventListener("click", function() {
    document.getElementById("browser-window").style.display = "block";
});

document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("browser-window").style.display = "none";
});

document.getElementById("minimize-btn").addEventListener("click", function() {
    document.getElementById("browser-window").style.height = "30px";
});

let currentTabIndex = 0;
let tabs = [];
let historyStack = [];
let historyIndex = -1;

function createNewTab(url = "https://www.google.com") {  // デフォルトURLをGoogleに変更
    let tabId = tabs.length;
    tabs.push(url);

    let tab = document.createElement("div");
    tab.className = "tab";
    tab.innerText = "タブ " + (tabId + 1);
    tab.dataset.index = tabId;
    tab.addEventListener("click", function() {
        switchTab(tabId);
    });

    document.getElementById("tabs-container").appendChild(tab);
    switchTab(tabId);
}

function switchTab(index) {
    currentTabIndex = index;
    document.getElementById("browser-frame").src = tabs[index];

    // 履歴管理を更新
    updateHistory(tabs[index]);

    let tabElements = document.querySelectorAll(".tab");
    tabElements.forEach(tab => tab.classList.remove("active"));
    tabElements[index].classList.add("active");
}

function updateHistory(url) {
    // 新しいページに遷移した際、履歴に追加
    if (historyStack[historyIndex] !== url) {
        historyStack = historyStack.slice(0, historyIndex + 1);  // 未来の履歴は消去
        historyStack.push(url);
        historyIndex++;
    }
}

document.getElementById("new-tab-btn").addEventListener("click", function() {
    createNewTab();
});

document.getElementById("url-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        let url = this.value;
        if (!url.startsWith("http")) {
            url = "https://" + url;
        }
        tabs[currentTabIndex] = url;
        document.getElementById("browser-frame").src = url;

        // 履歴更新
        updateHistory(url);
    }
});

// 履歴管理（戻る・進む）
document.getElementById("back-btn").addEventListener("click", function() {
    if (historyIndex > 0) {
        historyIndex--;
        document.getElementById("browser-frame").src = historyStack[historyIndex];
    }
});

document.getElementById("forward-btn").addEventListener("click", function() {
    if (historyIndex < historyStack.length - 1) {
        historyIndex++;
        document.getElementById("browser-frame").src = historyStack[historyIndex];
    }
});

// 仮想ダウンロード機能
function downloadFile(fileName) {
    let listItem = document.createElement("li");
    listItem.innerText = fileName + " (仮想ファイル)";
    document.getElementById("download-list").appendChild(listItem);
}
