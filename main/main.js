// LMSのサイトに適用するJavaScriptを書く

// main関数
function main() {
    // URLに"kulms.tl.kansai-u.ac.jp/webclass/course.php"を含むか否か
    if (document.URL.includes("kulms.tl.kansai-u.ac.jp/webclass/course.php")) {
        saveTaskDeadline();
    }
}

// 課題の期限と課題名を保存する関数
function saveTaskDeadline() {
    const courseTitle = document.title.split(" (20")[0];;
    const taskElems = document.querySelectorAll(".cl-contentsList_listGroupItem"); // 課題のHTML要素を全て取得

    const currentTaskDatabase = {};

    taskElems.forEach(taskElem => {
        const taskTitleElem = taskElem.querySelector(".cm-contentsList_contentName")?.textContent?.replace("New", "") || undefined; // 課題タイトルを取得
        const taskDateElem = taskElem.querySelector(".cm-contentsList_contentDetailListItemData")?.textContent || undefined; // 課題期限を取得

        if (taskDateElem) {
            const taskUniqueId = `${taskTitleElem}@${courseTitle}`;
            const taskDeadline = taskDateElem?.split(" - ")[1]?.trim() || undefined;

            currentTaskDatabase[taskUniqueId] = {
                taskUniqueId: taskUniqueId,
                courseTitle: courseTitle,
                taskTitle: taskTitleElem,
                taskDeadline: taskDeadline
            };
        }
    });

    // chrome.storageから既存のデータを取得
    chrome.storage.local.get("taskDatabase", function (data) {
        const existingDatabase = JSON.parse(data.taskDatabase || "{}");
        const mergedDatabase = { ...existingDatabase, ...currentTaskDatabase };

        // マージされたデータをchrome.storage.localに保存
        chrome.storage.local.set({ taskDatabase: JSON.stringify(mergedDatabase) }, function () {
            console.log("データ保存完了");
            console.log(mergedDatabase);
        });
    });
}

// Hello World!とメッセージを出す関数
function hello() {
    alert('Hello World!');
}


// main関数を実行
main();
