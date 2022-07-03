/* eslint-disable react-hooks/exhaustive-deps */
import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { HeartPrimary, ThreeDotIcon } from '~/components/Icons'
import UserAvatar from '~/components/UserAvatar'
import { getLikeMessageUserInfor, likeMessage, removeMessage, unSendMessage, updateReadMessageState } from '~/firebase'
import { formatMessageTime } from '~/helper'
import { toastActions } from '~/redux/toastSlice'
import styles from './ConversationItem.module.scss'

const clsx = classNames.bind(styles)
function ConversationItem({ message, currentUser, isLastMsg, currentChat, isFriendSending, onLikeMessage }) {
    const dispath = useDispatch()
    const [likeUsers, setLikeUsers] = useState([])
    const [isCurrentUserLikedMsg, setIsCurrentUserLikedMsg] = useState()
    let isFromCurrentUserSend = false
    if (message?.fromUid === currentUser?.uid) {
        isFromCurrentUserSend = true
    }
    useEffect(() => {
        setIsCurrentUserLikedMsg(message?.likes?.includes(currentUser.uid))
    }, [message])
    useEffect(() => {
        if (message?.likes?.length > 0) {
            const getUserInfor = async function () {
                const users = await getLikeMessageUserInfor(message?.likes)
                setLikeUsers(users)
            }
            getUserInfor()
        }
    }, [message?.likes?.length])
    useEffect(() => {
        //if friend read msg then we update the msg state
        if (isLastMsg && !isFromCurrentUserSend && !message?.isRead) {
            updateReadMessageState(currentUser, currentChat?.friendUid)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const handleUnsendMessage = function () {
        if (!message.isUnsended) unSendMessage(currentUser, currentChat.friendUid, message)
    }
    const handleRemoveMsg = async function () {
        try {
            await removeMessage(currentUser, currentChat.friendUid, message)
            dispath(toastActions.addToast({ message: 'Deleted', mode: 'success' }))
        } catch (e) {
            console.log(e)
        }
    }
    const handleLikeMessage = function () {
        let updateMessage
        if (isCurrentUserLikedMsg) {
            updateMessage = { ...message, likes: message?.likes?.filter((like) => like !== currentUser.uid) }
        } else {
            updateMessage = { ...message, likes: [...(message?.likes || []), currentUser.uid] }
        }
        try {
            likeMessage(currentUser, currentChat.friendUid, updateMessage)
        } catch (e) {
            console.log(e)
        }
    }

    const Actions = function ({ placement, showUnsendMsg }) {
        return (
            <Tippy
                // trigger='click'
                offset={[-10, 0]}
                placement={placement}
                interactive={true}
                render={(attrs) => (
                    <div className={clsx('action-options', 'd-flex')} tabIndex='-1' {...attrs}>
                        <Button
                            onClick={handleLikeMessage}
                            title={isCurrentUserLikedMsg ? 'Unlike' : 'Like'}
                            color='color-white'
                            className={clsx('option-btn')}
                        />
                        {showUnsendMsg && (
                            <Button
                                onClick={handleUnsendMessage}
                                title='Unsend'
                                color='color-white'
                                className={clsx('option-btn')}
                            />
                        )}
                        <Button
                            onClick={handleRemoveMsg}
                            title='Remove'
                            color='color-white'
                            className={clsx('option-btn')}
                        />
                    </div>
                )}>
                <div className={clsx('conversation-btn-box')}>
                    <ThreeDotIcon className={clsx('conversation-btn')} />
                </div>
            </Tippy>
        )
    }
    return (
        <div className={clsx('wrapper', { 'last-msg': isLastMsg })}>
            {isFromCurrentUserSend ? (
                <Fragment>
                    <div className={clsx('time-chat')}>{formatMessageTime(message?.createdAt)}</div>
                    <div className={clsx('conversation-item-box', 'send-message')}>
                        <div className={clsx('conversation-item', 'd-flex', 'send-message')}>
                            <div className={clsx('read-avatar')}>
                                {isLastMsg && message.isRead && (
                                    <UserAvatar user={currentChat?.friendChat} height='1.4rem' />
                                )}
                                {!message.isRead && <IoCheckmarkCircleSharp />}
                            </div>
                            <UserAvatar user={currentUser} />
                            <p
                                className={clsx('conversation-content', 'conversation-content-current-user', {
                                    'unsend-msg': message?.isUnsended,
                                })}>
                                {message.content}
                            </p>
                            <Actions placement={'left-start'} showUnsendMsg />
                        </div>
                    </div>
                    {message?.likes?.length > 0 && (
                        <div className={clsx('like-box-rigt', 'send-message')}>
                            {likeUsers?.map((user) => (
                                <UserAvatar key={user.uid} user={user} height='1.7rem' />
                            ))}
                            <HeartPrimary height='17px' width='17px' />
                        </div>
                    )}
                </Fragment>
            ) : (
                <Fragment>
                    <div className={clsx('time-chat')}>{formatMessageTime(message?.createdAt)}</div>
                    <div className={clsx('conversation-item-box', 'd-flex')}>
                        <div className={clsx('conversation-item', 'd-flex', 'receive-message')}>
                            <UserAvatar user={currentChat?.friendChat} />
                            <p className={clsx('conversation-content', { 'unsend-msg': message?.isUnsended })}>
                                {message.content}
                            </p>
                            <Actions placement={'right-start'} />
                        </div>
                    </div>
                    {message?.likes?.length > 0 && (
                        <div className={clsx('like-box-left', 'd-flex')}>
                            <HeartPrimary height='17px' width='17px' />
                            {likeUsers?.map((user) => (
                                <UserAvatar key={user.uid} user={user} height='1.7rem' />
                            ))}
                        </div>
                    )}
                </Fragment>
            )}
            {isLastMsg && isFriendSending && (
                <div className={clsx('d-flex', 'dot-box')}>
                    <UserAvatar user={currentChat.friendChat} height={'1.8rem'} />
                    <div className={clsx('dot', 'dot-1')}></div>
                    <div className={clsx('dot', 'dot-2')}></div>
                    <div className={clsx('dot', 'dot-3')}></div>
                </div>
            )}
        </div>
    )
}

export default ConversationItem
