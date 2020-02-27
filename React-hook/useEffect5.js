import React, {useState, useEffect} from 'react'

/**
 * 如何”清除“副作用
 */
function FriendStatus (props) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = `You clicked ${count} times`
    })
    const [isOnline, setIsOnline] = useState(null)
    function handleStatusChange (status) {
        setIsOnline(status.isOnline)
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
        return () => {
            /** 
             * useEffect return一个func，会在componentWillUnmount的时候调用
             * 适合用来清除副作用，比如unsubscribe等操作
            */
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
        }
    })
    if (isOnline === null) {
        return 'Loading...'
    }
    return isOnline ? 'Online' : 'Offline'
}