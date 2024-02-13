const container = document.querySelector(".container");
const primaryNav = document.querySelector(".nav__list");
const toggleButton = document.querySelector(".nav-toggle");

toggleButton.addEventListener("click", () => {
    const isExpanded = primaryNav.getAttribute("aria-expanded");
    primaryNav.setAttribute(
        "aria-expanded",
        isExpanded === "false" ? "true" : "false"
    );
});

container.addEventListener("click", (e) => {
    if (!primaryNav.contains(e.target) && !toggleButton.contains(e.target)) {
        primaryNav.setAttribute("aria-expanded", "false");
    }
});

// JavaScript to handle currency change
const currencyDropdown = document.querySelector('.dropdown-content');
const currencyButtons = currencyDropdown.querySelectorAll('a');

currencyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedCurrency = button.getAttribute('data-currency');
        updateCurrency(selectedCurrency);
    });
});

function updateCurrency(currency) {
  // Define exchange rates or conversion logic for different currencies
  const exchangeRates = {
      'INR': 1,  // 1 INR = 1
      'USD': 0.014,  // Example exchange rate, replace with actual rates
      'GBP': 0.011,
      'EUR': 0.012
  };

  // Get the base currency (INR) amount from the amount element
  const baseCurrencyAmounts = document.querySelectorAll('.base-currency-amount'); // Assuming amount elements have a class 'base-currency-amount'
  baseCurrencyAmounts.forEach(amount => {
      const baseAmount = parseFloat(amount.textContent.trim()); // Get the current amount value as a floating-point number

      // Convert the amount to the selected currency
      const convertedAmount = baseAmount * exchangeRates[currency];

      // Update the text content of the amount element with the converted amount
      amount.textContent = convertedAmount.toFixed(2); // Assuming you want to display the amount with 2 decimal places
  });
}



document.addEventListener("DOMContentLoaded", function () {
  const products = [
    { id: 1, name: "SHADOWTECH ECLIPSE SNEAKERS", price: 2500 },
    { id: 2, name: "NEONOIR VANGUARD BOOTS", price: 3000 },
    { id: 3, name: "CYBERGOTH STEALTH KICKS", price: 3500 },
    { id: 4, name: "Air Jordan 1 1985", price: 4000 },
    { id: 5, name: "Nike Air Force 1", price: 4500 },
    { id: 6, name: "Adidas Yeezy 350 V1", price: 5000 },
    { id: 7, name: "Adidas Basketball Forum 1984", price: 5500 },
    { id: 8, name: "Converse Chuck Taylor All Star", price: 6000 },
  ];

  const productList = document.getElementById("productList");
  const shoppingCart = document.getElementById("shoppingCart");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const totalPrice = document.getElementById("totalPrice");
  const checkoutButton = document.getElementById("checkoutButton");
  const noProductsMsg = document.getElementById("noProductsMsg");

  let cart = [];

  function createButton(text, onClick) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
  }

  function renderProductList() {
    const productListUl = productList.querySelector("ul");
    productListUl.innerHTML = "";
  
    products.forEach((product) => {
      const li = document.createElement("li");
      li.className = "product-item";
  
      const img = document.createElement("img");
      img.src = `./assets/product_${product.id}.jpg`; // Assuming product images are named like product_1.jpg, product_2.jpg, etc.
      img.alt = product.name;
      img.className = "product-image"; // Add a class for styling
  
      const productName = document.createElement("span");
      productName.textContent = product.name;
      productName.className = "product-name";
  
      const productPrice = document.createElement("span");
      productPrice.textContent = `${product.price} INR`;
      productPrice.className = "product-price";
  
      const countDiv = document.createElement("div");
      countDiv.className = "product-count"; 
      const removeButton = createButton("-", () => removeFromCart(product));
      const countSpan = document.createElement("span");
      countSpan.textContent = 0;
      countSpan.id = `product-${product.id}-count`;
      const addButton = createButton("+", () => addToCart(product));
      countDiv.appendChild(removeButton);
      countDiv.appendChild(countSpan);
      countDiv.appendChild(addButton);
  
      li.appendChild(img);
      li.appendChild(productName);
      li.appendChild(productPrice);
      li.appendChild(countDiv); // Append the div containing +/- buttons and count
      productListUl.appendChild(li);
    });
  }

  function renderShoppingCart() {
    const cartItemsUl = cartItems;
    cartItemsUl.innerHTML = "";

    let totalPriceVal = 0;
    let cartIsEmpty = true;

    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.product.id);

      if (cartItem.quantity > 0) {
        const li = document.createElement("li");
        li.textContent = `${product.name} - ${cartItem.quantity} x ${
          product.price
        } INR = ${cartItem.quantity * product.price} INR`;
        cartItemsUl.appendChild(li);

        totalPriceVal += cartItem.quantity * product.price;
        cartIsEmpty = false;
      }
    });

    if (!cartIsEmpty) {
      noProductsMsg.classList.add("hidden");
      totalPrice.textContent = `${totalPriceVal.toFixed(2)} INR`;
      cartTotal.classList.remove("hidden");
      checkoutButton.classList.remove("hidden");
    } else {
      noProductsMsg.classList.remove("hidden");
      checkoutButton.classList.add("hidden");
      cartTotal.classList.add("hidden");
    }
  }

  function addToCart(product) {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ product, quantity: 1 });
    }

    const countSpan = document.getElementById(`product-${product.id}-count`);
    if (countSpan) {
      countSpan.textContent = existingItem ? existingItem.quantity : 1;
    }

    renderShoppingCart();
  }

  function removeFromCart(product) {
    const existingItem = cart.find((item) => item.product.id === product.id);
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity -= 1;
    }

    const countSpan = document.getElementById(`product-${product.id}-count`);
    if (countSpan) {
      countSpan.textContent = existingItem ? existingItem.quantity : 0;
    }

    renderShoppingCart();
  }

  checkoutButton.addEventListener("click", function () {
    var options = {
      key: "rzp_test_BkPuVhFTbH4Y03", 
      amount: calculateTotalPrice() * 100, 
      currency: "INR",
      name: "Sourasish's Shop",
      description: "Geekathon",
      image: "./assets/logo.png", 
      handler: function (response) {
        savetoDB(response);
        $("#myModal").modal();
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      notes: {
        address: "note value",
      },
      theme: {
        color: "#000000",
      },
    };
    var propay = new Razorpay(options);
    propay.open();
  });

  function calculateTotalPrice() {
    let totalPriceVal = 0;
    cart.forEach((cartItem) => {
      const product = products.find((p) => p.id === cartItem.product.id);
      if (cartItem.quantity > 0) {
        totalPriceVal += cartItem.quantity * product.price;
      }
    });
    return totalPriceVal;
  }

  renderProductList();
  renderShoppingCart();
});
