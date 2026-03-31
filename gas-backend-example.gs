function doGet(e) {
  var callback = e && e.parameter && e.parameter.callback;

  var bank = {
    meta: {
      title: '數位小達人闖關王',
      subtitle: '題目由 Apps Script 後端提供，可直接更新。'
    },
    levels: {
      easy: {
        label: '簡單級',
        grade: '1～2年級',
        description: '題目短、按鈕大，適合低年級一起合作判斷。',
        emoji: '🐣',
        chips: ['低年級', '合作作答'],
        stages: [
          {
            id: 'safety',
            title: '第一關｜網路安全判斷',
            subtitle: '看題目後一起選「對」或「不對」。答對 2 題以上就過關。',
            type: 'truefalse',
            passScore: 2,
            shuffleOptions: true,
            questions: [
              {
                text: '不認識的人在網路上問我家住哪裡，我可以直接告訴他。',
                correct: false,
                explanation: '個人資料不能隨便告訴陌生人。'
              },
              {
                text: '看到不明連結時，先不要亂點，應該問老師或家長。',
                correct: true,
                explanation: '遇到陌生連結要先停下來、先確認。'
              },
              {
                text: '我的帳號密碼可以借給同學一起使用。',
                correct: false,
                explanation: '帳號和密碼要保護好，不能隨便分享。'
              }
            ]
          }
        ]
      }
    }
  };

  var json = JSON.stringify(bank);

  if (callback) {
    var output = callback + '(' + json + ')';
    return ContentService
      .createTextOutput(output)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}
