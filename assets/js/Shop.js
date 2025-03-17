const products = [
    {
        id: 1,
        name: "Mad Hippie Serum Liquid",
        price: 198,
        image: "assets/image/shop_1.png",
        description: "Soro rejuvenescedor com vitamina C e ácido hialurônico"
    },
    {
        id: 2,
        name: "Super Glowing Serum Liquid",
        price: 240,
        image: "assets/image/shop_2.png",
        description: "Soro iluminador com niacinamida e peptídeos"
    },
    {
        id: 3,
        name: "Wrinkle Body Lotion",
        price: 235,
        image: "assets/image/shop_3.png",
        description: "Loção corporal anti-idade com retinol e manteiga de karité"
    },
    {
        id: 4,
        name: "Margo Serum Liquid",
        price: 230,
        image: "assets/image/shop_4.png",
        description: "Soro facial multifuncional com ácido ferúlico"
    },
    {
        id: 5,
        name: "Margo Hair Oil",
        price: 234,
        image: "assets/image/shop_5.png",
        description: "Óleo capilar nutritivo com óleo de argan e jojoba"
    },
    {
        id: 6,
        name: "Margo Hair Gel",
        price: 235,
        image: "assets/image/shop_6.png",
        description: "Gel modelador com fixação forte e proteção UV"
    },
    {
        id: 7,
        name: "Glowing Face-Wash",
        price: 220,
        image: "assets/image/shop_7.png",
        description: "Sabonete facial iluminador com extrato de pérola"
    },
    {
        id: 8,
        name: "Margo Vitamin Serum",
        price: 215,
        image: "assets/image/shop_8.png",
        description: "Sérum vitamínico com complexo antioxidante"
    },
    {
        id: 14,
        name: "Margo Vitamin Serum",
        price: 215,
        image: "assets/image/shop_8.png",
        description: "Sérum vitamínico com complexo antioxidante"
    },
    {
        id: 15,
        name: "Margo Vitamin Serum",
        price: 215,
        image: "assets/image/shop_8.png",
        description: "Sérum vitamínico com complexo antioxidante"
    },
    {
        id: 16,
        name: "Margo Vitamin Serum",
        price: 215,
        image: "assets/image/shop_8.png",
        description: "Sérum vitamínico com complexo antioxidante"
    },
];

const productContainer = document.getElementById("productContainer");
const cartCount = document.querySelector(".cart-count");
const cartItems = document.querySelector(".cart-items");
const cartProductList = document.querySelector(".cart-product-list");
const emptyCartMessage = document.querySelector(".empty-cart");

// Seleciona todos os contadores de carrinho e listas de produtos
const cartCounts = document.querySelectorAll(".cart-count");
const cartItemsContainers = document.querySelectorAll(".cart-items");
const cartProductLists = document.querySelectorAll(".cart-product-list");
const emptyCartMessages = document.querySelectorAll(".empty-cart");

let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartUI();

document.addEventListener('click', function(event) {
    const cartIcon = event.target.closest('.icofont-shopping-cart');
    if (cartIcon) {
        event.preventDefault();
        const addToCartLink = cartIcon.closest('.add-to-cart');
        if (addToCartLink) {
            const productId = addToCartLink.dataset.id;
            const productName = addToCartLink.dataset.name;
            const productPrice = addToCartLink.dataset.price;
            const productImage = addToCartLink.dataset.image;
            
            addToCart(productId, productName, productPrice, productImage);
            return false; // Impede qualquer comportamento padrão adicional
        }
    }
});

function addToCart(productId, productName, productPrice, productImage) {
    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice), // Converter para número
            image: productImage,
            quantity: 1
        });
    }

    updateCartUI();
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Atualiza todos os elementos do carrinho em todas as visualizações
function updateAllCartUI() {
    // Atualiza todos os contadores
    cartCounts.forEach(counter => {
        counter.innerText = cart.reduce((total, item) => total + item.quantity, 0);
    });

    // Atualiza todas as listas de produtos do carrinho
    cartItemsContainers.forEach(container => {
        container.style.overflow = 'hidden';
        container.style.height = 'auto';
        container.style.maxHeight = '400px';
    });

    cartProductLists.forEach(productList => {
        productList.innerHTML = "";
        
        if (cart.length === 0) {
            emptyCartMessages.forEach(msg => msg.style.display = "block");
        } else {
            emptyCartMessages.forEach(msg => msg.style.display = "none");
            
            let totalAmount = 0;
            
            const productListContainer = document.createElement('div');
            productListContainer.style.maxHeight = '250px';
            productListContainer.style.overflowY = 'auto';
            productListContainer.style.overflowX = 'hidden';
            productListContainer.style.paddingRight = '5px';
            productListContainer.style.marginBottom = '0';
            
            cart.forEach((item, index) => {
                totalAmount += item.price * item.quantity;
                const li = document.createElement('li');
                li.classList.add('cart-item');
                li.style.display = 'flex';
                li.style.alignItems = 'flex-start';
                li.style.gap = '15px';
                li.style.padding = '10px';
                li.style.position = 'relative';
                
                li.innerHTML = `
                    <div class="cart-item-image" style="width: 60px; height: 60px; flex-shrink: 0;">
                        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: contain;">
                    </div>
                    <div class="cart-item-details" style="flex-grow: 1;">
                        <h4 style="margin: 0; font-weight: bold; font-size: 14px;">${item.name}</h4>
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 5px;">
                            <p style="margin: 0;">R$ ${item.price}</p>
                            <p style="margin: 0;">Qtd: ${item.quantity}</p>
                        </div>
                    </div>
                    <button onclick="removeFromCart('${item.id}')" style="
                        position: absolute;
                        right: 10px;
                        top: 35%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: #ff0000;
                        font-size: 16px;
                        cursor: pointer;
                        padding: 5px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    ">✕</button>
                `;
                
                productListContainer.appendChild(li);
                
                if (index < cart.length - 1) {
                    const hr = document.createElement('hr');
                    hr.style.margin = '5px 0';
                    hr.style.border = '0';
                    hr.style.borderTop = '1px solid #eee';
                    productListContainer.appendChild(hr);
                }
            });

            productList.appendChild(productListContainer);

            const totalDiv = document.createElement('div');
            totalDiv.style.borderTop = '2px solid #ddd';
            totalDiv.style.backgroundColor = 'white';
            totalDiv.style.padding = '10px';
            totalDiv.style.position = 'sticky';
            totalDiv.style.bottom = '0';
            totalDiv.style.left = '0';
            totalDiv.style.right = '0';
            totalDiv.style.width = '100%';
            
            totalDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <strong>Total:</strong>
                    <span>R$ ${totalAmount.toFixed(2)}</span>
                </div>
                <button onclick="finishPurchase()" style="
                    width: 100%;
                    padding: 10px;
                    background-color: #25D366;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-weight: bold;
                ">
                    Finalizar Compra!
                </button>
            `;
            
            productList.appendChild(totalDiv);
        }
    });
}

// Substituir a função updateCartUI original pela nova versão
function updateCartUI() {
    updateAllCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Modificar a mensagem do WhatsApp
function finishPurchase() {
    const whatsappNumber = "558584298948";
    
    const now = new Date();
    const hour = now.getHours();

    let greeting;
    if (hour < 12) {
        greeting = "Bom dia";
    } else if (hour < 18) {
        greeting = "Boa tarde";
    } else {
        greeting = "Boa noite";
    }

    let message = `${greeting}!\n\n*Gostaria de comprar esses produtos selecionados:*\n\n`;
    let total = 0;

    cart.forEach(item => {
        const price = parseFloat(item.price);
        const itemTotal = price * item.quantity;
        total += itemTotal;
        
        message += [
            `*${item.name}*`,
            `Quantidade: ${item.quantity}`,
            `Preço unitário: R$ ${price.toFixed(2)}`,
            `Subtotal: R$ ${itemTotal.toFixed(2)}`,
            '\n'
        ].join('\n');
    });

    message += [
        `*Total do Pedido: R$ ${total.toFixed(2)}*\n`,
        'Por favor, confirme o pedido e me informe sobre o frete e as opções de pagamento.'
    ].join('\n');

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');

    cart = [];
    localStorage.removeItem('cart');
    updateCartUI();
}

const bestSellingProducts = [
    {
        id: 9,
        name: "Mad Hippie Serum Liquid",
        price: 198,
        image: "assets/image/shop_1.png"
    },
    {
        id: 10,
        name: "Super Glowing Serum Liquid",
        price: 240,
        image: "assets/image/shop_2.png"
    },
    {
        id: 11,
        name: "Wrinkle Body Lotion",
        price: 235,
        image: "assets/image/shop_3.png"
    },
    {
        id: 12,
        name: "Margo Serum Liquid",
        price: 230,
        image: "assets/image/shop_4.png"
    },
    {
        id: 13,
        name: "Margo Hair Oil",
        price: 234,
        image: "assets/image/shop_5.png"
    }
];

const bestSellingContainer = document.getElementById("bestSellingContainer");

// Modificar renderização dos produtos mais vendidos
function renderBestSellingProducts() {
    if (!bestSellingContainer) return; // Evita o erro se o container não existir
    
    bestSellingContainer.innerHTML = '';
    bestSellingProducts.forEach(product => {
        const productHTML = `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="inner_shop_area shop_slide text-center">
                    <div class="inner_shop_img gm_shop">
                        <img src="${product.image}" alt="shopimg">
                        <div class="inner_shop_icons">
                            <a href="#" data-id="${product.id}"><i class="icofont-ui-love"></i></a>
                            <a href="#" class="add-to-cart" onclick="return false;" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                                <i class="icofont-shopping-cart"></i>
                            </a>
                            <a href="#" onclick="return false;"><i class="icofont-eye-alt"></i></a>
                        </div>
                    </div>
                    <div class="inner_shop_content gm_shop_content">
                        <h3><a href="single-shop.html">${product.name}</a></h3>
                        <p>R$ ${product.price}</p>
                        <div class="shop_icon">
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        bestSellingContainer.innerHTML += productHTML;
    });
}

// Variáveis de controle para paginação e filtros
let currentPage = 1;
let itemsPerPage = 8; // Mantém o valor padrão em 8 para corresponder à primeira opção
let filteredProducts = [...products];

// Função para ordenar produtos
function sortProducts(sortType) {
    switch(sortType) {
        case 'price_low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            filteredProducts = [...products];
    }
    currentPage = 1; // Reset para primeira página ao filtrar
    renderShopProducts();
}

// Função para atualizar items por página
function updateItemsPerPage(value) {
    itemsPerPage = parseInt(value);
    currentPage = 1;
    renderShopProducts();
}

// Função para criar paginação
function createPagination() {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'pagination-container';
    paginationContainer.style.textAlign = 'center';
    paginationContainer.style.marginTop = '20px';
    paginationContainer.style.marginBottom = '40px';

    let paginationHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const isActive = currentPage === i;
        paginationHTML += `
            <button 
                class="page-btn ${isActive ? 'active' : ''}" 
                onclick="changePage(${i})"
                style="
                    margin: 0 5px;
                    padding: 8px 12px;
                    cursor: pointer;
                    background: ${isActive ? '#fc3a79' : 'transparent'};
                    color: ${isActive ? 'white' : '#333'};
                    border: none;
                    font-family: 'Playfair Display', serif;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    min-width: 35px;
                "
                onmouseenter="if(!this.classList.contains('active')) { this.style.background = '#fc3a79'; this.style.color = 'white'; }"
                onmouseleave="if(!this.classList.contains('active')) { this.style.background = 'transparent'; this.style.color = '#333'; }"
            >${i}</button>
        `;
    }
    paginationContainer.innerHTML = paginationHTML;
    return paginationContainer;
}

// Função para mudar de página
function changePage(page) {
    currentPage = page;
    renderShopProducts();
}

// Modificar a função renderShopProducts
function renderShopProducts() {
    const gridContainer = document.getElementById('shop-grid-container');
    const listContainer = document.getElementById('shop-list-container');
    const resultsCount = document.querySelector('.inner_shop_title_left p');
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, filteredProducts.length);
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const totalProducts = filteredProducts.length;
    
    // Atualizar contador de resultados
    if (resultsCount) {
        if (totalProducts === 0) {
            resultsCount.textContent = "Nenhum resultado encontrado";
        } else {
            resultsCount.textContent = `Showing ${startIndex + 1}–${endIndex} of ${totalProducts} results`;
        }
    }

    // Renderiza os produtos na visualização em grade
    if (gridContainer) {
        gridContainer.innerHTML = paginatedProducts.map(product => `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="inner_shop_area text-center">
                    <div class="inner_shop_img single_shopgm">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="inner_shop_icons">
                            <a href="#" data-id="${product.id}"><i class="icofont-ui-love"></i></a>
                            <a href="#" class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                                <i class="icofont-shopping-cart"></i>
                            </a>
                            <a href="single-shop.html?id=${product.id}"><i class="icofont-eye-alt"></i></a>
                        </div>
                    </div>
                    <div class="inner_shop_content">
                        <h3><a href="single-shop.html?id=${product.id}">${product.name}</a></h3>
                        <p>R$ ${product.price}</p>
                    </div>
                    <div class="shop_icon">
                        <i class="icofont-star"></i>
                        <i class="icofont-star"></i>
                        <i class="icofont-star"></i>
                        <i class="icofont-star"></i>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Renderiza os produtos na visualização em lista
    if (listContainer) {
        listContainer.innerHTML = paginatedProducts.map(product => `
            <div class="col-lg-12 col-md-12 col-sm-12">
                <div class="tab_list_main">
                    <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-12">
                            <div class="tab_list_img">
                                <img src="${product.image}" alt="${product.name}">
                            </div>
                        </div>
                        <div class="col-lg-9 col-md-9 col-sm-12">
                            <div class="inner_tab_list_text">
                                <h3><a href="single-shop.html?id=${product.id}">${product.name}</a></h3>
                                <span>R$ ${product.price}</span>
                                <p>${product.description}</p>
                                <div class="tab_list_socail_icon">
                                    <a href="#" data-id="${product.id}"><i class="icofont-ui-love"></i></a>
                                    <a href="#" class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                                        <i class="icofont-shopping-cart"></i>
                                    </a>
                                   <a href="single-shop.html?id=${product.id}"><i class="icofont-eye-alt"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Adicionar paginação após a lista também
        const existingListPagination = listContainer.nextElementSibling;
        if (existingListPagination && existingListPagination.className === 'pagination-container') {
            existingListPagination.remove();
        }
        listContainer.after(createPagination());
    }

    // Atualizar a paginação para a visualização em grade
    if (gridContainer) {
        const existingGridPagination = gridContainer.nextElementSibling;
        if (existingGridPagination && existingGridPagination.className === 'pagination-container') {
            existingGridPagination.remove();
        }
        gridContainer.after(createPagination());
    }

    // Atualizar visibilidade da paginação baseado na tab ativa
    const activeTab = document.querySelector('.tab-pane.active.show');
    const allPaginationContainers = document.querySelectorAll('.pagination-container');
    
    allPaginationContainers.forEach(container => {
        if (activeTab && activeTab.contains(container.previousElementSibling)) {
            container.style.display = 'block';
        } else {
            container.style.display = 'none';
        }
    });
}

// Atualizar os event listeners no DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    // Verifica se está na página inicial (tem o container de best selling)
    if (document.getElementById("bestSellingContainer")) {
        renderBestSellingProducts();
    }
    
    // Verifica se está na página de shop (tem os containers de grid/list)
    if (document.getElementById("shop-grid-container") || document.getElementById("shop-list-container")) {
        renderShopProducts();
    }

    // Verifica se está na página de produtos (tem o container de produtos)
    if (document.getElementById("productContainer")) {
        const productContainer = document.getElementById("productContainer");
        // Pega os primeiros 4 produtos para mostrar como premium
        const premiumProducts = products.slice(0, 8);
        
        productContainer.innerHTML = premiumProducts.map(product => `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="inner_shop_area text-center">
                    <div class="inner_shop_img single_shopgm">
                        <img src="${product.image}" alt="${product.name}">
                        <div class="inner_shop_icons">
                            <a href="#" data-id="${product.id}"><i class="icofont-ui-love"></i></a>
                            <a href="#" class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                                <i class="icofont-shopping-cart"></i>
                            </a>
                            <a href="single-shop.html?id=${product.id}"><i class="icofont-eye-alt"></i></a>
                        </div>
                    </div>
                    <div class="inner_shop_content">
                        <h3><a href="single-shop.html?id=${product.id}">${product.name}</a></h3>
                        <p>R$ ${product.price.toFixed(2)}</p>
                        <div class="shop_icon">
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Listener para o select de ordenação
    const sortSelect = document.querySelector('.select_items');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortProducts(e.target.value);
        });
    }

    // Listener para o select de itens por página
    const itemsPerPageSelect = document.querySelector('.items-per-page');
    if (itemsPerPageSelect) {
        itemsPerPageSelect.value = itemsPerPage; // Define o valor inicial
        itemsPerPageSelect.addEventListener('change', (e) => {
            itemsPerPage = parseInt(e.target.value);
            currentPage = 1; // Reset para primeira página
            renderShopProducts();
        });
    }

    // Adicionar listeners para as mudanças de tab
    const tabLinks = document.querySelectorAll('[data-bs-toggle="tab"]');
    tabLinks.forEach(tab => {
        tab.addEventListener('shown.bs.tab', () => {
            renderShopProducts(); // Re-renderiza para atualizar a paginação
        });
    });
    
    // Adiciona carregamento do produto single
    if (window.location.pathname.includes('single-shop.html')) {
        loadSingleProduct();
    }
});

function renderProductCard(product) {
    return `
        <div class="col-lg-3 col-md-6 col-sm-12">
            <div class="inner_shop_area text-center">
                <div class="inner_shop_img single_shopgm">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="inner_shop_icons">
                        <a href="#" data-id="${product.id}"><i class="icofont-ui-love"></i></a>
                        <a href="#" class="add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                            <i class="icofont-shopping-cart"></i>
                        </a>
                        <a href="single-shop.html?id=${product.id}"><i class="icofont-eye-alt"></i></a>
                    </div>
                </div>
                <div class="inner_shop_content">
                    <h3><a href="single-shop.html?id=${product.id}">${product.name}</a></h3>
                    <p>R$ ${product.price}</p>
                </div>
                <div class="shop_icon">
                    <i class="icofont-star"></i>
                    <i class="icofont-star"></i>
                    <i class="icofont-star"></i>
                    <i class="icofont-star"></i>
                </div>
            </div>
        </div>
    `;
}

// Função para carregar produto na página single-shop
function loadSingleProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'shop.html';
        return;
    }

    const product = products.find(p => p.id === productId);
    if (!product) {
        window.location.href = 'shop.html';
        return;
    }

    // Atualiza o breadcrumb
    const breadcrumbTitle = document.querySelector('.inner_breadcum_area h1');
    const breadcrumbCurrent = document.querySelector('.inner_breadcum_area .current');
    if (breadcrumbTitle) breadcrumbTitle.textContent = product.name;
    if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.name;

    // Atualiza os detalhes do produto
    const productImage = document.querySelector('.prdc-pic img');
    const productTitle = document.querySelector('.sin_shop_right_content h2');
    const productPrice = document.querySelector('.sin_shop_right_content span');
    const productDescription = document.querySelector('.sin_shop_right_content p');
    const addToCartForm = document.querySelector('.shop_quenty');
    const reviewTitle = document.querySelector('.comment-reply-title');

    if (productImage) {
        productImage.src = product.image;
        productImage.alt = product.name;
    }
    if (productTitle) productTitle.textContent = product.name;
    if (productPrice) productPrice.textContent = `R$ ${product.price.toFixed(2)}`;
    if (productDescription) productDescription.textContent = product.description;
    if (reviewTitle) reviewTitle.innerHTML = `Seja o primeiro a avaliar "${product.name}" <small><a id="cancel-comment-reply-link" href="#" style="display:none;">Cancelar resposta</a></small>`;

    // Modifica o formulário para adicionar ao carrinho
    if (addToCartForm) {
        addToCartForm.onsubmit = (e) => {
            e.preventDefault();
            const quantity = parseInt(e.target.querySelector('input[type="number"]').value) || 1;
            
            // Repetir a adição ao carrinho conforme a quantidade
            for (let i = 0; i < quantity; i++) {
                addToCart(product.id.toString(), product.name, product.price, product.image);
            }
            
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #4CAF50;
                color: white;
                padding: 15px 25px;
                border-radius: 5px;
                z-index: 1000;
                animation: fadeInOut 2.5s ease;
            `;
            toast.textContent = `${quantity} produto(s) adicionado(s) ao carrinho!`;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.remove(), 2500);

            // Resetar o valor do input para 1
            e.target.querySelector('input[type="number"]').value = 1;
        };
    }

    // Carrega produtos semelhantes
    const relatedProducts = products
        .filter(p => p.id !== productId)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    const relatedContainer = document.querySelector('.shop_active');
    if (relatedContainer) {
        relatedContainer.innerHTML = relatedProducts.map(p => `
            <div class="col-lg-3 col-md-6 col-sm-12">
                <div class="inner_shop_area shop_slide text-center">
                    <div class="inner_shop_img gm_shop">
                        <img src="${p.image}" alt="${p.name}">
                        <div class="inner_shop_icons">
                            <a href="#" data-id="${p.id}"><i class="icofont-ui-love"></i></a>
                            <a href="#" class="add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-image="${p.image}">
                                <i class="icofont-shopping-cart"></i>
                            </a>
                            <a href="single-shop.html?id=${p.id}"><i class="icofont-eye-alt"></i></a>
                        </div>
                    </div>
                    <div class="inner_shop_content gm_shop_content">
                        <h3><a href="single-shop.html?id=${p.id}">${p.name}</a></h3>
                        <p>R$ ${p.price.toFixed(2)}</p>
                        <div class="shop_icon">
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                            <i class="icofont-star"></i>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Adicione este estilo ao final do arquivo
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translateY(20px); }
        10% { opacity: 1; transform: translateY(0); }
        90% { opacity: 1; transform: translateY(0); }
        100% { opacity: 0; transform: translateY(-20px); }
    }
`;
document.head.appendChild(style);
