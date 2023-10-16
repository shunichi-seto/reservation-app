const Product = require('./model/product')

class FakeDb {
    constructor() {
        this.products = [
            {
                coverimage: './assets/img/phone-cover.jpg',
                name: 'Phone XL',
                price: 99000,
                stock: 50,
                description: 'A large phone with one of the best screens',
                heading1: 'Heading1-1',
                heading2: 'Heading1-2',
                heading3: 'Heading1-3',
                headingtext1: 'headingtext1-1',
                headingtext2: 'headingtext1-2',
                headingtext3: 'headingtext1-3',
            },
            {
                coverimage: './assets/img/phone-cover.jpg',
                name: 'Phone Mini',
                price: 88000,
                stock: 45,
                description: 'A great phone with one of the best cameras',
                heading1: 'Heading2-1',
                heading2: 'Heading2-2',
                heading3: 'Heading2-3',
                headingtext1: 'headingtext2-1',
                headingtext2: 'headingtext2-2',
                headingtext3: 'headingtext2-3',
            },
            {
                coverimage: './assets/img/phone-cover.jpg',
                name: 'Phone Standard',
                price: 77000,
                stock: 30,
                description: '',
                heading1: 'Heading3-1',
                heading2: 'Heading3-2',
                heading3: 'Heading3-3',
                headingtext1: 'headingtext3-1',
                headingtext2: 'headingtext3-2',
                headingtext3: 'headingtext3-3',
            },
            {
                coverimage: './assets/img/phone-cover.jpg',
                name: 'Phone Special',
                price: 77000,
                stock: 999,
                description: '',
                heading1: 'Heading4-1',
                heading2: 'Heading4-2',
                heading3: 'Heading4-3',
                headingtext1: 'headingtext4-1',
                headingtext2: 'headingtext4-2',
                headingtext3: 'headingtext4-3',
            },            
        ]
    }

    async initDb() {
        await this.cleanDb()
        this.pushProductsToDb()
    }

    async cleanDb() {
        await Product.deleteMany({})
    }

    pushProductsToDb() {
        this.products.forEach(
            (product) => {
                const newProduct = new Product(product)
                newProduct.save()
            }
        )
    }

    seeDb() {
        this.pushProductsToDb()
    }
}

module.exports = FakeDb