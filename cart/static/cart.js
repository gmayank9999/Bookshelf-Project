document.addEventListener("DOMContentLoaded", () => {  
    const cartItemsContainer = document.getElementById("cart-items");  
    const subtotalElement = document.getElementById("subtotal");  
    const totalElement = document.getElementById("total");  

    // Load cart from localStorage  
    const cart = JSON.parse(localStorage.getItem("cart")) || [];  

    // Function to display cart items  
    function displayCartItems() {  
        let subtotal = 0;  
        cartItemsContainer.innerHTML = ''; // Clear existing items  

        if (cart.length === 0) {  
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';  
            subtotalElement.textContent = '₹0';  
            totalElement.textContent = '₹5'; // Assuming platform fees  
            return;  
        }  

        cart.forEach(({ id, title, price, quantity, image }) => {  
            const itemTotal = price * quantity;  
            subtotal += itemTotal;  

            const cartItem = document.createElement("div");  
            cartItem.classList.add("cart-item");  
            cartItem.innerHTML = `  
                <img src="${image}" alt="${title}" width="50">  
                <div class="item-details">  
                    <h4>${title}</h4>  
                    <p>Price: ₹${price}</p>  
                    <p>Quantity: <input type="number" min="1" value="${quantity}" class="quantity-input" data-id="${id}"></p>  
                    <p>Total: ₹<span class="item-total">${itemTotal}</span></p>  
                    <button class="remove-button" data-id="${id}">Remove</button>  
                </div>  
            `;  
            cartItemsContainer.appendChild(cartItem);  

            // Event listener for quantity change  
            const quantityInput = cartItem.querySelector('.quantity-input');  
            quantityInput.addEventListener('change', (e) => {  
                const newQuantity = Math.max(1, parseInt(e.target.value, 10)); // Ensure quantity doesn't go below 1  
                updateQuantity(id, newQuantity);  
            });  

            // Event listener for remove button  
            const removeButton = cartItem.querySelector('.remove-button');  
            removeButton.addEventListener('click', () => {  
                removeItem(id);  
            });  
        });  

        subtotalElement.textContent = `₹${subtotal}`;  
        totalElement.textContent = `₹${subtotal + 5}`; // Add platform fees  
    }  

    // Function to update quantity  
    function updateQuantity(id, newQuantity) {  
        const itemIndex = cart.findIndex(item => item.id === id);  
        if (itemIndex > -1) {  
            cart[itemIndex].quantity = newQuantity; // Update quantity  
            localStorage.setItem("cart", JSON.stringify(cart)); // Save back to local storage  
            displayCartItems(); // Re-render cart items  
        }  
    }  

    // Function to remove item  
    function removeItem(id) {  
        const updatedCart = cart.filter(item => item.id !== id); // Remove item  
        if (updatedCart.length < cart.length) { // Check if an item was removed  
            localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update local storage  
            displayCartItems(); // Re-render cart items  
        } else {  
            alert("Item not found in cart."); // Debug alert  
        }  
    }  
    // removeButton.addEventListener('click', () => {  
    //     console.log(`Removing item with ID: ${id}`); // Check the ID being passed  
    //     removeItem(id);  
    // });

    // Example item to test  
    const exampleBook = {  
        id: '1',  
        title: 'Grave Streets',  
        price: 200,  
        image: './Grave streets.png',  
        quantity: 1  
    };  

    // Uncomment the following line to add the example book to the cart  
    // cart.push(exampleBook); localStorage.setItem("cart", JSON.stringify(cart));  

    displayCartItems(); // Initial call to display items  
});