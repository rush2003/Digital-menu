// Define categories and subcategories data
const categories = [
    {
        id: 1,
        name: "Burger",
        image: "burger.png",
        subcategories: [
            {
                id: 1,
                name: "Cheeseburger",
                price: 199,
                image: "cheeseburger.png"
            },
            {
                id: 2,
                name: "Chicken burger",
                price: 199,
                image: "chickenburger.png"
            }
        ]
    },
    {
        id: 2,
        name: "Pizza",
        image: "pizza.png",
        subcategories: [
            {
                id: 1,
                name: "Margherita",
                price: 299,
                image: "margheritapizza.png"
            },
            {
                id: 2,
                name: "Cheese Pizza",
                price: 399,
                image: "cheesepizza.jpg"
            }
        ]
    },
    {
        id: 3,
        name: "Sandwiches",
        image: "sandwich.png",
        subcategories: [
            {
                id: 1,
                name: "Club Sandwich",
                price: 199,
                image: "clubsandwich.png"
            },
            {
                id: 2,
                name: "Grilled Cheese Sandwich",
                price: 199,
                image: "grilledcheesesandwich.png"
            }
        ]
    },
    {
        id: 4,
        name: "Drinks",
        image: "drink.png",
        subcategories: [
            {
                id: 1,
                name: "Mojito",
                price: 199,
                image: "mojito.png"
            },
            {
                id: 2,
                name: "Cola",
                price: 199,
                image: "cola.png"
            }
        ]
    },
    {
        id: 5,
        name: "Wraps",
        image: "wrap.png",
        subcategories: [
            {
                id: 1,
                name: "Chicken Wrap",
                price: 149,
                image: "chickenwrap.png"
            },
            {
                id: 2,
                name: "Veggie Wrap",
                price: 149,
                image: "wrapveg.jpg"
            }
        ]
    }
];

// Function to display categories
function displayCategories() {
    const categoriesContainer = document.querySelector('.categories-container');
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');
        categoryDiv.innerHTML = `
            <img src="${category.image}" alt="${category.name}" width="50" height="50">
            <p>${category.name}</p>
        `;
        categoryDiv.onclick = () => displaySubcategories(category.subcategories);
        categoriesContainer.appendChild(categoryDiv);
    });
}



// Function to display subcategories
function displaySubcategories(subcategories) {
    const subcategoriesContainer = document.querySelector('.subcategories-container');
    subcategoriesContainer.innerHTML = ''; // Clear previous subcategories
    subcategories.forEach(subcategory => {
        const subcategoryDiv = document.createElement('div');
        subcategoryDiv.classList.add('subcategory');
        subcategoryDiv.innerHTML = `
            <img src="${subcategory.image}" alt="${subcategory.name}">
            <h3>${subcategory.name}</h3>
            <p>Price:  ₹${subcategory.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;
        subcategoriesContainer.appendChild(subcategoryDiv);
    });
}

// Initialize the categories display
displayCategories();
 

/// Category selection page
const categorySelection = document.querySelector('.category-selection');
const categoriesContainer = document.querySelector('.categories-container');

// Subcategory page
const subcategoryPage = document.querySelector('.subcategory-page');
const subcategoriesContainer = document.querySelector('.subcategories-container');






// Initialize cart variables
let cart = [];
let cartCount = 0;
let totalAmount = 0;

function addProductToCart(subcategory) {
    cart.push(subcategory);
    cartCount++;
    totalAmount += subcategory.price;
    updateCartCount();
    updateCartDetails();
}

function displaySubcategories(subcategories) {
    const subcategoriesContainer = document.querySelector('.subcategories-container');
    subcategoriesContainer.innerHTML = ''; // Clear previous subcategories
    subcategories.forEach(subcategory => {
        const subcategoryDiv = document.createElement('div');
        subcategoryDiv.classList.add('subcategory');
        subcategoryDiv.innerHTML = `
            <img src="${subcategory.image}" alt="${subcategory.name}">
            <h3>${subcategory.name}</h3>
            <p>Price:  ₹${subcategory.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;
        subcategoriesContainer.appendChild(subcategoryDiv);

        // Add event listener to the button
        const addButton = subcategoryDiv.querySelector('button');
        addButton.addEventListener('click', () => {
            const subcategoryName = subcategory.name;
            const subcategoryPrice = subcategory.price;
            const subcategoryObject = {
                name: subcategoryName,
                price: subcategoryPrice
            };
            addProductToCart(subcategoryObject);
            updateCartList();
            updateCartCount();
        });
    });
}

function updateCartList() {
    const cartDetailsElement = document.querySelector('.cart-details');
    let cartListElement = cartDetailsElement.querySelector('.cart-list');
    if (!cartListElement) {
        cartListElement = document.createElement('ul');
        cartListElement.classList.add('cart-list');
        cartDetailsElement.appendChild(cartListElement);
    }
    cartListElement.innerHTML = '';
    cart.forEach((subcategory, index) => {
        const cartListItemElement = document.createElement('li');
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => {
            removeProductFromCart(subcategory);
        };
        cartListItemElement.appendChild(removeButton);
        cartListItemElement.appendChild(document.createTextNode(` ${subcategory.name} - ₹${subcategory.price}`));
        cartListElement.appendChild(cartListItemElement);
    });
}
// Function to update cart count
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = 'block';
}

// Function to update cart details
// Function to update cart details
function updateCartDetails() {
    const cartDetailsElement = document.querySelector('.cart-details');
    const totalAmountElement = cartDetailsElement.querySelector('p');
    if (totalAmountElement) {
        totalAmountElement.textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
    }
    cartDetailsElement.style.display = 'block';
}

function removeProductFromCart(product) {
    const index = cart.findIndex((item) => item.name === product.name && item.price === product.price);
    if (index !== -1) {
        cart.splice(index, 1);
        cartCount--;
        totalAmount -= product.price;
        updateCartCount();
        updateCartDetails();
        updateCartList();
    }
}
// Add event listener to cart icon
const cartIconElement = document.querySelector('.cart-icon');
cartIconElement.addEventListener('click', () => {
    const cartDetailsElement = document.querySelector('.cart-details');
    cartDetailsElement.style.display = 'block';
});

// Add event listener to close cart button
const closeCartButtonElement = document.querySelector('.close-cart');
closeCartButtonElement.addEventListener('click', () => {
    const cartDetailsElement = document.querySelector('.cart-details');
    cartDetailsElement.style.display = 'none';
});

// Add event listener to remove product button
const closeCartButton = document.querySelector('.close-cart');

if (closeCartButton) {
  closeCartButton.addEventListener('click', () => {
    const cartDetailsElement = document.querySelector('.cart-details');
    cartDetailsElement.style.display = 'none';
  });
}


// Modify subcategory button to add product to cart
const subcategoryButtonElements = document.querySelectorAll('.subcategory button');
if (subcategoryButtonElements) {
    subcategoryButtonElements.forEach((button) => {
        button.textContent = 'Add to Cart';
        if (button.addEventListener) {
            button.addEventListener('click', () => {
                const subcategoryName = button.parentNode.querySelector('h3').textContent;
                const subcategoryPrice = parseFloat(button.parentNode.querySelector('p').textContent.split('₹')[1]);
                const subcategoryObject = {
                    name: subcategoryName,
                    price: subcategoryPrice
                };
                addProductToCart(subcategoryObject);
                // Removed the line that opens the cart details
            });
        }
    });
}


