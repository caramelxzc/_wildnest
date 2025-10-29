document.addEventListener('DOMContentLoaded', function() {

    //For Search ==========================================//
    document.addEventListener('click', function(event) {

        if (event.target.closest('.nav-search')) {
            document.querySelector('.search-bar').classList.add('search-bar-active');
        } else if (event.target.closest('.search-cancel')) {
            document.querySelector('.search-bar').classList.remove('search-bar-active');
        }

    });

    //For Login and SignUp =================================//
    document.addEventListener('click', function(event) {
        const formElement = document.querySelector('.form');
        //check if the clicked element has the class 'nav-user' or 'already-account'
        if (event.target.closest('.nav-user, .already-account')) {
            formElement.classList.add('login-active');
            formElement.classList.remove('sign-up-active');
        }
        //check if the clicked element has the class 'sign-up-btn'
        else if (event.target.closest('.sign-up-btn')) {
            formElement.classList.remove('login-active');
            formElement.classList.add('sign-up-active');
        }
        //click close btn
        else if (event.target.closest('.form-cancel')) {
            formElement.classList.remove('login-active');
            formElement.classList.remove('sign-up-active');
        }
    })

    //For Fix Header =========================//
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;

        //check if the top
        if (currentScrollY === 0) {
            header.classList.remove('header-fix');
        } else if (currentScrollY < lastScrollY) {
            header.classList.add('header-fix');
        } else {
            header.classList.remove('header-fix');
        }
        lastScrollY = currentScrollY;
    });

    let cart = [];
    let totalPrice = 0;

    function addToCart(button) {
        const productName = button.getAttribute('data-name');
        const productPrice = parseFloat(button.getAttribute('data-price'));

        // Tambahkan produk ke keranjang
        cart.push({ name: productName, price: productPrice });
        totalPrice += productPrice;

        // Perbarui tampilan keranjang
        updateCart();
    }

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        // Kosongkan daftar keranjang
        cartItems.innerHTML = '';

        // Tambahkan setiap item ke daftar keranjang
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
        });

        // Perbarui total harga
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    }


});

function scrollBlog(direction) {
    const container = document.getElementById('blogContainer');
    const scrollAmount = container.querySelector('.blog-box').offsetWidth + 760;
  
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
  
    if (direction === 'left') {
      if (container.scrollLeft === 0) {
        // Jika sudah di paling kiri, lompat ke paling kanan
        container.scrollTo({ left: maxScrollLeft, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (container.scrollLeft >= maxScrollLeft - 5) {
        // Jika sudah di paling kanan (dengan toleransi), lompat ke paling kiri
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }
  
  const products = [
    { name: "Tenda Camping", price: 89.00 },
    { name: "Tas Carrier", price: 45.00 }
];

const productList = document.getElementById('product-list');

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product-box';
    productDiv.innerHTML = `
        <div class="product-box-img" style="background: #fff;">
            <img src="images/tnda4.png" alt="${product.name}" />
        </div>
        <div class="product-box-text">
            <a class="product-text-title">${product.name}</a>
            <span>$${product.price.toFixed(2)}</span>
            <a href="#" class="product-cart-btn" onclick="addToCart(this)" data-name="${product.name}" data-price="${product.price}">
                Tambah ke Keranjang
            </a>
        </div>
    `;
    productList.appendChild(productDiv);
});
