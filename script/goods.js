function createProduct(product) {
    return {
        product_name: product.product_name,
        price: product.price,
        id_product: product.id_product,
        img: product.img,

        createTemplate() {
            return `<figure class="items__list-item" data-id="${this.id_product}">
            <img src=${this.img} alt="Item" width="360" height="420" class="items__list-img">

            <div class="items__list-cover">
            <button class="buy-btn" 
            name="buy-btn" 
            data-id="${this.id_product}" 
            data-name="${this.product_name}" 
            data-price="${this.price}"
            data-img="${this.img}">Add to Cart</button>
            </div>
            
            <figcaption class="items__list-desc">
            <h4 class="items__list-heading">${this.product_name}</h4>
            <p class="items__list-text">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
            <p class="items__list-price">${this.price} RUB</p>
            </figcaption>
            </figure>`
        }
    }
}

let catalog = {
    items: [],
    container: '.items__list',
    cart: null,
    catalogUrl: 'https://raw.githubusercontent.com/polly-cloud/shop/goods/goods/productData.json',

    init() {
        this.items = [];
        this.cart = cart;
        this.getData(this.catalogUrl)
            .finally(() => {
                this._fetchItems()
                this._render()
            })
        
        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name == 'buy-btn') {
                this.cart.addProduct(evt.target.dataset);
            }
        })   
    },

    getData(url) {
        return fetch(url)
            .then(data => data.json())
            .then((data2) => {this.items = data2})
    },

    _fetchItems() {
        let arr = [];

        this.items.forEach(item => {
            arr.push(createProduct(item))
        })
        console.log(arr);
        this.items = arr;
    },

    _render() {
        let container = document.querySelector(this.container);
        let domString = '';

        this.items.forEach (item => {
            domString += item.createTemplate();
        })
        container.innerHTML = domString;
    }
}

let cart = {
    items: [],
    shown: false,
    sum: 0,
    qua: 0,
    container: '.cart-block',
    itemsContainer: '.cart-items',
    
    init() {
        document.querySelector('#toggle-cart').addEventListener('click', () => {
            cart.shown = !cart.shown;
            cart.render();
            document.querySelector('.cart-block').classList.toggle('invisible');
        })

        document.querySelector(this.container).addEventListener('click', evt => {
            if (evt.target.name == 'del-btn') {
                this.removeProduct(evt.target.dataset.id)
            }
        })
    },

    render() {
        let container = document.querySelector(this.itemsContainer);
        let domString = '';

        this.items.forEach(item => {
            domString += item.createTemplate()
        })

        container.innerHTML = domString;

        document.querySelector ('#tot-sum').innerHTML = `${this.sum} RUB`
        document.querySelector ('#tot-qua').innerHTML = this.qua

    },

addProduct(product) {
        let find = this.items.find(item => item.id_product === product.id);
        let empty = document.querySelector('.cart-block-empty');

        if (!find) {
            this.items.push(createCartItem (product.id, product.name, product.price, product.img));
        } else {
            find.quantity++;
        }

        if (cart.items.length > 0) {
            empty.classList.add('invisible')
        } 

        this.checkTotal();
        this.render();
    },

    removeProduct(id) {
        let find = this.items.find (item => item.id_product === id);
        let empty = document.querySelector('.cart-block-empty');

        if (find.quantity === 1) {
            this.items.splice(this.items.indexOf(find), 1);
        } else {
            find.quantity--;
        }

        if (cart.items.length == 0) {
            empty.classList.remove('invisible')
        }
        this.checkTotal();
        this.render();
    },

    checkTotal() {
        let s = 0;
        let q = 0;

        this.items.forEach( item => {
            q += item.quantity;
            s += item.quantity * item.price;
        })

        this.sum = s;
        this.qua = q
    }
}

function createCartItem (id, name, price, img) {
    return {
        id_product: id,
        price: price,
        product_name: name,
        quantity: 1,
        img: img,
        createTemplate() {
            return `
            <div class="cart-item" data-id="${this.id_product}">
                    <div class="product__bio">
                        <img src="${this.img}" width="100" height="100" alt="${this.product_name}" class="cart-item-img">
                        <div class="product__desc">
                            <h4 class="product__heading">${this.product_name}</h4>
                            <p class="product__quantity">Quantity: ${this.quantity}</p>
                            <p class="product__price">Price: ${this.price} RUB</p>
                            <p class="product__totalprice">Total: ${this.price * this.quantity} RUB</p>
                        </div>
                        <button name="del-btn" class="product__del-btn" data-id="${this.id_product}">&times;</button>
                    </div>
                </div>`
        }
    }
}



cart.init();
catalog.init();




// class List {
//     constructor (container, list = list2) {
//         this.container = container; //блок, в который будем все складывать
//         this.list = list; // для воссоединения с корзиной
//         this.goods = []; // список товаров
//         this.allProducts = []; //список в корзине??
//     }

//     handleData() {  // распаковка товаров и вывод на экран
//         this.goods = [
//             {id_product: 1, product_name: 'Jacket', price: 4000, img: '/img/items/item1.jpg'},
//             {id_product: 2, product_name: "Suit", price: 7000, img: "/img/items/item2.jpg"},
//             {id_product: 3, product_name: "Hoodie", price: 2000, img: "/img/items/item3.jpg"},
//             {id_product: 4, product_name: "Shirt", price: 1500, img: "/img/items/item4.jpg"},
//             {id_product: 5, product_name: "Jacket", price: 3000, img: "/img/items/item5.jpg"},
//             {id_product: 6, product_name: "Blouse", price: 2500, img: "/img/items/item6.jpg"},
//         ];
//         this.render();          
//     }

//     render() { //верстка всех товаров
//         const block = document.querySelector(this.container); //берем блок

//         for (let product of this.goods) {
//         // console.log(this.constructor.name);
//         const productObj = new this.list[this.constructor.name](product);
//         // this.list - название классов - либо корзина либо список товаров    (свойства)
//         //this.constructor.name - имя конструктора Класса (значение)
//         // product - эл. цикла
//         //объект товара либо CartItem, либо ProductItem
//         // console.log(productObj);
//         this.allProducts.push(productObj);
//         block.insertAdjacentHTML('beforeend', productObj.render());
//         }
//     }

//     getSum() {
//         let res=this.allProducts.reduce((sum, item)=> sum +=item.price, 0);
//         // console.log(res);
//       }
// }

// class Item {
//     constructor (product) {
//         this.id_product = product.id_product,
//         this.price = product.price,
//         this.img = product.img
//         this.product_name = product.product_name
//     }

//     render() { // генерируем карточку товара
//         return `<figure class="items__list-item" data-id="${this.id_product}">
//         <img src=${this.img} alt="Item" width="360" height="420" class="items__list-img">
//         <figcaption class="items__list-desc">
//         <h4 class="items__list-heading">${this.product_name}</h4>
//         <p class="items__list-text">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
//         <p class="items__list-price">${this.price} RUB</p>
//         <button class="buy-btn" data-id="${this.id_product}" data-name="${this.product_name}" data-price="${this.price}">Buy</button>
//         </figcaption>
//         </figure>`;
//     }
// }

// class GoodsList extends List {
//     constructor(cart, container = '.items__list') {
//         super(container);
//         this.cart = cart;
//         this.handleData();
//     }

//     _init() {
//         document.querySelector(this.container).addEventListener ('click', evt => {
//             if (evt.target.classList.contains('buy-btn')) {
//                 this.cart.addProduct(evt.target.dataset)
//             }
//         });
//     }
// }

// class GoodsItem extends Item {}

// class Cart extends List {
//     constructor (container = '.cart-block') {
//         super(container);
//         // this.handleData()
//     }

//     addProduct(element) {
//         let productId = +element.dataset['id'];
//         let find = this.allProducts.find(product => product.id_product === productId);
//         if (find) {
//             find.quantity++;
//             this._updateCart(find);
//         } else {
//                 let product = {
//                 id_product: productId,
//                 price: +element.dataset['price'],
//                 product_name: element.dataset['name'],
//                 quantity: 1
//                 };
//                 this.goods = [product];
//                 this.render();
//             }
//     }

//     removeProduct(element) {
//         let productId = +element.dataset['id'];
//         let find = this.allProducts.find(product => product.id_product === productId);
//         if (find.quantity > 1) {
//             find.quantity--;
//             this._updateCart(find);
//         } else {
//             this.allProducts.splice(this.allProducts.indexOf(find), 1);
//           document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//         }
//     }

//     _updateCart (product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product__quantity').textContent = `Quantity: ${product.quantity}`;
//         block.querySelector('.product__price').textContent = `${product.quantity*product.price} RUB`;
//     }
        
//     init() {
//         document.querySelector('.btn__cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', el => {
//             if(el.target.classList.contains('product__del-btn')){
//                 this.removeProduct(el.target);
//             }
//         })
//     }
// }

// class CartItem extends Item {
//     constructor(el, img) {
//         super(el, img);
//         this.quantity = el.quantity;
//     }

//     render() {
//      return `<div class="cart-item" data-id="${this.id_product}">
//         <div class="product__bio">
//         <img src="${this.img}" width="100" height="100" alt="image" class="cart-item-img">
//         <div class="product__desc">
//         <h4 class="product__heading">${this.product_name}</h4>
//         <p class="product__quantity">Quantity: ${this.quantity}</p>
//         <p class="product__price">Price: ${this.price} RUB</p>
//         <p class="product__totalprice">Total: ${this.quantity*this.price} RUB</p>
//         </div>
//         <button class="product__del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//         </div>`
//     }
// }

// const list2 = {
//     GoodsList: GoodsItem,
//     Cart: CartItem
//   }
  
//   let cart = new Cart(); // объект класса Список товаров
  
  
  
  
//   const list = new GoodsList(cart);
//   list.getSum() 



// class GoodsItem {
//     constructor(product) {
//         this.id_product = product.id_product,
//         this.product_name = product.product_name,
//         this.price = product.price,
//         this.img = product.img
//     }

//     render() {
//     return `<figure class="items__list-item" data-id="${this.id_product}">
//         <img src=${this.img} alt="Item" width="360" height="420" class="items__list-img">
//         <figcaption class="items__list-desc">
//         <h4 class="items__list-heading">${this.product_name}</h4>
//         <p class="items__list-text">Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
//         <p class="items__list-price">${this.price} RUB</p>
//         <button class="buy-btn" data-id="${this.id_product}" data-name="${this.product_name}" data-price="${this.price}">Buy</button>
//         </figcaption>
//         </figure>`;
//     }
// }

// class GoodsList {
//     constructor (cart, container = '.items__list', list = list2) {
//         this.container = container,
//         this.list = list
//         this.goods = [],
//         this.allProducts = [],
//         this.cart = cart,
//         this.fetchGoods()
//     }

//     fetchGoods() {
//         this.goods = [
//             {id_product: 1, product_name: 'Jacket', price: 4000, img: '/img/items/item1.jpg'},
//             {id_product: 2, product_name: "Suit", price: 7000, img: "/img/items/item2.jpg"},
//             {id_product: 3, product_name: "Hoodie", price: 2000, img: "/img/items/item3.jpg"},
//             {id_product: 4, product_name: "Shirt", price: 1500, img: "/img/items/item4.jpg"},
//             {id_product: 5, product_name: "Jacket", price: 3000, img: "/img/items/item5.jpg"},
//             {id_product: 6, product_name: "Blouse", price: 2500, img: "/img/items/item6.jpg"},
//         ]
//     }
//     render() {
//         const block = document.querySelector(this.container);
//         for (let product of this.goods) {
//             const productObj = new GoodsItem(product);
//             this.allProducts.push(productObj);
//             block.insertAdjacentHTML('beforeend', productObj.render())
//         }
//     }

//     _init() {
//         document.querySelector('.buy-btn').addEventListener('click', e => {
//             console.log(e.target);
//             this.cart.addProduct(e.target);
//         });
//       }
// }

// //Корзина

// class Cart extends GoodsList {
//     constructor (cart, list, container = '.cart-block') {
//     super(cart, list, container)
//     }

//     addProduct(element) {
//             let productId = +element.dataset['id'];
//             let find = this.allProducts.find(product => product.id_product === productId);
//             if (find) {
//                 find.quantity++;
//                 this._updateCart(find);
//             } else {
//                 let product = {
//                     id_product: productId,
//                     price: +element.dataset['price'],
//                     product_name: element.dataset['name'],
//                     quantity: 1
//                   };
//                   this.goods = [product];
//                   this.render();
//             }
//     }

//     removeProduct(element) {
//         let productId = +element.dataset['id'];
//         let find = this.allProducts.find(product => product.id_product === productId);
//         if (find.quantity > 1) {
//             find.quantity--;
//             this._updateCart(find);
//         } else {
//             this.allProducts.splice(this.allProducts.indexOf(find), 1);
//           document.querySelector(`.cart-item[data-id="${productId}"]`).remove();
//         }
//     }

//     _updateCart (product) {
//         let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`);
//         block.querySelector('.product__quantity').textContent = `Quantity: ${product.quantity}`;
//         block.querySelector('.product__price').textContent = `${product.quantity*product.price} RUB`;
//     }

//     init() {
//         document.querySelector('.btn__cart').addEventListener('click', () => {
//             document.querySelector(this.container).classList.toggle('invisible');
//         });
//         document.querySelector(this.container).addEventListener('click', e => {
//            if(e.target.classList.contains('product__del-btn')){
//                this.removeProduct(e.target);
//            }
//         })
//     }
// }

// class CartItem extends GoodsItem {
//     constructor (el, img) {
//         super (el, img);
//         this.quantity = el.quantity;
//     }

//     render() {
//         return `<h5 class="cart-block-heading">Your Shopping Cart</h5>
//         <div class="cart-item" data-id="${this.id_product}">
//         <div class="product__bio">
//             <img src="${this.img}" width="100" height="100" alt="image" class="cart-item-img">
//             <div class="product__desc">
//                 <h4 class="product__heading">${this.product_name}</h4>
//                 <p class="product__quantity">Quantity: ${this.quantity}</p>
//                 <p class="product__price">Price: ${this.price} RUB</p>
//                 <p class="product__totalprice">Total: ${this.quantity*this.price} RUB</p>
//             </div>
//             <button class="product__del-btn" data-id="${this.id_product}">&times;</button>
//         </div>
//     </div>`
//     }
// }


// const list2 = {
//     GoodsList: GoodsItem,
//     Cart: CartItem
//   }
  
//   let cart = new Cart();

//   const list = new GoodsList(cart);
// list.fetchGoods();
// list.render();