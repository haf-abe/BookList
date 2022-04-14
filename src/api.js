const router = require('express').Router();
const books = require('./books');

let booksDirectory = books;
//book list function, 

router.get('/books', function(req, res) {
    res.send(booksDirectory);
});
//Calls the Book directory to list all books in books.js

router.get('/books/:id', function(req, res) {
    const {id} = req.params; 

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send('404 Error - Book Not Found :(');

    res.send(book);
});
// calls for a book using its ISBN number using .find, the function on line 15 checks to see if the isbn is equal to the ID. If its not, it sends a 404 error

router.post('/books', function(req, res) {
    const {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const bookExist = booksDirectory.find(b =>b.isbn === isbn);
    if (bookExist) return res.send("Book Already Exists!");
//check to see if the book we are creating already exists
    const book = {
        title,
        isbn,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    };
    booksDirectory.push(book);

    res.send(book);
});
//fields of entry for each of the books, these will be used in the 'updatedBook' const - new books can be added using these parameters

router.put('/books/:id', function(req, res) {
    const {id} = req.params;
    const {
        title,
        pageCount,
        publishedDate,
        thumbnailUrl,
        longDescription,
        status,
        authors,
        categories
    } = req.body;

    const book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.send("Book Does Not Exist!");
//for when a user searches for a book using its ID/ISBN

    const updateField = (val, prev) => !val ? prev : val;

    const updatedBook = {
        ...book,
        title: updateField(title, book.title),
        pageCount: updateField(pageCount, book.pageCount),
        publishedDate: updateField(publishedDate, book.publishedDate),
        thumbnailUrl: updateField(thumbnailUrl, book.thumbnailUrl),
        longDescription: updateField(longDescription, book.longDescription),
        status: updateField(status, book.status),
        authors: updateField(authors, book.authors),
        categories: updateField(categories, book.categories),
    };
    const bookIndex = booksDirectory.findIndex(b => b.isbn === id);
    booksDirectory.splice(bookIndex, 1, updatedBook);
    res.send(updatedBook);
// Constructor used for updating a book when the user enters information into insomnia client as a put request. passes all properties and uses updateField functions to adapt the values
});

router.delete('/books/:id', function(req, res) {
    const {id} = req.params;

    let book = booksDirectory.find(b => b.isbn === id);
    if (!book) return res.status(404).send("404 Error, Book Does Not Exist! :(");

    booksDirectory = booksDirectory.filter(b => b.isbn !== id);

    res.send("Success");
});
//delete function. Finds the book based on an ID search and deletes it from the database. If the API can't find the book, it displays a 404 error message.
module.exports = router;