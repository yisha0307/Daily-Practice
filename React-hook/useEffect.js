// 副作用钩子
// 一般把请求用在componentDidMount里，但是纯函数组件没有生命周期
// 所以使用useEffect()
import React, {useState, useEffect} from 'react'

const AsyncPage = () => {
    const [loading, setLoading] = useState(true)
    // 相当于class组件放在componentDidMount里的函数
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 5000);
    })
    return (
        loading? <p>loading...</p> : <p>异步请求完成</p>
    )
}