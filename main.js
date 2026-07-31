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

if (!localStorage.getItem("taskObject")) {
    localStorage.setItem("taskObject", JSON.stringify(taskObject));
} else {
    taskObject = JSON.parse(localStorage.getItem("taskObject"));
}

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
                <td><button onclick="editTask('${taskObject[i].id}')">Sửa</button></td>
                <td><button onclick="deleteTask('${taskObject[i].id}')">Xóa</button></td>
            </tr>`
    }
    let taskDataEl = document.querySelector("#task_data")
    taskDataEl.innerHTML = taskData;
    localStorage.setItem("taskObject", JSON.stringify(taskObject));
}


let editId = null;

let taskForm = document.querySelector("#taskForm")
taskForm.onsubmit = function (e) {
    e.preventDefault();

    document.querySelector(".error-title").innerText = "";
    document.querySelector(".error-duedate").innerText = "";

    let newTask = {
        id: "TASK_" + Date.now(),
        title: document.querySelector(".title").value,
        category: document.querySelector(".category").value,
        dueDate: document.querySelector(".duedate").value,
        priority: document.querySelector(".priority").value,
        status: document.querySelector(".status").value,
        createdAt: new Date().toISOString().split('T')[0]
    };

    let isValid = true;
    if (newTask.title === "") {
        document.querySelector(".error-title").innerText = "Vui lòng nhập tên công việc";
        isValid = false;
    }

    if (!newTask.dueDate) {
        document.querySelector(".error-duedate").innerText = "Vui lòng chọn hạn hoàn thành";
        isValid = false;
    } else if (newTask.dueDate < newTask.createdAt) {
        document.querySelector(".error-duedate").innerText = "Ngày hạn nộp không được nhỏ hơn ngày tạo hiện tại (" + newTask.createdAt + ")!";
        isValid = false;
    }
    if (!isValid) {
        return;
    }

    if (editId !== null) {
        for (let i = 0; i < taskObject.length; i++) {
            if (taskObject[i].id === editId) {
                taskObject[i].title = newTask.title;
                taskObject[i].category = newTask.category;
                taskObject[i].dueDate = newTask.dueDate;
                taskObject[i].priority = newTask.priority;
                taskObject[i].status = newTask.status;
                break;
            }
        }
        editId = null;
        document.querySelector("#submitBtn").innerText = "Thêm Task Mới";
    } else {
        taskObject.push(newTask);
    }
    console.log(taskObject);
    renderUi();
    taskForm.reset();
};


function editTask(editIdData) {
    for (let i = 0; i < taskObject.length; i++) {
        if (taskObject[i].id === editIdData) {
            document.querySelector(".title").value = taskObject[i].title;
            document.querySelector(".category").value = taskObject[i].category;
            document.querySelector(".duedate").value = taskObject[i].dueDate;
            document.querySelector(".priority").value = taskObject[i].priority;
            document.querySelector(".status").value = taskObject[i].status;

            document.querySelector("#submitBtn").innerText = "Cập Nhật";
            editId = editIdData;
            break;
        }
    }
    renderUi()
}



function deleteTask(idDelete) {
    let isConfirm = confirm("Bạn có chắc chắn muốn xóa công việc này không?");
    if (isConfirm) {
        for (let i = 0; i < taskObject.length; i++) {
            if (taskObject[i].id === idDelete) {
                taskObject.splice(i, 1);
                console.log(taskObject);
                break;
            }
        }
        renderUi()
    }
}

function clearCompletedTasks() {
    let isConfirm = confirm("Bạn có chắc muốn xóa tất cả công việc Đã hoàn thành không?");

    if (isConfirm) {
        for (let i = taskObject.length - 1; i >= 0; i--) {
            if (taskObject[i].status === "Completed") {
                taskObject.splice(i, 1);
                console.log(taskObject);
            } else {
                alert("Không có task Completed");
            }
        }
        renderUi();
    }
}
renderUi()