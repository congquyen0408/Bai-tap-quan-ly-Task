let taskObject = [
    {
        id: "TASK_1711900800000",      // Chuỗi định danh duy nhất (dùng Date.now())
        title: "Thiết kế giao diện",    // Tên công việc (String)
        category: "Design",             // Danh mục: Work, Personal, Study, Design,... (String)
        dueDate: "2026-08-05",         // Hạn hoàn thành (YYYY-MM-DD)
        priority: "High",               // Mức độ ưu tiên: High, Medium, Low (String)
        status: "Pending",              // Trạng thái: Pending, In Progress, Completed (String)
        createdAt: "2026-07-29"         // Ngày tạo task (Tự động lấy ngày hiện tại)
    }       
]

function renderUi() {
    let taskData = ""
    for (let i = 0; i < taskObject.length; i++) {
        taskData += `
    <tr class="text-center">
                <td>${taskObject[i].id}</td>
                <td>${taskObject[i].title}</td>
                <td>${taskObject[i].category}</td>
                <td>${taskObject[i].dueDate}</td>
                <td>${taskObject[i].priority}</td>
                <td>${taskObject[i].status}</td>
                <td>${taskObject[i].createdAt}</td>
            </tr>`
    }
    let taskDataEl = document.querySelector("#task_data")
    taskDataEl.innerHTML = taskData;
}
let taskForm = document.querySelector("#taskForm")
taskForm.onsubmit = function (e) {
    e.preventDefault();

    let newTask = {
        id: "TASK_" + Date.now(),
        title: document.querySelector(".title").value,
        category: document.querySelector(".category").value,
        dueDate: document.querySelector(".duedate").value,
        priority: document.querySelector(".priority").value,
        status: document.querySelector(".status").value,
        createdAt: new Date().toISOString().split('T')[0]
    }
    taskObject.push(newTask);
    console.log(taskObject);
    renderUi();
    taskForm.reset();
}



renderUi()