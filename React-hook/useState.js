import React, {useState} from 'react'
// 利用纯函数而非class组件
const AddCount = () => {
    // 纯函数：没有继承、没有render、没有生命周期
    // 0：initial state
    const [count, setCount] = useState(0)
    const AddCount = () => {
        let newCount = count
        setCount(newCount += 1)
    }
    return (
        <>
            <p>{count}</p>
            <button onClick={AddCount}>count++</button>
        </>
    )
}

export default AddCount