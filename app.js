const buttonNewBook = document.querySelector('#btn-new-book');
const buttonClose = document.querySelector('#btn-close');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');

buttonNewBook.addEventListener('click', () => {
    openPopup();
});

buttonClose.addEventListener('click', () => {
    closePopup();
});

function openPopup() {
    setTimeout(() => {
        popup.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 0);
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function closePopup() {
    popup.style.opacity = '0';
    overlay.style.opacity = '0';
    setTimeout(() => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    }, 300);
}

// const myLibrary = [];

// function Book(title, author, pages, isRead) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.isRead = false;
// }