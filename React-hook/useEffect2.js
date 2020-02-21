import React, {useState, useEffect} from 'react'
/**
 * useEffect(() => {}, [array])
 * 第一个参数：要进行的异步操作
 * 第二个参数：一个数组，用来给出effect的依赖项
 *
 * @param {*} {name}
 */
const AsyncPage = ({name}) => {
    const [loading, setLoading] = useState(true)
    const [person, setPerson] = useState({})
    
    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setPerson({name})
        }, 5000);
    }, [name])
    return (
        <> 
        {loading ? <p>Loading...</p> : <p>{person.name}</p>}
        </>
    )
}

const PersonPage = () => {
    const [state, setState] = useState('')
    const changeName = (name) => {
        setState(name)
    }
    return (
        <>
        <AsyncPage name={state} />
        <button onClick = {() => changeName('Tom')}>TOM</button> 
        <button onClick = {() => changeName('Jerry')}>Jerry</button>
        </>
    )
}