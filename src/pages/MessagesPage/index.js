/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ConversationItem from '~/components/ConversationItem'
import MessageInput from '~/components/MessageInput'
import UserAvatar from '~/components/UserAvatar'
import UserSendMessage from '~/components/UserSendMessage'
import { getChats, getUser, updateReadMessageState } from '~/firebase'
import { useMessageRoute } from '~/hooks'
import styles from './MessagesPage.module.scss'

const clsx = classNames.bind(styles)
function MessagesPage() {
    const params = useParams()
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state.user.user)
    const [currentChat, setCurrentChat] = useState({})
    const [chats, setChats] = useState([])
    const scrollRef = useRef()
    useEffect(() => {
        const getCurrentUserChats = async function () {
            await getChats(currentUser, (data) => {
                setChats(data)
            })
        }
        getCurrentUserChats()
    }, [])
    const getCurrentFriendChat = async function (friendChatUid) {
        let _currentChat = chats.find((chat) => chat.friendUid === friendChatUid)
        if (!_currentChat && currentUser.uid !== params.uid) {
            const friendChat = await getUser(friendChatUid)
            _currentChat = {
                messages: [],
                friendChat: friendChat,
            }
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
    }, [currentChat])

    const handleClickChatFriend = function (chat, isLastMessageUnread) {
        navigate(useMessageRoute(chat.friendChat))
    }
    const handleDeleteMessage = function (messageId) {
        // updateChat()
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
                            <MessageInput currentChat={currentChat} />
                        </div>
                    </Fragment>
                )}
            </div>
        </div>
    )
}

export default MessagesPage
