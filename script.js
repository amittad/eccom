document.addEventListener("DOMContentLoaded", () => {
    const catalog = document.getElementById('catalog');
    const cartCount = document.getElementById('cart-count');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    const deliveryForm = document.getElementById('delivery-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    const clothingItems = [
        { id: 1, name: "T-Shirt", price: 20, img: "https://via.placeholder.com/200" },
        { id: 2, name: "Jeans", price: 40, img: "https://via.placeholder.com/200" },
        { id: 3, name: "Jacket", price: 60, img: "https://via.placeholder.com/200" },
        { id: 4, name: "Sneakers", price: 80, img: "https://via.placeholder.com/200" }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCatalog() {
        if (catalog) {
            clothingItems.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item');
                
                itemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>$${item.price}</p>
                    <button onclick="addToCart(${item.id})">Add to Cart</button>
                `;
                
                catalog.appendChild(itemDiv);
            });
        }
    }

    function renderCart() {
        if (cartItemsContainer && totalAmount) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            cart.forEach(item => {
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('item');
                
                cartItemDiv.innerHTML = `
                    <img src="${item.img}" alt="${item.name}">
                    <h2>${item.name}</h2>
                    <p>$${item.price}</p>
                `;
                
                cartItemsContainer.appendChild(cartItemDiv);
                total += item.price;
            });
            totalAmount.textContent = total;
        }
    }

    window.addToCart = function(id) {
        const item = clothingItems.find(item => item.id === id);
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        cartCount.textContent = cart.length;
    }

    if (cartCount) {
        cartCount.textContent = cart.length;
    }

    if (deliveryForm) {
        deliveryForm.addEventListener('submit', function(event) {
            event.preventDefault();
            confirmationMessage.style.display = 'block';
            deliveryForm.style.display = 'none';
            localStorage.removeItem('cart');
            cart = [];
        });
    }

    renderCatalog();
    renderCart();
});
