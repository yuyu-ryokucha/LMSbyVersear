// background.js

// 通知機能に必要 無くても他は問題なく動く

function count24hourTasks() {
    return new Promise((resolve) => {
        chrome.storage.local.get("taskDatabase", function (data) {
            const taskDatabase = JSON.parse(data.taskDatabase || "{}"); // taskDatabaseをオブジェクト型に変換
            const now = new Date(); // 現在時刻

            // 24時間以内のタスクを格納する配列
            const tasksWithin24Hours = [];
            // taskDatabaseを走査して24時間以内のタスクを探す
            Object.values(taskDatabase).forEach(task => {
                const taskDeadline = new Date(task.taskDeadline); // taskDeadlineをDateオブジェクトに変換
                if (taskDeadline - now <= 240 * 60 * 60 * 1000 && taskDeadline - now >= 0) {
                    tasksWithin24Hours.push(task);
                }
            });

            // 配列の長さ（24時間以内のタスク数）をresolveで返す
            resolve(tasksWithin24Hours);
        });
    });
}

// ブラウザのタブが検出されたときに呼び出される
chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (tab.url.includes("kulms.tl.kansai-u.ac.jp")) {
        // count24hourTasks関数を呼び出してタスク数を取得
        const box = await count24hourTasks();
        const newbox = box.map(task => task.taskUniqueId);

        chrome.action.setBadgeBackgroundColor({ color: "#ac0e0e" });
        chrome.action.setBadgeText({ text: String(box.length) });
        chrome.action.setTitle({ title: `24時間以内のタスク: ${JSON.stringify(newbox)}` });

        console.log("↓24時間以内の課題");
        console.log(box);
    }
});
