const body = document.querySelector('body');
const btnNewBook = document.querySelector('#btn-new-book');
const overlay = document.createElement("div");
overlay.classList.add("overlay");
body.appendChild(overlay);
const popup = document.createElement("div");
popup.classList.add("popup");
body.appendChild(popup);


btnNewBook.addEventListener('click', () => {
    console.log("HELLO");
    openPopup();
});

function openPopup() {
    popup.classList.add("open-popup");
    overlay.classList.add("active");
}

// function openPopup() {
//     const popup = document.querySelector('.prompt');
//     popup.style.display = 'block';
// }

// function closeDiv() {
//     let get = document.querySelector('.prompt');
//     get.style.display = 'none';
// }

const myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
}