document.addEventListener("DOMContentLoaded", () => {
    // Fetch data from JSON file
    fetch('/prb/static/books.json')
      .then((response) => response.json())
      .then((data) => 
        {
        const container = document.getElementById("book-container");
        data.forEach((category) => {
          // Create category section
          const categorySection = document.createElement("div");
          categorySection.classList.add("category");
  
          // Add category title
          const categoryTitle = document.createElement("h3");
          categoryTitle.textContent = category.category;
          categorySection.appendChild(categoryTitle);
  
          // Add books in the category
          category.books.forEach((book) => {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book");
            bookCard.innerHTML = `
              <img src="${book.image}" alt="${book.title}">
              <p>${book.title}</p>
              <p>${book.price}</p>
              <button data-id="${book.id}">Add to Cart</button>
            `;
  
            // Attach event listener to the "Add to Cart" button
            bookCard.querySelector("button").addEventListener("click", () => {
              addToCart(book);
            });
  
            categorySection.appendChild(bookCard);
          });
  
          container.appendChild(categorySection);
        });
      })
      .catch((error) => console.error("Error fetching book data:", error));
  });
  
  // Function to add book to cart
  function addToCart(book) {
    // Get cart from localStorage or initialize an empty cart
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Check if the book is already in the cart
    const existingBook = cart.find((item) => item.id === book.id);
  
    if (existingBook) {
      // Increment the quantity if the book is already in the cart
      existingBook.quantity += 1;
    } else {
      // Add new book to the cart with quantity 1
      cart.push({ ...book, quantity: 1 });
    }
  
    // Save updated cart back to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${book.title} has been added to your cart.`);
  }
  
  