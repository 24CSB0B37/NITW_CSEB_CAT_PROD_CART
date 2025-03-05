class Product {
    constructor(id, name, price, image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image;
    }

    renderProduct() {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="images/${this.image}" alt="${this.name}">
            <div class="product-name">${this.name}</div>
            <div class="product-price">$${this.price}</div>
            <button class="add-to-cart" data-id="${this.id}" data-price="${this.price}" data-name="${this.name}" data-image="${this.image}">
                Add to Cart
            </button>
        `;
        return productElement;
    }
}

class Cart {
    constructor() {
        this.items = [];
        this.totalPrice = 0;
    }

    addToCart(product) {
        const existingProduct = this.items.find(item => item.id === product.id);
        
        if (existingProduct) {
            if (existingProduct.quantity < 4) {
                existingProduct.quantity++;
                this.totalPrice += product.price;
            } else {
                alert(`You cannot add more than 4 of "${product.name}" to your cart.`);
                return;
            }
        } else {
            product.quantity = 1;
            this.items.push(product);
            this.totalPrice += product.price;
        }
        
        this.updateCart();
    }

    updateCart() {
        const cartItemsList = document.getElementById('cart-items');
        cartItemsList.innerHTML = '';
        this.items.forEach((item, index) => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                <span>Item ${index + 1}: ${item.name} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
                <button class="increase-item" data-id="${item.id}">+</button>
                <button class="decrease-item" data-id="${item.id}">-</button>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            cartItemsList.appendChild(cartItem);
        });
        document.getElementById('total-price').textContent = this.totalPrice.toFixed(2);
    }

    increaseItem(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item && item.quantity < 4) {
            item.quantity++;
            this.totalPrice += item.price;
            this.updateCart();
        }
    }

    decreaseItem(itemId) {
        const item = this.items.find(item => item.id === itemId);
        if (item && item.quantity > 1) {
            item.quantity--;
            this.totalPrice -= item.price;
            this.updateCart();
        } else if (item && item.quantity === 1) {
            this.removeItem(itemId);
        }
    }

    removeItem(itemId) {
        const itemIndex = this.items.findIndex(item => item.id === itemId);
        if (itemIndex > -1) {
            this.totalPrice -= this.items[itemIndex].price * this.items[itemIndex].quantity;
            this.items.splice(itemIndex, 1);
            this.updateCart();
        }
    }
}

const cart = new Cart();
const products = [
    new Product(1, 'P de Voyage - Portable Piano', 3999.99, '1.jpg'),
    new Product(2, 'Product 2', 39.99, '2.jpg'),
    new Product(3, 'Product 3', 49.99, '3.jpg'),
    new Product(4, 'Product 4', 19.99, '4.jpg'),
    new Product(5, 'Product 5', 59.99, '5.jpg'),
    new Product(6, 'Product 6', 24.99, '6.jpg'),
    new Product(7, 'Product 7', 34.99, '7.jpg'),
    new Product(8, 'Product 8', 44.99, '8.jpg'),
    new Product(9, 'Product 9', 54.99, '9.jpg'),
    new Product(10, 'Product 10', 64.99, '10.jpg'),
    new Product(11, 'Product 11', 74.99, '11.jpg'),
    new Product(12, 'Product 12', 84.99, '12.jpg'),
    new Product(13, 'Product 13', 94.99, '13.jpg'),
    new Product(14, 'Product 14', 104.99, '14.jpg'),
    new Product(15, 'Product 15', 114.99, '15.jpg'),
    new Product(16, 'Product 16', 124.99, '16.jpg'),
    new Product(17, 'Product 17', 134.99, '17.jpg'),
    new Product(18, 'Product 18', 144.99, '18.jpg'),
    new Product(19, 'Product 19', 154.99, '19.jpg'),
    new Product(20, 'Product 20', 164.99, '20.jpg')
];

const productsContainer = document.getElementById('products-container');
products.forEach(product => {
    productsContainer.appendChild(product.renderProduct());
});

document.getElementById('products-container').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const productName = e.target.getAttribute('data-name');
        const productPrice = parseFloat(e.target.getAttribute('data-price'));
        const productImage = e.target.getAttribute('data-image');
        const product = new Product(productId, productName, productPrice, productImage);
        cart.addToCart(product);
    }
});

document.getElementById('cart-items').addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('remove-item')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart.removeItem(productId);
    } else if (e.target && e.target.classList.contains('increase-item')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart.increaseItem(productId);
    } else if (e.target && e.target.classList.contains('decrease-item')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart.decreaseItem(productId);
    }
});

const modal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeModal = document.getElementById('closeModal');

loginBtn.onclick = function() {
    modal.classList.add('show');
}

closeModal.onclick = function() {
    modal.classList.remove('show');
}

window.onclick = function(event) {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
}
