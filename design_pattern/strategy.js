// 定义一个询价处理器对象
const priceProcessor = {
    pre(originPrice) {
        // ...
    },
    onSale(originPrice) {
        // ...
    },
    back(originPrice) {
        // ...
    },
    fresh(originPrice) {
        // ...
    }
}

const askPrice = (type, price) => {
    return priceProcessor[type](price)
}
