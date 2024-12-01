document.addEventListener("DOMContentLoaded", () => {
    // Banner Cycling
    const banners = document.querySelectorAll(".author-banner");
    let currentBannerIndex = 0;
  
    function showNextBanner() {
      const currentBanner = banners[currentBannerIndex];
      currentBanner.classList.remove("active");
      currentBanner.classList.add("previous");
  
      // Pick a random banner that is not currently active
      let nextBannerIndex;
      do {
        nextBannerIndex = Math.floor(Math.random() * banners.length);
      } while (nextBannerIndex === currentBannerIndex);
  
      const nextBanner = banners[nextBannerIndex];
      nextBanner.classList.remove("previous");
      nextBanner.classList.add("active");
  
      currentBannerIndex = nextBannerIndex;
    }
  
    // Initialize the first banner
    banners[currentBannerIndex].classList.add("active");
  
    // Change banners at intervals
    setInterval(showNextBanner, 3000); // Change every 3 seconds
  
    // Fetch and display books and podcasts from data.json
    fetch('/views/landing-page/static/data.json')
      .then(response => response.json())
      .then(data => {
        displayBooks(data.books);
        displayPodcasts(data.podcasts);
      })
      .catch(error => console.error('Error fetching data:', error));
  
    // Function to dynamically display books
    function displayBooks(books) {
      const booksContainer = document.querySelector('.popular-books .category');
      books.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.style.backgroundColor = 'palegoldenrod';
        bookDiv.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <div class="book-content">
            <p><b>${book.title}</b></p>
            <p>₹${book.price}</p>
            <button data-id="${book.id}" data-title="${book.title}" data-price="${book.price}" data-image="${book.image}">Add to Cart</button>
          </div>
        `;
        booksContainer.appendChild(bookDiv);
      });
  
      // Add event listeners to all Add to Cart buttons
      const addToCartButtons = document.querySelectorAll('.book-content button');
      addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
          const book = {
            id: button.getAttribute('data-id'),
            title: button.getAttribute('data-title'),
            price: parseFloat(button.getAttribute('data-price')),
            image: button.getAttribute('data-image'),
          };
  
          addToCart(book); // Pass the book object to the Add to Cart function
        });
      });
    }
  
    // Function to dynamically display podcasts
    function displayPodcasts(podcasts) {
      const podcastsContainer = document.querySelector('.featured-podcasts .podcast-grid'); // Updated selector
      podcasts.forEach(podcast => {
        const podcastCard = document.createElement('div');
        podcastCard.classList.add('podcast-card');
        podcastCard.innerHTML = `
          <img src="${podcast.image}" alt="${podcast.title}">
          <h3>${podcast.title}</h3>
          <p style="color:gray;">Playlist - ${podcast.playlist}</p> <!-- Adjusted to use playlist instead of description -->
          <div class="audio-controls">
            <audio controls>
              <source src="${podcast.audio}" type="audio/mp3">
              Your browser does not support the audio element.
            </audio>
          </div>
        `;
        podcastsContainer.appendChild(podcastCard);
      });
    }
  
    // Function to add book to cart
    function addToCart(book) {
      // Get cart from localStorage or initialize an empty cart
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the book is already in the cart
      const existingBook = cart.find(item => item.id === book.id);
  
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
  });
  