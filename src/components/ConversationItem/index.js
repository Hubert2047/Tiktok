import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment, useEffect } from 'react'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import Button from '~/components/Button'
import { ThreeDotIcon } from '~/components/Icons'
import UserAvatar from '~/components/UserAvatar'
import { updateReadMessageState } from '~/firebase'
import { formatMessageTime } from '~/helper'
import styles from './ConversationItem.module.scss'
const clsx = classNames.bind(styles)
function ConversationItem({ message, currentUser, isLastMsg, currentChat }) {
    let isFromCurrentUserSend = false
    if (message.fromUid === currentUser.uid) {
        isFromCurrentUserSend = true
    }
    useEffect(() => {
        //if friend read msg then we update the msg state
        if (isLastMsg && !isFromCurrentUserSend && !message.isRead) {
            updateReadMessageState(currentUser, currentChat.friendUid)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleDeleteMessage = function (messageId) {
        // updateChat()
    }
    return (
        <div className={clsx('wrapper')}>
            {isFromCurrentUserSend ? (
                <Fragment>
                    <div className={clsx('time-chat')}>{formatMessageTime(message?.createdAt)}</div>
                    <div className={clsx('conversation-item', 'd-flex', 'send-message')}>
                        <div className={clsx('read-avatar')}>
                            {isLastMsg && (
                                <div>
                                    {message.isRead ? (
                                        <UserAvatar user={currentChat?.friendChat} height='1.4rem' />
                                    ) : (
                                        <IoCheckmarkCircleSharp />
                                    )}
                                </div>
                            )}
                        </div>
                        <UserAvatar user={currentUser} />
                        <p className={clsx('conversation-content')}>{message.content}</p>
                        <Tippy
                            // trigger='click'
                            offset={[-10, 0]}
                            placement={'left-start'}
                            interactive={true}
                            render={(attrs) => (
                                <div className={clsx('action-options', 'd-flex')} tabIndex='-1' {...attrs}>
                                    <Button
                                        onClick={() => {
                                            handleDeleteMessage(message.id)
                                        }}
                                        title='Delete'
                                        color='color-white'
                                        className={clsx('option-btn')}
                                    />
                                    <Button title='Like' color='color-white' className={clsx('option-btn')} />
                                </div>
                            )}>
                            <div className={clsx('conversation-btn-box')}>
                                <ThreeDotIcon className={clsx('conversation-btn')} />
                            </div>
                        </Tippy>
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <div className={clsx('time-chat')}>{formatMessageTime(message?.createdAt)}</div>
                    <div className={clsx('conversation-item', 'd-flex', 'receive-message')}>
                        <UserAvatar user={currentChat?.friendChat} />
                        <p className={clsx('conversation-content')}>{message.content}</p>
                        <Tippy
                            // trigger='click'
                            offset={[-10, 0]}
                            placement={'right-start'}
                            interactive={true}
                            render={(attrs) => (
                                <div className={clsx('action-options', 'd-flex')} tabIndex='-1' {...attrs}>
                                    <Button
                                        onClick={handleDeleteMessage}
                                        title='Delete'
                                        color='color-white'
                                        className={clsx('option-btn')}
                                    />
                                    <Button title='Like' color='color-white' className={clsx('option-btn')} />
                                </div>
                            )}>
                            <div className={clsx('conversation-btn-box')}>
                                <ThreeDotIcon className={clsx('conversation-btn')} />
                            </div>
                        </Tippy>
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default ConversationItem
