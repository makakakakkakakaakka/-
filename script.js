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

function createNewTab(url = "https://example.com") {
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
    
    let tabElements = document.querySelectorAll(".tab");
    tabElements.forEach(tab => tab.classList.remove("active"));
    tabElements[index].classList.add("active");
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
    }
});

// 履歴管理
let historyStack = [];
let historyIndex = -1;

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
