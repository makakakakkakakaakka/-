document.addEventListener("DOMContentLoaded", function () {
    // 🕰️ 時計の更新
    function updateClock() {
        document.getElementById("clock").innerText = new Date().toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // 📜 スタートメニューの開閉
    document.getElementById("start-button").addEventListener("click", function () {
        let menu = document.getElementById("start-menu");
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });
});

// 🖥️ アプリを開く関数
function openApp(appName) {
    let appContainer = document.getElementById("app-container");

    let windowDiv = document.createElement("div");
    windowDiv.className = "window";
    windowDiv.innerHTML = `
        <div class="window-header">
            <span>${appName}</span>
            <button onclick="this.parentElement.parentElement.remove()">❌</button>
        </div>
        <div class="window-content">
            ${appName === "notepad" ? '<textarea style="width:100%; height:100%;"></textarea>' : ""}
            ${appName === "fileExplorer" ? '<input type="file"><button onclick="downloadFile()">ダウンロード</button>' : ""}
            ${appName === "calculator" ? '<input type="text" id="calc-input"><button onclick="calculate()">=</button>' : ""}
        </div>
    `;

    appContainer.appendChild(windowDiv);
}

// 📂 仮想ダウンロード
function downloadFile() {
    let link = document.createElement("a");
    link.href = "data:text/plain;charset=utf-8,仮想ファイル";
    link.download = "file.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 🔢 電卓機能
function calculate() {
    let input = document.getElementById("calc-input");
    try {
        input.value = eval(input.value);
    } catch {
        input.value = "エラー";
    }
}
