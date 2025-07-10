let allTasks = [];
let currentEditId = null;
let deleteId = null;

// 🔁 Load tasks from server
function loadTasks() {
    fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(data => {
            allTasks = data;
            renderTable(allTasks);
            renderPagination(allTasks);
        });
}

// 🔄 Render table
function renderTable(tasks) {
    const tbody = document.getElementById("taskBody");
    tbody.innerHTML = "";

    tasks.forEach(task => {
        tbody.innerHTML += `
      <tr>
        <td data-label="Assigned To">${task.assignedTo}</td>
        <td data-label="Status">${task.status}</td>
        <td data-label="Due Date">${task.dueDate}</td>
        <td data-label="Priority">${task.priority}</td>
        <td data-label="Comments">${task.comments}</td>

        <td>
          <button class="btn btn-sm btn-outline-warning me-1" onclick='openEditModal(${JSON.stringify(task)})'>✏️ Edit</button>
          <button class="btn btn-sm btn-outline-danger" onclick="openDeleteModal(${task.id}, '${task.assignedTo}')">🗑️ Delete</button>
        </td>
      </tr>
    `;
    });
}

// 🔍 Search Function
function searchTasks() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredTasks = allTasks.filter(task =>
        task.assignedTo.toLowerCase().includes(searchTerm) ||
        task.status.toLowerCase().includes(searchTerm) ||
        task.priority.toLowerCase().includes(searchTerm) ||
        (task.comments?.toLowerCase().includes(searchTerm))
    );
    renderTable(filteredTasks);
    renderPagination(filteredTasks);
}

// ✏️ Open Edit Modal
function openEditModal(task) {
    currentEditId = task.id;
    document.getElementById("editId").value = task.id;
    document.getElementById("editAssignedTo").value = task.assignedTo;
    document.getElementById("editStatus").value = task.status;
    document.getElementById("editDueDate").value = task.dueDate;
    document.getElementById("editPriority").value = task.priority;
    document.getElementById("editComments").value = task.comments;
    new bootstrap.Modal(document.getElementById("editModal")).show();
}

// 💾 Submit Edit
document.getElementById("editForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        assignedTo: document.getElementById("editAssignedTo").value,
        status: document.getElementById("editStatus").value,
        dueDate: document.getElementById("editDueDate").value,
        priority: document.getElementById("editPriority").value,
        comments: document.getElementById("editComments").value
    };
    fetch(`http://localhost:3000/tasks/${currentEditId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(() => {
            bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();
            showToast("✅ Task updated successfully!");
            loadTasks();
        });
});

// ❌ Open Delete Modal
function openDeleteModal(id, name) {
    deleteId = id;
    document.getElementById("deleteTaskName").innerText = name;
    new bootstrap.Modal(document.getElementById("deleteModal")).show();
}

// ✅ Confirm Delete
function confirmDelete() {
    fetch(`http://localhost:3000/tasks/${deleteId}`, {
        method: "DELETE"
    }).then(() => {
        bootstrap.Modal.getInstance(document.getElementById("deleteModal")).hide();
        showToast("🗑️ Task deleted!");
        loadTasks();
    });
}

// ✅ Show Toast
function showToast(message) {
    const toastMsg = document.getElementById("toastMsg");
    toastMsg.innerText = message;
    const toastEl = document.getElementById("successToast");
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
}

// 📦 Dummy Pagination (if needed to match UI, else remove)
function renderPagination(data) {
    // You can build pagination logic here
    // For now, just clearing any existing content
    document.getElementById("paginationContainer").innerHTML = "";
}

// 🚀 Load tasks initially
loadTasks();
