// 仮想OS内で開かれているアプリを管理する
function openApp(app) {
    if (app === 'browser') {
        document.getElementById('browserWindow').style.display = 'block';
    } else if (app === 'fileExplorer') {
        document.getElementById('fileExplorerWindow').style.display = 'block';
    } else if (app === 'calculator') {
        document.getElementById('calculatorWindow').style.display = 'block';
    }
}

// アプリを閉じる関数
function closeWindow(app) {
    if (app === 'browser') {
        document.getElementById('browserWindow').style.display = 'none';
    } else if (app === 'fileExplorer') {
        document.getElementById('fileExplorerWindow').style.display = 'none';
    } else if (app === 'calculator') {
        document.getElementById('calculatorWindow').style.display = 'none';
    }
}

// ウェブ内でファイルをダウンロードする関数
function downloadFile() {
    const url = "https://www.example.com/sample.txt"; // ダウンロードするファイルのURL
    const link = document.createElement('a');
    link.href = url;
    link.download = "sample.txt";  // ダウンロードするファイル名
    link.click(); // ダウンロード開始
}

// 電卓機能
let calcDisplay = '';
function appendToDisplay(value) {
    calcDisplay += value;
    document.getElementById('calculatorDisplay').value = calcDisplay;
}

function calculate() {
    try {
        calcDisplay = eval(calcDisplay).toString();
        document.getElementById('calculatorDisplay').value = calcDisplay;
    } catch (e) {
        document.getElementById('calculatorDisplay').value = 'エラー';
    }
}

// ファイル管理: アップロードされたファイルを表示する
let uploadedFiles = [];

function uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
        uploadedFiles.push(file);
        updateFileList();
    }
}

// アップロードされたファイルのリストを表示
function updateFileList() {
    const fileListElement = document.getElementById('fileList');
    fileListElement.innerHTML = ''; // 一度リストをクリア
    uploadedFiles.forEach((file, index) => {
        const li = document.createElement('li');
        li.textContent = file.name + ' (' + file.size + ' bytes)';
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'ダウンロード';
        downloadButton.onclick = () => downloadUploadedFile(index);
        li.appendChild(downloadButton);
        fileListElement.appendChild(li);
    });
}

// アップロードされたファイルをダウンロード
function downloadUploadedFile(index) {
    const file = uploadedFiles[index];
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
}
