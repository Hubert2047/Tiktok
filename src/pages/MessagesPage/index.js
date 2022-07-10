/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Comfirm from '~/components/Comfirm'
import ConversationItem from '~/components/ConversationItem'
import MessageInput from '~/components/MessageInput'
import UserAvatar from '~/components/UserAvatar'
import UserSendMessage from '~/components/UserSendMessage'
import { getChats, getUser, isFriendSendingMessage } from '~/firebase'
import { useMessageRoute } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import styles from './MessagesPage.module.scss'

const clsx = classNames.bind(styles)
function MessagesPage() {
    const params = useParams()
    const navigate = useNavigate()
    const dispath = useDispatch()
    const [isFriendSending, setIsFriendSending] = useState(false)
    const currentUser = useSelector((state) => state.user.user)
    const [currentChat, setCurrentChat] = useState({})
    const [chats, setChats] = useState([])
    const scrollRef = useRef()

    const handleFindFriends = function () {
        navigate('/')
        dispath(containerPortalActions.setComponent(null))
    }
    useEffect(() => {
        const getCurrentUserChats = async function () {
            await getChats(currentUser, (data) => {
                if (!data?.length > 0 && currentUser.uid === params.uid) {
                    dispath(
                        containerPortalActions.setComponent({
                            component: (
                                <Comfirm
                                    question={'You have no messages yet! Do you want to find friends to send a message'}
                                    subMitTitle='Find friends'
                                    onSubmit={handleFindFriends}
                                />
                            ),
                            onClickOutside: false,
                        })
                    )
                }
                setChats(data)
            })
        }
        getCurrentUserChats()
    }, [])
    useEffect(() => {
        const checkFriensSendingState = async function () {
            const result = await isFriendSendingMessage(currentUser, currentChat?.friendUid)
            // console.log(result)
            setIsFriendSending(result)
        }
        checkFriensSendingState()
    }, [chats, currentChat])
    const getCurrentFriendChat = async function (friendChatUid) {
        if (currentUser.uid === params.uid) {
            setCurrentChat([])
            return
        }
        let _currentChat = chats.find((chat) => chat.friendUid === friendChatUid)
        if (_currentChat) {
            setCurrentChat(_currentChat)
            return
        }
        const friendChat = await getUser(friendChatUid)
        _currentChat = {
            messages: [],
            friendChat: friendChat,
        }
        setCurrentChat(_currentChat)
    }
    //get current friend chat
    useEffect(() => {
        getCurrentFriendChat(params.uid)
    }, [chats, params.uid])
    // auto scroll to the last message
    useEffect(() => {
        if (scrollRef.current) scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [currentChat, isFriendSending])

    const handleClickChatFriend = function (chat) {
        navigate(useMessageRoute(chat.friendChat))
    }

    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('conversation-list')}>
                <div className={clsx('list-header')}>
                    <h4 className={clsx('title')}>Messages</h4>
                </div>
                {chats?.length > 0 && (
                    <div className={clsx('list-content')}>
                        {chats?.map((chat, index) => {
                            return (
                                <UserSendMessage
                                    key={index}
                                    chat={chat}
                                    onClickChatFriend={handleClickChatFriend}
                                    currentUser={currentUser}
                                />
                            )
                        })}
                    </div>
                )}
            </div>
            <div className={clsx('conversation-container', 'd-flex')}>
                {currentChat?.friendChat && (
                    <Fragment>
                        <div className={clsx('conversation-header', 'd-flex ')}>
                            <UserAvatar user={currentChat?.friendChat} height={'4.8rem'} />
                            <div className={clsx('conversation-infor', 'd-flex')}>
                                <span className={clsx('full-name')}>{currentChat?.friendChat?.full_name}</span>
                                <span className={clsx('nickname')}>{`@${currentChat?.friendChat?.nickname}`}</span>
                            </div>
                        </div>

                        <div className={clsx('conversation-main')}>
                            {currentChat?.messages?.map((message, index) => {
                                return (
                                    <ConversationItem
                                        key={index}
                                        isFriendSending={isFriendSending}
                                        message={message}
                                        currentUser={currentUser}
                                        isLastMsg={index === currentChat?.messages?.length - 1}
                                        currentChat={currentChat}
                                    />
                                )
                            })}
                            <div ref={scrollRef}></div>
                        </div>

                        <div className={clsx('conversation-bottom')}>
                            <MessageInput currentChat={currentChat} currentUser={currentUser} />
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default MessagesPage
