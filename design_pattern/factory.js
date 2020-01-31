// abstract factory
class MobilePhoneFactory {
    // 提供操作系统的接口
    createOS () {
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！")
    }
    // 提供硬件的接口
    createHardware () {
        throw new Error("抽象工厂方法不允许直接调用，你需要将我重写！")
    }
}

// concrete factory
class FakeStarFactory extends MobilePhoneFactory {
    createOS () {
        // 提供安卓系列实例
        return new AndriodOS()
    }
    createHardware () {
        // 提供高通硬件实例
        return new QualcommHardWare()
    }
}

// abstract product for operating system
class OS {
    controlHardWare () {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！')
    }
}
// concrete product for OS
class AndriodOS extends OS {
    controlHardWare () {
        console.log('我会用安卓的方法去操作硬件')
    }
}
class AppleOS extends OS {
    controlHardWare () {
        console.log('我会用苹果的方法去操作硬件')
    }
}

// abstract product for hardware
class Hardware {
    // 手机硬件的共性方法，这里提取了“根据命令运转”这个共性
    operateByOrder () {
        throw new Error('抽象产品方法不允许直接调用，你需要将我重写！')
    }
}
// concrete product for hardware
class QualcommHardWare extends Hardware {
    operateByOrder () {
        console.log('我会用高通的方式去运转')
    }
}
class Miware extends Hardware {
    operateByOrder () {
        console.log('我会用小米的方式去运转')
    }
}

// 用工厂模式构造一部手机
const myPhone = new FakeStarFactory()
// 让它拥有操作系统
const myOS = myPhone.createOS()
// 让它拥有硬件
const myHardware = myPhone.createHardware()
// 启动操作系统
myOS.controlHardWare()
// 启动硬件
myHardware.controlHardWare()