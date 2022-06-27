import classNames from 'classnames/bind'
import UserAvatar from '~/components/UserAvatar'
import { formatMessageTime } from '~/helper'
import styles from './UserSendMessage.module.scss'

const clsx = classNames.bind(styles)
function UserSendMessage({ chat, onChangeChatFriend }) {
    const lastMessage = chat?.messages[chat?.messages?.length - 1]
    return (
        <div
            className={clsx('user-container', 'd-flex')}
            onClick={() => {
                onChangeChatFriend(chat)
            }}>
            <UserAvatar user={chat?.friendChat} height={'5.6rem'} className={clsx('list-user-avatar')} />
            <div className={clsx('user-infor', 'd-flex')}>
                <span className={clsx('list-user-name')}>{chat?.friendChat?.full_name}</span>

                <div className={clsx('infor-extract-box', 'd-flex')}>
                    {lastMessage?.content && <span className={clsx('infor-extract')}>{lastMessage?.content}</span>}
                    <span className={clsx('list-user-time')}>
                        {formatMessageTime(lastMessage?.createdAt) || new Date().toLocaleTimeString()}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default UserSendMessage
