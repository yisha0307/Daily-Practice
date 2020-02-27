import { useEffect } from "react"

const CounterHook = () => {
    const [count, setCount] = useState(0)
    const [name, setName] = useState('heaven')

    useEffect(() => {
        document.title = `counterWithHook ${count}`
    }, [count])
    useEffect(() => {
        console.log('your name is ', name)
    }, [name])

    return (
        <div>
            <h3>Counter with Hook</h3>
            <p>you click {count} times</p>
            <button onClick = {e => setCount(count=> count++)}>Click</button>
            <p>
                <input placeholder = '输入姓名' onChange = {e => setName(e.target.value)} />
                <br />
                your name is {name}
            </p>
        </div>
    )
}

export default CounterHook