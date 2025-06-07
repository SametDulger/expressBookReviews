const express = require('express');
const public_users = express.Router();

let books = require("./booksdb.js");  
let users = require("./auth_users.js").users; 

public_users.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }

    const userExists = users.some(user => user.username === username);
    if (userExists) {
      return res.status(409).json({ message: "Username already exists." });
    }

    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully." });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

const getBooks = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(books);
    } catch (error) {
      reject(error);
    }
  });
};

const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    const book = books[isbn];
    if (book) {
      resolve(book);
    } else {
      reject(new Error("No book found for the given ISBN"));
    }
  });
};

const getBooksByAuthor = (author) => {
  return new Promise((resolve, reject) => {
    const authorLower = author.toLowerCase();
    const matchingBooks = Object.values(books).filter(book => book.author.toLowerCase() === authorLower);
    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject(new Error("No books found for the given author"));
    }
  });
};


const getBooksByTitle = (title) => {
  return new Promise((resolve, reject) => {
    const titleLower = title.toLowerCase();
    const matchingBooks = Object.values(books).filter(book => book.title.toLowerCase() === titleLower);
    if (matchingBooks.length > 0) {
      resolve(matchingBooks);
    } else {
      reject(new Error("No books found for the given title"));
    }
  });
};

public_users.get("/", async (req, res) => {
  try {
    const allBooks = await getBooks();
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

public_users.get("/isbn/:isbn", async (req, res) => {
  try {
    const isbn = req.params.isbn;
    const book = await getBookByISBN(isbn);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});


public_users.get("/author/:author", async (req, res) => {
  try {
    const author = req.params.author;
    const booksByAuthor = await getBooksByAuthor(author);
    return res.status(200).json(booksByAuthor);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
});

public_users.get('/title/:title', async (req, res) => {
  try {
    const title = req.params.title.toLowerCase();
    const matchingBooks = [];

    for (let key in books) {
      if (books[key].title.toLowerCase().includes(title)) {
        matchingBooks.push(books[key]);
      }
    }

    if (matchingBooks.length > 0) {
      return res.status(200).json(matchingBooks);
    } else {
      return res.status(404).json({ message: "No books found for the given title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books by title", error: error.message });
  }
});


module.exports.general = public_users;
