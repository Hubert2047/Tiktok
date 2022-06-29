import classNames from 'classnames/bind'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import UserAvatar from '~/components/UserAvatar'
import { formatMessageTime } from '~/helper'
import styles from './UserSendMessage.module.scss'

const clsx = classNames.bind(styles)
function UserSendMessage({ chat, onClickChatFriend, currentUser }) {
    const lastMessage = chat?.messages[chat?.messages?.length - 1]
    const isLastMessageFromCurrentUser = lastMessage?.fromUid === currentUser.uid
    const isLastMessageUnread = !lastMessage?.isRead && !isLastMessageFromCurrentUser
    return (
        <>
            {lastMessage && (
                <div
                    className={clsx('user-container', 'd-flex')}
                    onClick={() => {
                        onClickChatFriend(chat, isLastMessageUnread)
                    }}>
                    <UserAvatar user={chat?.friendChat} height={'5.6rem'} className={clsx('list-user-avatar')} />
                    <div className={clsx('user-infor-box', 'd-flex')}>
                        <div className={clsx('user-infor', 'd-flex')}>
                            <span className={clsx('list-user-name')}>{chat?.friendChat?.full_name}</span>

                            <div className={clsx('infor-extract-box', 'd-flex')}>
                                {lastMessage?.content && (
                                    <span
                                        className={clsx('infor-extract', {
                                            unread: isLastMessageUnread,
                                        })}>
                                        {chat.unReadMsg > 1 ? `sent ${chat.unReadMsg} messages` : lastMessage?.content}
                                    </span>
                                )}
                                <span className={clsx('list-user-time')}>
                                    {formatMessageTime(lastMessage?.createdAt) || new Date().toLocaleTimeString()}
                                </span>
                            </div>
                        </div>
                        {isLastMessageFromCurrentUser && (
                            <div className={clsx('read')}>
                                {lastMessage?.isRead ? (
                                    <UserAvatar user={chat?.friendChat} height={'1.2rem'} />
                                ) : (
                                    <IoCheckmarkCircleSharp className={clsx('check-read')} />
                                )}
                            </div>
                        )}
                        {!isLastMessageFromCurrentUser && !lastMessage?.isRead && (
                            <span className={clsx('has-new-message')}></span>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default UserSendMessage
