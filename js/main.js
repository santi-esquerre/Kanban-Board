const columns = document.querySelectorAll(".kanban-cards");

function saveCards() {
  columns.forEach((column) => {
    localStorage.setItem(column.id, column.innerHTML ? column.innerHTML : "");
  });
}

columns.forEach((column) => {
  column.addEventListener("mouseenter", () => {
    const cards = document.querySelectorAll(".card");

    if (cards.length > 0) {
      cards.forEach((card) => {
        card.addEventListener("dragstart", () => {
          card.classList.add("dragging");
        });

        card.addEventListener("dragend", () => {
          card.classList.remove("dragging");
          saveCards();
        });
      });
    }

    const deleteBtns = document.querySelectorAll(".delete-card-btn");

    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        btn.parentElement.parentElement.remove();
        saveCards();
      });
    });
  });

  column.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector(".dragging");
    column.appendChild(draggingCard);
    saveCards();
  });
});

document.querySelectorAll(".new-card-form").forEach((form) => {
  const column = form.previousElementSibling;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = form.querySelector("input").value;

    const card = document.createElement("div");
    card.innerHTML = `<div class="card-body">
      <p class="card-text">${title}</p>
      <button class="delete-card-btn"><i class="fas fa-trash"></i></button>
    </div>`;
    card.classList.add("card", "kanban-card");
    card.draggable = true;
    column.appendChild(card);
    saveCards();
    form.reset();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  columns.forEach((column) => {
    let cards = localStorage.getItem(column.id);
    cards ? (column.innerHTML += cards) : null;
  });
});
