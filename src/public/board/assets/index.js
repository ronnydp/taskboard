document.addEventListener("DOMContentLoaded", function () {
  const cardTask = document.querySelectorAll(".card-task");

  function checkFirstVisit() {
    if(!localStorage.getItem('visited')) {
      localStorage.setItem('visited', true);
      window.location.href = '/board/create'
    }
  }

  checkFirstVisit();

  //^ CARD TASK
  cardTask.forEach((div) => {
    div.style.backgroundColor = "#F5D565";
    const iconSpan = div.querySelector('span[class^="icon-"]').classList.value;
    if (iconSpan === "icon-inprogress") {
      div.style.backgroundColor = "#F5D565";
    } else if (iconSpan === "icon-completed") {
      div.style.backgroundColor = "#A0ECB1";
    } else if (iconSpan === "icon-wontdo") {
      div.style.backgroundColor = "#F7D4D3";
    } else {
      div.style.backgroundColor = "#E3E8EF";
    }
  });

  //^ CLOSE FORM
  const modal = document.getElementById("myModal");
  const form = document.getElementById("form");
  const close = document.getElementById("closeModalBtn");

  close.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
  });

  //^ FORM - SELECT ICON
  const iconRadioButons = document.querySelectorAll('input[name="icon"]');
  iconRadioButons.forEach((icon) => {
    icon.addEventListener("change", async () => {
      if (icon.checked) {
        const iconUrl = document
          .querySelector(`label[for="${icon.id}"]`)
          .querySelector("img").src;
        icon.value = iconUrl;
      }
    });
  });

  //^ SHOW FORM
  const taskLinks = document.querySelectorAll(".task-link");
  const inputBoardId = document.getElementById("boardId");

  taskLinks.forEach((tasklink) => {
    tasklink.addEventListener("click", (e) => {
      e.preventDefault();
      const taskId = tasklink.getAttribute("data-id");
      const boardId = inputBoardId.value;

      fetch(`/board/${boardId}/tasks/${taskId}`)
        .then((response) => response.text())
        .then((data) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(data, "text/html");

          const modalForm = doc.querySelector(".modal-body");
          document.querySelector("#myModal .modal .modal-body").innerHTML =
            modalForm.outerHTML;
          document.getElementById("myModal").style.display = "block";
        })
        .catch((error) => {
          console.error("Error loading task details: ", error);
        });
    });
  });

  //^ EDIT BOARD NAME
  const inputBoardName = document.getElementById("boardName");
  const editBoardNameBtn = document.getElementById("editBtn");
  const saveBoardNameBtn = document.getElementById("saveBoardNameBtn");
  const cancelBoardNameBtn = document.getElementById("cancelBoardNameBtn");

  editBoardNameBtn.addEventListener("click", () => {
    inputBoardName.disabled = false;
    inputBoardName.focus();
    saveBoardNameBtn.style.display = "block";
    cancelBoardNameBtn.style.display = "block";
    editBoardNameBtn.style.display = "none";
  });

  cancelBoardNameBtn.addEventListener('click', () => {
    inputBoardName.disabled = true;
    saveBoardNameBtn.style.display = "none";
    editBoardNameBtn.style.display = "block";
    cancelBoardNameBtn.style.display = "none";
  })
});
