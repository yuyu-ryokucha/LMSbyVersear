chrome.storage.local.get("taskDatabase", function (data) {
    // この辺りでは保存しているデータを取得している
    const taskDatabase = JSON.parse(data.taskDatabase || "{}"); // taskDatabaseを文字列型からオブジェクト型に変換
    const now = new Date(); // 現在時刻

    // 24時間以内のタスクを格納する配列
    const tasksWithin24Hours = [];

    // taskDatabaseを走査して24時間以内のタスクを探す
    Object.values(taskDatabase).forEach(task => {
        const taskDeadline = new Date(task.taskDeadline); // taskDeadlineをDateオブジェクトに変換
        if (taskDeadline - now <= 240 * 60 * 60 * 1000 && taskDeadline - now >= 0) {
            tasksWithin24Hours.push(task);
        }
    })
    // ここへ来た時点でデータはtasksWithin24Hoursに格納されている

    const tbody = document.querySelector(".table tbody");

    tasksWithin24Hours.forEach(task => {
        const cell1 = document.createElement("td");
        cell1.textContent = task.courseTitle;

        const cell2 = document.createElement("td");
        cell2.textContent = "未完了";

        const cell3 = document.createElement("td");
        cell3.textContent = task.taskTitle;

        const cell4 = document.createElement("td");
        cell4.textContent = task.taskDeadline;

        // 新しい行を作る
        const row = document.createElement("tr");
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);

        // HTMLにあるテーブルに行を表示させる（これにておわり）
        tbody.appendChild(row);
    });


    // これはテスト（元データをそのまま表示させている）
    const target = document.querySelector(".rawDataArea");
    if (target) {
        target.textContent = JSON.stringify(tasksWithin24Hours);
    }
})
