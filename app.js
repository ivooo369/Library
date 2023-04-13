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
const msgExistingBook = document.querySelector('#msg-existing-book');
const totalBooksCounter = document.querySelector('#total-books-counter');
const totalPagesCounter = document.querySelector('#total-pages-counter');
const readBooksCounter = document.querySelector('#read-books-counter');
const unreadBooksCounter = document.querySelector('#unread-books-counter');

const myLibrary = [];
let totalBooks = 0;
let totalPages = 0;
let readBooks = 0;
let unreadBooks = 0;
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
overlay.addEventListener('click', closePopup);
buttonSubmit.addEventListener('click', (e) => {
    if (validateForm()) {
        e.preventDefault();
        createNewBook();
    }
});
inputTitle.addEventListener('input', () => inputTitle.setCustomValidity(''));
inputAuthor.addEventListener('input', () => inputAuthor.setCustomValidity(''));
inputPages.addEventListener('input', () => inputPages.setCustomValidity(''));
window.addEventListener('load', () => {
    const storedBooks = JSON.parse(localStorage.getItem('myLibrary'));
    if (storedBooks) {
        myLibrary.push(...storedBooks);
        displayBooks();
        updateLibraryLog();
    }
});

function openPopup() {
    setTimeout(() => {
        popup.style.opacity = 1;
        overlay.style.opacity = 1;
    }, 0);
    popup.style.display = 'block';
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
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
        msgExistingBook.style.display = 'none';
        checkbox.checked = false;
    }, 300);
    document.body.style.overflow = 'auto';
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    displayBooks();
}

function updateLibraryLog() {
    totalBooksCounter.textContent = myLibrary.length;
    totalPagesCounter.textContent = myLibrary.reduce((total, book) => total + Number(book.pages), 0);
    readBooksCounter.textContent = myLibrary.filter(book => book.isRead).length;
    unreadBooksCounter.textContent = myLibrary.filter(book => !book.isRead).length;
}

function displayBooks() {
    cards.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = book.isRead;
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                book.isRead = true;
                readBooks++;
                if (unreadBooks > 0) {
                    unreadBooks--;
                }
            } else {
                book.isRead = false;
                unreadBooks++;
                if (readBooks > 0) {
                    readBooks--;
                }
            }
            updateLibraryLog();
        });
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `<p>Title: ${book.title}</p>
        <p>Author: ${book.author}</p>
        <p>Pages: ${book.pages}</p>
        <div class="read-or-not">
        <span>Mark as read?</span>
        </div>`;
        const readOrNot = bookCard.querySelector('.read-or-not');
        readOrNot.appendChild(checkbox);
        cards.appendChild(bookCard);
        const buttonRemove = document.createElement('button');
        buttonRemove.classList.add('btn-remove');
        buttonRemove.textContent = 'Remove';
        bookCard.appendChild(buttonRemove);
        buttonRemove.addEventListener('click', () => removeBook(book, bookCard));
    }
}

function createNewBook() {
    const newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value, checkbox.checked);
    if (!checkForDuplicateTitle(newBook)) {
        addBookToLibrary(newBook);
        updateLibraryLog();
        closePopup();
    }
}

function removeBook(book, bookCard) {
    const pagesToRemove = Number(bookCard.querySelector('p:nth-of-type(3)').textContent.split(' ')[1]);
    bookCard.remove();
    const index = myLibrary.indexOf(book);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    }
    totalBooks--;
    totalPages -= pagesToRemove;
    if (book.isRead && readBooks > 0) {
        readBooks--;
    } else if (!book.isRead && unreadBooks > 0) {
        unreadBooks--;
    }
    updateLibraryLog();
}

function checkForDuplicateTitle(book) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === book.title) {
            msgExistingBook.style.display = 'block';
            return true;
        } else {
            msgExistingBook.style.display = 'none';
        }
    }
    return false;
}

function validateForm() {
    if (inputTitle.value === '') {
        inputTitle.setCustomValidity('Please enter a title.');
        inputTitle.reportValidity();
        return false;
    } else if (inputAuthor.value === '') {
        inputAuthor.setCustomValidity('Please enter an author.');
        inputAuthor.reportValidity();
        return false;
    } else if (inputPages.value === '') {
        inputPages.setCustomValidity('Please enter number of pages.');
        inputPages.reportValidity();
        return false;
    }
    if (!(inputPages.value > 0 && inputPages.value < 100000)) {
        inputPages.setCustomValidity('The value has to be between 0 and 100000.');
        inputPages.reportValidity();
        return false;
    }
    return true;
}