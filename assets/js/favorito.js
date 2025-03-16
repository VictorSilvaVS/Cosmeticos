let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateFavoriteUI();

    document.addEventListener('click', (e) => {
        const heartIcon = e.target.closest('.icofont-ui-love');
        if (heartIcon) {
            e.preventDefault();
            const productId = heartIcon.closest('a').getAttribute('data-id');
            const favoriteLink = heartIcon.closest('a');
            const productCard = heartIcon.closest('.inner_shop_area');
            toggleFavorite(productId, favoriteLink, productCard);
        }
    });
});

function toggleFavorite(productId, favoriteLink, productCard) {
    const index = favorites.indexOf(productId);
    
    if (index === -1) {
        favorites.push(productId);
        const heartIcon = favoriteLink.querySelector('.icofont-ui-love');
        if (heartIcon) {
            favoriteLink.style.backgroundColor = '#fff';
            favoriteLink.style.color = '#000';
        }
        productCard.classList.add('favorited');

        const shopImg = productCard.querySelector('.inner_shop_img');
        const shopContent = productCard.querySelector('.inner_shop_content');
        
        if (shopImg.classList.contains('gm_shop')) {
            shopContent.style.backgroundColor = '#FDF3EA';
            shopContent.style.borderColor = 'transparent';
            shopImg.style.borderColor = 'transparent';
        } else {
            shopImg.style.backgroundColor = '#fff';
            shopImg.style.borderColor = 'transparent';
        }
    } else {
        favorites.splice(index, 1);
        const heartIcon = favoriteLink.querySelector('.icofont-ui-love');
        if (heartIcon) {
            favoriteLink.style.backgroundColor = '';
            favoriteLink.style.color = '';
        }
        productCard.classList.remove('favorited');

        const shopImg = productCard.querySelector('.inner_shop_img');
        const shopContent = productCard.querySelector('.inner_shop_content');
        
        if (shopImg.classList.contains('gm_shop')) {
            shopContent.style.backgroundColor = '';
            shopContent.style.borderColor = '';
            shopImg.style.borderColor = '#FDF3EA';
        } else {
            shopImg.style.backgroundColor = '';
            shopImg.style.borderColor = '#FDF3EA';
        }
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateFavoriteUI() {
    favorites.forEach(productId => {
        const favoriteLinks = document.querySelectorAll(`a[data-id="${productId}"]`);
        favoriteLinks.forEach(link => {
            const heartIcon = link.querySelector('.icofont-ui-love');
            if (!heartIcon) return;
            
            const productCard = link.closest('.inner_shop_area');
            if (link && productCard) {
                link.style.backgroundColor = '#fff';
                link.style.color = '#000';
                productCard.classList.add('favorited');

                const shopImg = productCard.querySelector('.inner_shop_img');
                const shopContent = productCard.querySelector('.inner_shop_content');
                
                if (shopImg.classList.contains('gm_shop')) {
                    shopContent.style.backgroundColor = '#FDF3EA';
                    shopContent.style.borderColor = 'transparent';
                    shopImg.style.borderColor = 'transparent';
                } else {
                    shopImg.style.backgroundColor = '#fff';
                    shopImg.style.borderColor = 'transparent';
                }
            }
        });
    });
}
