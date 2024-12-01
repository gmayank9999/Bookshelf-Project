class Book {
    constructor(id, title, image) {
        this.id = id;
        this.title = title;
        this.image = image;
    }
  
    // Method to render the book element
    render() {
        return `
            <div class="option-box">
                <img class="responsive-img" src="${this.image}" alt="${this.title}">
                <h3>${this.title}</h3>
            </div>
        `;
    }
  }
  
  class BookStore {
    constructor() {
        this.books = [];
    }
  
    // Method to load books from JSON data
    loadBooks(booksData) {
        this.books = JSON.parse(booksData).map(bookData => {
            return new Book(bookData.id, bookData.title, bookData.image);
        });
    }
  
    // Method to display books in the grid
    displayBooks(containerId) {
        const bookGridContainer = document.getElementById(containerId);
        bookGridContainer.innerHTML = this.books.map(book => book.render()).join('');
    }
  }
  
  // Sample JSON data 
  const booksJSON = `[
    {"id": 1, "title": "The Missing Ones", "image": "../assets/wholesale-buyer/book1.png"},
    {"id": 2, "title": "The Hobbit", "image": "../assets/wholesale-buyer/hobbit.png"},
    {"id": 3, "title": "The Lord of the Rings", "image": "../assets/wholesale-buyer/lord%20rings.png"},
    {"id": 4, "title": "Harry Potter", "image": "../assets/wholesale-buyer/harry.png"},
    {"id": 5, "title": "The Book Thief", "image": "../assets/wholesale-buyer/bookthief.png"}
  ]`;
  
  // Initialize the bookstore and load books on window load
  const bookstore = new BookStore();
  
  window.onload = function() {
    bookstore.loadBooks(booksJSON);
    bookstore.displayBooks('book-grid-container');
  }