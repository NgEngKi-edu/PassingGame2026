window.APP_CONFIG = {
  // 若前端只想使用同資料夾內的 questions.json，請保持空字串。
  quizDataUrl: '',

  // 可用值：''、'json'、'jsonp'
  // 1. 空字串：使用本機 questions.json
  // 2. json：向外部題庫網址 fetch JSON
  // 3. jsonp：向外部題庫網址載入 JSONP（適合 GitHub Pages + Apps Script）
  quizDataType: ''
};
