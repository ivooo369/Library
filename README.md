# Library

This is a basic library app that I created while following The Odin Project's curriculum.

## Assignment:

1. If you haven’t already, set up your project with skeleton HTML/CSS and JS files.
2. All of your book objects are going to be stored in an array, so add a function to the script (not the constructor) that can take user’s input and store the new book objects into an array. Your code should look something like this:
3. Write a function that loops through the array and displays each book on the page. You can display them in some sort of table, or each on their own "card". It might help for now to manually add a few books to your array so you can see the display.
4. Add a "NEW BOO" button that brings up a form allowing users to input the details for the new book: author, title, number of pages, whether it’s been read and anything else you might want. How you decide to display this form is up to you.
5. Add a button on each book’s display to remove the book from the library.
   - You will need to associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.
6. Add a button on each book’s display to change its read status.
   - To facilitate this you will want to create the function that toggles a book’s read status on your Book prototype instance.

## Features:

- Creating a book by giving it a unique title, author, number of pages and marking it as read or unread;
- Removing a book from the library;
- Library log that tracks the total number of books and pages, as well as the number of read and unread books in the library;
- Local storage for all created books;

  I am considering adding authentication with a Google account in the future.

## Used technologies:

- HTML;
- CSS;
- JavaScript;

## Live Preview:

https://ivooo369.github.io/Library/
