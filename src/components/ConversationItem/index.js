import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { IoCheckmarkCircleSharp } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { ThreeDotIcon } from '~/components/Icons'
import UserAvatar from '~/components/UserAvatar'
import { removeMessage, unSendMessage, updateReadMessageState } from '~/firebase'
import { formatMessageTime } from '~/helper'
import { toastActions } from '~/redux/toastSlice'
import Comfirm from '../Comfirm/index'
import FullScreenModal from '../Popper/FullScreenModal'
import styles from './ConversationItem.module.scss'
const clsx = classNames.bind(styles)
function ConversationItem({ message, currentUser, isLastMsg, currentChat }) {
    const [showComfirm, setShowComfirm] = useState(false)
    const dispath = useDispatch()
    let isFromCurrentUserSend = false
    if (message?.fromUid === currentUser?.uid) {
        isFromCurrentUserSend = true
    }
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
        setShowComfirm(true)
    }
    const handleOnCancelComfirm = function () {
        setShowComfirm(false)
    }
    const handleOnComfirm = async function () {
        try {
            await removeMessage(currentUser, currentChat.friendUid, message)
            dispath(toastActions.addToast({ message: 'Deleted', mode: 'success' }))
            setShowComfirm(false)
        } catch (e) {
            console.log(e)
            setShowComfirm(false)
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
                        <Button title='Like' color='color-white' className={clsx('option-btn')} />
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
        <div className={clsx('wrapper')}>
            {showComfirm && (
                <FullScreenModal handleShowPopup={handleOnCancelComfirm}>
                    <Comfirm
                        question='Are you sure you want to delete this comment?'
                        btnTitle='Delete'
                        onCancel={handleOnCancelComfirm}
                        onComfirm={handleOnComfirm}
                    />
                </FullScreenModal>
            )}
            {isFromCurrentUserSend ? (
                <Fragment>
                    <div className={clsx('time-chat')}>{formatMessageTime(message?.createdAt)}</div>
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
                </Fragment>
            ) : (
                <Fragment>
                    <div className={clsx('time-chat')}>{formatMessageTime(message?.createdAt)}</div>
                    <div className={clsx('conversation-item', 'd-flex', 'receive-message')}>
                        <UserAvatar user={currentChat?.friendChat} />
                        <p className={clsx('conversation-content', { 'unsend-msg': message?.isUnsended })}>
                            {message.content}
                        </p>
                        <Actions placement={'right-start'} />
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default ConversationItem
