import React, {useState, useEffect} from 'react'

function useFriendStatus (friendID) {
    const [isOnline, setIsOnline] = useState(null)
    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
        }
    })
    return isOnline
}

/**
 * 以下两个function的state是各自独立的
 * 复用了hook的状态逻辑的方式
 * 不复用state本身
 *
 * @param {*} props
 * @returns
 */
function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id)
    if (isOnline === null) {
        return 'Loading'
    }
    return isOnline ? 'Online' : 'Offline'
}

function FriendItemList (props) {
    const isOnline = useFriendStatus(props.friend.id)
    return (
        <li style={{color: isOnline ? 'green' : 'black'}}>
            {props.friend.name}
        </li>
    )
}