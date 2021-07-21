class GoodsItem {
    constructor(product) {
        this.id_product = product.id_product,
        this.product_name = product.product_name,
        this.price = product.price,
        this.img = product.img
    }

    render() {
    return `<figure class="items__list-item" data-id="${this.id_product}">
        <img src=${this.img} alt="Item" width="360" height="420" class="items__list-img">
        <figcaption class="items__list-desc">
        <h4 class="items__list-heading">${this.product_name}</h4>
        <p class="items__list-text">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
        <p class="items__list-price">${this.price} RUB</p>
        <button class="buy-btn" data-id="${this.id_product}" data-name="${this.product_name}" data-price="${this.price}">Buy</button>
        </figcaption>
        </figure>`;
    }
}

class GoodsList {
    constructor (container = '.items__list') {
        this.container = container,
        this.goods = [],
        this.allProducts = [],
        this.fetchGoods()
    }

    fetchGoods() {
        this.goods = [
            {id_product: 1, product_name: 'Jacket', price: 4000, img: '/img/items/item1.jpg'},
            {id_product: 2, product_name: "Suit", price: 7000, img: "/img/items/item2.jpg"},
            {id_product: 3, product_name: "Hoodie", price: 2000, img: "/img/items/item3.jpg"},
            {id_product: 4, product_name: "Shirt", price: 1500, img: "/img/items/item4.jpg"},
            {id_product: 5, product_name: "Jacket", price: 3000, img: "/img/items/item5.jpg"},
            {id_product: 6, product_name: "Blouse", price: 2500, img: "/img/items/item6.jpg"},
        ]
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new GoodsItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render())
        }
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();