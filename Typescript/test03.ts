interface Alarm{
    alert(): void;
}
class Door {

}

// implements(实现):
// 一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，
// 这时候就可以把特性提取成接口（interfaces），
// 用 implements 关键字来实现
class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert')
    }
}

class Car implements Alarm {
    alert () {
        console.log('Car alert')
    }
}

interface Light {
    lightOn(): void
    lightOff(): void
}

// 一个class可以实现多个接口
class Car2 implements Alarm, Light{
    alert() {
        console.log('SecurityDoor alert')
    }
    lightOn () {
        console.log('car light on')
    }
    lightOff () {
        console.log('car light off')
    }
}

interface LightAlarm extends Alarm {
    // 接口和接口可以是继承关系
    lightOn(): void
    lightOff(): void
}

class Point {
    x: number;
    y: number;
}
interface Point3d extends Point {
    // 接口也可以继承类
    z: number
}
let point3d: Point3d = {x:1, y:2, z:3}

// 混合类型
// 用接口的方式来定义一个函数需要符合的形状
interface SearchFunc {
    (source: string, subString: string): boolean
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1
}
// 一个函数还可以有自己的属性和方法
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
function getCounter(): Counter {
    let counter = <Counter>function (start:number) { }
    counter.interval = 123
    counter.reset = () => {}
    return counter;
}

