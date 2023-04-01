const buttonNewBook = document.querySelector('#btn-new-book');
const buttonSubmit = document.querySelector('#btn-submit');
const buttonClose = document.querySelector('.btn-close');
const popup = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const inputTitle = document.querySelector('#input-title');
const inputAuthor = document.querySelector('#input-author');
const inputPages = document.querySelector('#input-pages');
const checkbox = document.querySelector('.checkbox');
const cards = document.querySelector('.cards');
const buttonToggle = document.querySelector('#btn-toggle');
const buttonRemove = document.querySelector('.btn-remove');


const myLibrary = [];
class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }
}

buttonNewBook.addEventListener('click', openPopup);
buttonClose.addEventListener('click', closePopup);
buttonSubmit.addEventListener('click', (e) => (e.preventDefault(), addBookToLibrary(), closePopup()));

function openPopup() {
    setTimeout(() => {
        popup.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 0);
    popup.style.display = 'block';
    overlay.style.display = 'block';
}

function closePopup() {
    popup.style.opacity = 0;
    overlay.style.opacity = 0;
    setTimeout(() => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        inputTitle.value = '';
        inputAuthor.value = '';
        inputPages.value = '';
        checkbox.checked = false;
    }, 300);
}

function addBookToLibrary() {
    const createNewBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, checkbox.checked);
    checkForDuplicateTitle();
    myLibrary.push(createNewBook);
    showBooks();
}

function showBooks() {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = `
        <p>Title: ${inputTitle.value}</p>
        <p>Author: ${inputAuthor.value}</p>
        <p>Pages: ${inputPages.value}</p>
        <div class="read-or-not">
        <span>Mark as read?</span>
            <input type="checkbox" class="checkbox">
        </div>
        `;
    cards.appendChild(bookCard);
    const buttonRemove = document.createElement('button');
    buttonRemove.classList.add('btn-remove');
    buttonRemove.textContent = 'Remove';
    bookCard.appendChild(buttonRemove);
    buttonRemove.addEventListener('click', removeBook);
    function removeBook() {
        bookCard.remove();
        const index = myLibrary.indexOf(createNewBook);
        if (index !== -1) {
            myLibrary.splice(index, 1);
        }
    }
}

function checkForDuplicateTitle() {
    const titles = new Set();
    for (let i = 0; i < myLibrary.length; i++) {
        if (titles.has(myLibrary[i].title)) {
            alert('ERROR!');
        }
        titles.add(myLibrary[i].title);
    }
}


