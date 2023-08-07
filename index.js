window.addEventListener("DOMContentLoaded", function () {
    let todolist = [];
    let count,
      i = 0;
    let list = document.getElementById("tasklist");
    if (localStorage.getItem(localStorage.key(0))) {
      count = JSON.parse(localStorage.getItem(localStorage.key(0))).length;
    } else {
      count = 0;
    }
    console.log(`Total task count is: ${count}`);
    for (i = 0; i < count; i++) {
      getlocal();
      let litem = document.createElement("li");
      let deletebutton = document.createElement("span");
      deletebutton.classList.add("close");
      deletebutton.textContent = "\u00D7";
      deletebutton.onclick = removeButton;
      litem.setAttribute("id", i);
      if (todolist[i].jobstatus == true) {
        litem.className = "checked";
      }
      litem.textContent = todolist[i].jobname;
      litem.appendChild(deletebutton);
      list.appendChild(litem);
    }
    let listItems = document.querySelectorAll("#tasklist li");
    listItems.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        if (todolist[index].jobstatus == false) {
          todolist[index].jobstatus = true;
        } else if (todolist[index].jobstatus == true) {
          todolist[index].jobstatus = false;
        }
        savelocal();
        reloadPage();
      });
    });
    newElement = function () {
      let newinput = document.getElementsByClassName("name");
      taskvalue = newinput[0].value;
      if (taskvalue.trim() !== "") {
        todolist.push({ jobname: taskvalue, jobstatus: false });
        newinput.value = "";
        reloadPage();
        savelocal();
      }
    };
    function removeButton(item) {
      let x = item.target.parentElement;
      getlocal();
      todolist.splice(x.id, 1);
      savelocal();
      reloadPage();
    }
    function reloadPage() {
      window.location.reload();
    }
    function savelocal() {
      localStorage.setItem("todolist", JSON.stringify(todolist));
    }
    function getlocal() {
      todolist = JSON.parse(localStorage.getItem("todolist"));
    }
  });