const form = document.getElementById("form");
const titleElement = document.getElementById("title");
const taskList = document.getElementById("task-list");
// tạo biến này để chứa dữ liệu nhập vào
let todoSaved = JSON.parse(localStorage.getItem("todos")) || [];

// hàm này dùng để tạo random id sau này dùng để gán vào todo
function generatedRandomId(n, prefix = "todo-") {
  const characters =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
  let id = prefix;
  for (let i = 0; i < n; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
}

// hàm này để buộc người dùng phải nhập dữ liệu vào input
function validationTodo(todo) {
  if (!todo.title) {
    alert("Please Enter Full Fill");
    return false;
  }
  return true;
}

// from line 28 to line 52 is new code
form.addEventListener("submit", addNewTask);
// đây là trung tâm xử lí của todolist
function addNewTask(event) {
  // preventDefault dùng để ngăn không cho trình duyệt load lại trang
  event.preventDefault();
  // tạo biến todo để ta lấy dữ liệu từ người dùng
  const todo = {
    // title chính là nội dung người dùng ghi vào đây
    title: titleElement.value,
    // với status false thì ta có thể đổi nội dung khi xử lí ở các hàm sau này
    status: false,
    // với id để dựa vào id chúng ta có thể chọn để xóa hoặc thay đổi trạng thái cho todo
    id: generatedRandomId(4),
  };
  // if này dùng để bắt buộc người dùng phải đưa dữ liệu vào
  if (!validationTodo(todo)) return;
  // đưa những dữ liệu người dùng nhập vào mảng này todoSaved
  todoSaved.push(todo);
  // tiến hành lưu trữ data vào trong LocalStorage
  saveToLocalStorage();
  // lấy data từ trong LocalStorage hiển thị trên trình duyệt
  displayTodo(todoSaved);
  // trả về rỗng khi hoàn thành nhập task vào
  titleElement.value = "";
}

// from line 55 to line 77 is old code
// form.addEventListener("submit", (event) => {
//   // preventDefault dùng để ngăn không cho trình duyệt load lại trang
//   event.preventDefault();
//   // tạo biến todo để ta lấy dữ liệu từ người dùng
//   const todo = {
//     // title chính là nội dung người dùng ghi vào đây
//     title: titleElement.value,
//     // với status false thì ta có thể đổi nội dung khi xử lí ở các hàm sau này
//     status: false,
//     // với id để dựa vào id chúng ta có thể chọn để xóa hoặc thay đổi trạng thái cho todo
//     id: generatedRandomId(4),
//   };
//   // if này dùng để bắt buộc người dùng phải đưa dữ liệu vào
//   if (!validationTodo(todo)) return;
//   // đưa những dữ liệu người dùng nhập vào mảng này todoSaved
//   todoSaved.push(todo);
//   // tiến hành lưu trữ data vào trong LocalStorage
//   saveToLocalStorage();
//   // lấy data từ trong LocalStorage hiển thị trên trình duyệt
//   displayTodo(todoSaved);
//   // trả về rỗng khi hoàn thành nhập task vào
//   titleElement.value = "";
// });

// tạo hàm để mã hóa dữ liệu và đưa vào localStorage
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todoSaved));
}

// tạo hàm để hiển thị dữ liệu trên trình duyệt với (todos) là key lưu giữ trên localStorage
function displayTodo(todos) {
  // taskList.innerText = ''; để trả dữ liệu về rỗng trước khi tiếp tục lưu ở dữ liệu thứ 2
  taskList.innerText = "";
  // để hiển thị thì dùng forEach lặp qua các giá trị bên trong của mảng
  todos.forEach((item) => {
    // tạo biến trElement để mỗi khi chạy lệnh sẽ tiến hành tạo ra mội biến tr ảo mới
    let trElement = document.createElement("tr");
    // trElement.innerHTML sẽ thể hiện string này có giá trị như html
    // các giá trị item.status hoặc item.title sẽ lấy giá trị từ key todos ở trong localStorage ra
    trElement.innerHTML = `
		<td class="td-status">
			<p class="${item.status ? "completed" : "pending"}" onclick='toggleStatus("${
      item.id
    }")'>${item.status ? "Completed" : "Pending"}</p>
		</td>
		<td >${item.title}</td>
		<td class="td-remove"><button id="remove-btn" onclick="removeTodo('${
      item.id
    }')">Remove</button></td>
`;
    // sẽ đặt trElement vào trong taskList
    taskList.appendChild(trElement);
  });
  // cập nhật lại giá trị của todos
  saveToLocalStorage();
}

// tạo hàm đê thay đổi status của mỗi todo khi click
function toggleStatus(id) {
  todoSaved = todoSaved.map((item) => {
    if (item.id === id) {
      item.status = !item.status;
    }
    return item;
  });
  // cập nhật lại màn hình hiển thị
  displayTodo(todoSaved);
}

// hàm này dùng để xóa  todo dựa theo id của todo đó
function removeTodo(id) {
  if (window.confirm("Are you sure?")) {
    todoSaved = todoSaved.filter((item) => item.id !== id);
    // cập nhật lại màn hình hiển thị
    displayTodo(todoSaved);
  }
}

//hàm này dùng để xóa toàn bộ todo hiện có
function removeAll() {
  localStorage.setItem("todos", "[]");
  todoSaved = [];
  // cập nhật lại màn hình hiển thị
  displayTodo(todoSaved);
}

displayTodo(todoSaved);
