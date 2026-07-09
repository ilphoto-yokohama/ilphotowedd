/**
 * il PhotoWedd — 予約フォーム連携スクリプト（Google Apps Script）
 *
 * フロー：
 *   フォーム送信 → doPost() → スプレッドシート追記 → スタッフへGmail通知
 *   → お客様へ自動返信 → JSON応答（予約番号を含む）
 *
 * セットアップ手順は docs/GAS_SETUP.md を参照。
 */

// ===== 設定 =====
const CONFIG = {
  SHEET_NAME: '予約管理',
  STAFF_EMAIL: 'enchanteyokohama@gmail.com',
  STORE_NAME: 'il PhotoWedd（イルフォトウェディング）',
  STORE_TEL: '045-330-0866',
  STORE_LINE_URL: 'https://lin.ee/gZPUh9s',
  STORE_INSTAGRAM: 'https://www.instagram.com/ilphotowedd',
  STORE_URL: 'https://ilphotowedding.photo-official.net/',
};

const SHEET_HEADERS = [
  '受付日時', '予約番号', '氏名', 'フリガナ', 'メール', '電話',
  'プラン', '相談方法', '希望日時', '備考', '対応状況',
];

/**
 * フォームからのPOSTを受け取り、シート保存・通知・自動返信を行う。
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    validateReservation(data);

    const sheet = getOrCreateSheet();
    const reservationNumber = buildReservationNumber(sheet);
    const receivedAt = new Date();

    sheet.appendRow([
      receivedAt,
      reservationNumber,
      data.name,
      data.kana,
      data.email,
      data.tel,
      data.plan,
      data.contact,
      data.date,
      data.message || '',
      '未対応',
    ]);

    notifyStaff(reservationNumber, data, sheet.getParent().getUrl());
    replyToCustomer(reservationNumber, data);

    return jsonResponse({ status: 'success', reservationNumber: reservationNumber });
  } catch (err) {
    return jsonResponse({ status: 'error', message: err.message });
  }
}

/**
 * 動作確認用（ブラウザでURLを開いた際にOKを返す）。
 */
function doGet() {
  return jsonResponse({ status: 'ok', message: 'il PhotoWedd reservation endpoint is running.' });
}

/** 必須項目の存在チェック（サーバー側の最終防衛線） */
function validateReservation(data) {
  const required = ['name', 'kana', 'email', 'tel', 'plan', 'date', 'contact'];
  required.forEach((key) => {
    if (!data[key] || String(data[key]).trim() === '') {
      throw new Error(`必須項目が未入力です: ${key}`);
    }
  });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error('メールアドレスの形式が正しくありません。');
  }
}

/** 予約管理シートを取得（無ければヘッダー付きで新規作成） */
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.appendRow(SHEET_HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** 予約番号を発行する（例：IL20260704-004） */
function buildReservationNumber(sheet) {
  const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyyMMdd');
  const sequence = Math.max(sheet.getLastRow(), 1); // ヘッダー行を含む連番
  return `IL${today}-${String(sequence).padStart(3, '0')}`;
}

/** スタッフへの新規予約通知メール */
function notifyStaff(reservationNumber, data, sheetUrl) {
  const subject = `【イルフォトウェディング】新規予約（${reservationNumber}）`;
  const body = [
    '新しい予約フォームの送信がありました。',
    '',
    `予約番号：${reservationNumber}`,
    `お名前　：${data.name}（${data.kana}）`,
    `メール　：${data.email}`,
    `電話番号：${data.tel}`,
    `希望プラン：${data.plan}`,
    `相談方法：${data.contact}`,
    `希望日　：${data.date}`,
    `ご質問・ご要望：${data.message || 'なし'}`,
    '',
    `管理シートURL：${sheetUrl}`,
  ].join('\n');

  GmailApp.sendEmail(CONFIG.STAFF_EMAIL, subject, body);
}

/** お客様への自動返信メール */
function replyToCustomer(reservationNumber, data) {
  const subject = `【${CONFIG.STORE_NAME}】ご予約を受け付けました（予約番号：${reservationNumber}）`;
  const body = [
    `${data.name} 様`,
    '',
    `${CONFIG.STORE_NAME}にご予約いただき、誠にありがとうございます。`,
    '以下の内容で受け付けいたしました。',
    '',
    '--- 受付内容 ---',
    `予約番号：${reservationNumber}`,
    `希望プラン：${data.plan}`,
    `相談方法：${data.contact}`,
    `希望日　：${data.date}`,
    '',
    '担当スタッフより1〜2営業日以内にご連絡いたします。',
    'お急ぎの場合は、下記LINEよりお気軽にご連絡ください。',
    '',
    '--- 店舗情報 ---',
    `${CONFIG.STORE_NAME}`,
    `電話：${CONFIG.STORE_TEL}`,
    `LINE：${CONFIG.STORE_LINE_URL}`,
    `Instagram：${CONFIG.STORE_INSTAGRAM}`,
    `公式サイト：${CONFIG.STORE_URL}`,
    '',
    '※ このメールは送信専用です。ご返信いただいても対応できませんので、',
    '　ご連絡はLINEまたはお電話をご利用ください。',
  ].join('\n');

  GmailApp.sendEmail(data.email, subject, body);
}

/** JSON形式でレスポンスを返す */
function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
