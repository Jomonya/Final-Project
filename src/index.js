document.addEventListener("DOMContentLoaded", function () {
    const baseURL = "http://localhost:3000";
    const servicesEndpoint = "/services";
    const feedbackForm = document.getElementById("feedback-form");
    const confirmationMessage = document.getElementById("confirmation-message");

    // Global variables
    let servicesData = [];
    let cartItems = [];
    let reviewsData = [];

    // Fetch services from the API
    function fetchServices() {
        fetch(baseURL + servicesEndpoint)
            .then(response => response.json())
            .then(data => {
                servicesData = data;
                console.log(servicesData); // Log services data for verification
                displayServices();
                loadCartFromStorage(); // Load cart data from localStorage
            })
            .catch(error => console.log(error));
    }

    // Display services on the webpage
    function displayServices() {
        const servicesContainer = document.getElementById("services");
        servicesContainer.innerHTML = ""; // Clear previous content

        servicesData.forEach(service => {
            const card = createServiceCard(service);
            servicesContainer.appendChild(card);
        });
    }

    // Create a service card element
    function createServiceCard(service) {
        const card = document.createElement("div");
        card.classList.add("service-card");

        const img = document.createElement("img");
        img.src = service.imageUrl;
        img.alt = service.name;
        card.appendChild(img);

        const name = document.createElement("h3");
        name.textContent = service.name;
        card.appendChild(name);

        const items = document.createElement("p");
        items.textContent = "Items: " + service.items;
        card.appendChild(items);

        const price = document.createElement("p");
        price.textContent = "Price: $" + service.price.toFixed(2);
        card.appendChild(price);

        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener("click", () => addToCart(service));
        card.appendChild(addToCartBtn);

        return card;
    }

    // Add item to cart
    function addToCart(item) {
        const foundItem = cartItems.find(cartItem => cartItem.id === item.id);
        if (foundItem) {
            // Increment quantity if item is already in cart
            foundItem.quantity++;
        } else {
            // Add new item to cart with quantity 1
            cartItems.push({ ...item, quantity: 1 });
        }
        updateCart();
        saveCartToStorage(); // Save cart data to localStorage
    }

    // Remove item from cart
    function removeFromCart(item) {
        const itemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (itemIndex !== -1) {
            cartItems.splice(itemIndex, 1);
            updateCart();
            saveCartToStorage(); // Save updated cart data to localStorage
        } else {
            console.log("Item not found in cart:", item);
        }
    }

    // Update cart UI
    function updateCart() {
        const cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = ""; // Clear previous content

        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", () => removeFromCart(item));
            li.appendChild(removeBtn);

            cartItemsContainer.appendChild(li);
        });

        updateCartTotal();
    }

    // Calculate and update cart total
    function updateCartTotal() {
        const cartTotalElement = document.getElementById("cart-total");
        const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        cartTotalElement.textContent = "$" + total.toFixed(2);
    }

    // Save cart data to localStorage
    function saveCartToStorage() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

    // Load cart data from localStorage
    function loadCartFromStorage() {
        const storedCart = localStorage.getItem("cartItems");
        if (storedCart) {
            cartItems = JSON.parse(storedCart);
            updateCart();
        }
    }
             //feedback form
    if (feedbackForm) {
        feedbackForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData("feedback-form");

            try {
                const response = await fetch(baseURL + reviewsEndpoint, {
                    method: "POST",
                    body: formData,
                });

                if (response.ok) {
                    confirmationMessage.style.display = "block";
                    feedbackForm.reset();

                    // Fetch and display updated feedback
                    fetchFeedback();
                } else {
                    console.error("Error submitting review:", response.statusText);
                    alert("Error submitting review. Please try again later.");
                }
            } catch (error) {
                console.error("Error submitting review:", error);
                alert("Error submitting review. Please try again later.");
            }
        });
    } else {
        console.error("Feedback form element not found!");
    }

    // Function to fetch and display feedback
    async function fetchFeedback() {
        try {
            const response = await fetch(baseURL + reviewsEndpoint);
            const feedbackData = await response.json();

            // Clear existing feedback items
            const feedbackList = document.getElementById("feedback-list");
            feedbackList.innerHTML = "";

            feedbackData.forEach(feedback => {
                const li = document.createElement("li");
                li.textContent = `${feedback.name} - ${feedback.rating}/5: ${feedback.feedback}`;
                feedbackList.appendChild(li);
            });
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    }

    // Initial fetch of feedback on page load
    fetchFeedback();

    // Checkout button click event
    const checkoutBtn = document.getElementById("checkout-btn");
    checkoutBtn.addEventListener("click", () => {
        // Implement checkout logic here
        alert("Thank you for requesting this service. A request message will pop up for you to complete your payment.");
    });

    document.addEventListener('keydown', function (event) {
        const key = event.key;

        // Scroll up when arrow up key is pressed
        if (key === 'ArrowUp') {
            window.scrollBy(0, -50); // Scroll up by 50 pixels
        }

        // Scroll down when arrow down key is pressed
        if (key === 'ArrowDown') {
            window.scrollBy(0, 50); // Scroll down by 50 pixels
        }
    });

    // Initialize the application
    function init() {
        fetchServices();
    }

    // Call init function to start the application
    init();
});

           