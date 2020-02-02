
class coffeeMachine {
    constructor () {
        this.status = 'init'
        this.leftMilk = 500
    }
    statusProcessor = {
        that: this,
        american() {
            console.log('咖啡机现在的牛奶存储量是:', this.that.leftMilk)
            console.log('我只吐黑咖啡');    
        },
        latte() {
            this.american();
            console.log('加点奶');  
        },
        vanillaLatte() {
            this.latte();
            console.log('再加香草糖浆');
        },
        mocha() {
            this.latte();
            console.log('再加巧克力');
        }
    }   
    changeStatus (status) {
        this.state = state
        if (!statusProcessor[status]) {
            return
        }
        this.statusProcessor[status]()
    }
}

const mk = new coffeeMachine()
mk.changeStatus('latte')