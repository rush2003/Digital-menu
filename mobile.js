const categoriesContainer = document.querySelector('.categories-container');

// Define the categories data
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
        name: "Fries",
        image: "fries.png",
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
      id: 4,
      name: "Dessert",
      image: "dessert.png",
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
    id: 4,
    name: "Soups",
    image: "Soup.png",
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

// Function to generate categories
function generateCategories() {
  categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category');
      categoryDiv.innerHTML = `
          <img src="${category.image}" alt="${category.name}">
          <p>${category.name}</p>
      `;
      categoryDiv.setAttribute('data-subcategories', JSON.stringify(category.subcategories));
      categoriesContainer.appendChild(categoryDiv);
  });
}

// Generate categories
generateCategories();

// Get the subcategories container element
const subcategoriesContainer = document.querySelector('.subcategories-container');

categoriesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('category') || e.target.parentNode.classList.contains('category')) {
      const category = e.target.classList.contains('category') ? e.target : e.target.parentNode;
      const subcategories = category.getAttribute('data-subcategories');
      const subcategoriesArray = JSON.parse(subcategories);
      showSubcategories(subcategoriesArray);
  }
});

// Get the back button element
const backButton = document.querySelector('.back-button');

// Add an event listener to the back button
backButton.addEventListener('click', () => {
    // Hide the subcategories container
    subcategoriesContainer.style.display = 'none';

    // Show the categories container
    categoriesContainer.style.display = 'block';
});



// Function to show subcategories
function showSubcategories(subcategories) {
  // Hide the categories container
  categoriesContainer.style.display = 'none';

  // Hide the categories text
  document.querySelector('.categories-text').style.display = 'none';

  // Show the subcategories container
  subcategoriesContainer.style.display = 'block';

  // Generate the subcategories
  subcategoriesContainer.innerHTML = '';
  subcategories.forEach(subcategory => {
      const subcategoryDiv = document.createElement('div');
      subcategoryDiv.classList.add('subcategory');
      subcategoryDiv.innerHTML = `
          <img src="${subcategory.image}" alt="${subcategory.name}">
          <h3>${subcategory.name}</h3>
          <p>Price: ₹${subcategory.price}</p>
          <button class="add-to-cart">Add to Cart</button>
      `;
      subcategoriesContainer.appendChild(subcategoryDiv);
  });

  // Add event listener to add to cart button
  const addToCartButtonElements = subcategoriesContainer.querySelectorAll('.add-to-cart');
  addToCartButtonElements.forEach((button) => {
      button.addEventListener('click', () => {
          const productName = button.parentNode.querySelector('h3').textContent;
          const productPrice = parseFloat(button.parentNode.querySelector('p').textContent.split('₹')[1]);
          const product = {
              name: productName,
              price: productPrice,
          };
          addProductToCart(product);
      });
  });

  // Show the back button
  backButton.style.display = 'block';
}

// Add an event listener to each category
categoriesContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('category') || e.target.parentNode.classList.contains('category')) {
      const category = e.target.classList.contains('category') ? e.target : e.target.parentNode;
      const subcategories = category.getAttribute('data-subcategories');
      const subcategoriesArray = JSON.parse(subcategories);
      showSubcategories(subcategoriesArray);
  }
});

// Add an event listener to the back button
backButton.addEventListener('click', () => {
  // Hide the subcategories container
  subcategoriesContainer.style.display = 'none';

  // Show the categories container
  categoriesContainer.style.display = 'block';

  // Show the categories text
  document.querySelector('.categories-text').style.display = 'block';

  // Hide the back button
  backButton.style.display = 'none';
});



// Initialize cart variables
let cart = [];
let cartCount = 0;
let totalAmount = 0;

// Function to add product to cart
function addProductToCart(subcategory) {
  cart.push(subcategory);
  cartCount++;
  totalAmount += subcategory.price;
  updateCartCount();
  updateCartDetails();
  updateCartList();
}

// Function to update cart count
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
    cartCountElement.style.display = 'block';
}

function updateCartList() {
  const cartListElement = document.querySelector('.cart-list');
  cartListElement.innerHTML = '';
  cart.forEach((subcategory, index) => {
      const cartListItemElement = document.createElement('li');
      cartListItemElement.innerHTML = `
          <h3>${subcategory.name}</h3>
          <p>Price: ₹${subcategory.price}</p>
          <button class="remove-product">Remove</button>
      `;
      cartListElement.appendChild(cartListItemElement);
  });

  // Add event listener to remove product button
  const removeProductButtonElements = document.querySelectorAll('.remove-product');
  removeProductButtonElements.forEach((button) => {
      button.addEventListener('click', () => {
          const productName = button.parentNode.querySelector('h3').textContent;
          const productPrice = parseFloat(button.parentNode.querySelector('p').textContent.split('₹')[1]);
          const product = {
              name: productName,
              price: productPrice,
          };
          removeProductFromCart(product);
      });
  });
}

// Function to update cart details
function updateCartDetails() {
    const cartDetailsElement = document.querySelector('.cart-details');
    const totalAmountElement = cartDetailsElement.querySelector('p');
    if (totalAmountElement) {
        totalAmountElement.textContent = `Total Amount: ₹${totalAmount.toFixed(2)}`;
    }
    cartDetailsElement.style.display = 'block';
}

// Function to remove product from cart
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
const removeProductButtonElements = document.querySelectorAll('.remove-product');
    removeProductButtonElements.forEach((button) => {
        button.addEventListener('click', () => {
            const productName = button.parentNode.querySelector('h3').textContent;
            const productPrice = parseFloat(button.parentNode.querySelector('p').textContent.split('₹')[1]);
            const product = {
                name: productName,
                price: productPrice,
            };
            removeProductFromCart(product);
        });
    });

const addToCartButtonElements = document.querySelectorAll('.add-to-cart');
addToCartButtonElements.forEach((button) => {
    button.addEventListener('click', () => {
        const productName = button.parentNode.querySelector('h3').textContent;
        const productPrice = parseFloat(button.parentNode.querySelector('p').textContent.split('₹')[1]);
        const product = {
            name: productName,
            price: productPrice,
        };
        addProductToCart(product);
    });
});