# 數位小達人闖關王 v2

這是一個可直接放到 **GitHub Pages** 的互動式闖關網頁，適合國小學生用平板進行 5 分鐘小組合作闖關。

這一版已加上三個重點：
1. **介面更活潑，適合國小學童**
2. **題目可由外部後端提供與更新**
3. **答案選項可亂數排列，降低左右互看抄答案的情況**

---

## 檔案說明

- `index.html`：主程式
- `config.js`：題庫來源設定
- `questions.json`：本機預設題庫
- `.nojekyll`：GitHub Pages 靜態部署用
- `gas-backend-example.gs`：Google Apps Script 題庫後端範例

---

## 最簡單的部署方式

1. 建立一個新的 GitHub repository
2. 把整個資料夾內容上傳到 repository 根目錄
3. 到 **Settings → Pages**
4. 在 **Build and deployment** 選 **Deploy from a branch**
5. Branch 選 `main`，資料夾選 `/ (root)`
6. 儲存後等待發布完成

---

## 題庫更新方式

### 方式 A：直接改 `questions.json`

這是最簡單的方式，適合先試跑。

- 前端會自動讀取同資料夾內的 `questions.json`
- 老師只要修改這個檔案，就能新增或調整題目
- 每次重新整理頁面就會讀到最新題庫

---

### 方式 B：改成外部 JSON 題庫

如果你希望題目由後端維護，前端仍放在 GitHub Pages，可在 `config.js` 設定：

```js
window.APP_CONFIG = {
  quizDataUrl: 'https://你的網域/quiz-bank.json',
  quizDataType: 'json'
};
```

前提：你的後端要能讓 GitHub Pages 前端成功讀取 JSON。

---

### 方式 C：改成 Apps Script JSONP 題庫

如果你想搭配 **Google Apps Script**，建議使用 JSONP，比較適合 GitHub Pages 前端跨網域讀取。

在 `config.js` 設定：

```js
window.APP_CONFIG = {
  quizDataUrl: 'https://script.google.com/macros/s/你的部署ID/exec',
  quizDataType: 'jsonp'
};
```

然後把 `gas-backend-example.gs` 部署成 Web App。

---

## 題庫資料格式

最外層格式如下：

```json
{
  "meta": {
    "title": "數位小達人闖關王",
    "subtitle": "副標題"
  },
  "levels": {
    "easy": {
      "label": "簡單級",
      "grade": "1～2年級",
      "description": "說明",
      "emoji": "🐣",
      "chips": ["低年級", "合作作答"],
      "stages": []
    }
  }
}
```

---

## 已支援題型

### 1. `truefalse`
對／不對題

### 2. `verify`
要先查證／較可信

### 3. `singlechoice`
單選題

### 4. `checkboxThreshold`
多選題，設定至少選對幾個、最多可選錯幾個

### 5. `credibility`
兩則訊息比較可信度，再勾選理由

### 6. `search`
搜尋題，透過 `validation` 驗證輸入答案

---

## 選項亂數排列設定

如果題目沒有固定順序需求，可設定：

```json
"shuffleOptions": true
```

或：

```json
"shuffleChoices": true
```

或：

```json
"shuffleReasons": true
```

如果你不想亂數，改成 `false` 即可。

---

## `search` 題型驗證格式

範例：

```json
"validation": {
  "minGroups": 2,
  "groups": [
    ["趴下"],
    ["掩護"],
    ["穩住"]
  ]
}
```

意思是：學生輸入的答案中，只要命中以上 3 組關鍵字中的任 2 組，就算過關。

同義詞可以放在同一組：

```json
"groups": [
  ["不要用生日", "不用生日", "別用生日"],
  ["8碼", "至少8", "越長越好"]
]
```

---

## 建議使用流程

### 先快速上線
- 先用 GitHub Pages + `questions.json`
- 確定學生實際操作沒問題

### 再升級成後端題庫
- 用 Apps Script 或其他後端輸出 JSON / JSONP
- 在 `config.js` 換成外部題庫網址
- 之後只改後端題目即可，不用反覆改前端頁面

---

## 注意事項

- 本機闖關紀錄會存在 `localStorage`
- 不會自動上傳到 Google Sheets
- 若後續要做「老師統計頁、排行榜、自動寫入 Google Sheets」，可再加後端紀錄功能
