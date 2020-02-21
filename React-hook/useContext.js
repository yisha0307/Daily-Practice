import React, {useContext} from 'react'
const Ceshi = () => {
    // context: 做状态的分发
    const AppContext = React.createContext({})
    const A = () => {
        const {name} = useContext(AppContext)
        return (
            <p>我是A组件的名字{name}<span>我是A的子组件{name}</span></p>
        )
    }
    const B = () => {
        const {name} = useContext(AppContext)
        return (
            <p>我是B组件的名字{name}</p>
        )
    }
    return (
        <AppContext.Provider value={{name: 'hook测试'}}>
            <A/>
            <B/>
        </AppContext.Provider>
    )
}

export default Ceshi