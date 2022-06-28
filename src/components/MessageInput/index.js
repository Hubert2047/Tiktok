import classNames from 'classnames/bind'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { MessengerIcon, SmileIcon } from '~/components/Icons'
import Input from '~/components/Input'
import { addChat, addMessage } from '~/firebase'
import { messageActions } from '~/redux/messageSlice'
import styles from './MessageInput.module.scss'

const clsx = classNames.bind(styles)
function MessageInput({ currentChat }) {
    const dispath = useDispatch()
    const inputValue = useSelector((state) => state.message.inputValue)
    const currentUser = useSelector((state) => state.user.user)
    // console.log(currentChat.id)
    const handleOnSubmit = async function () {
        if (currentChat.id) {
            const newMessage = {
                id: uuidv4(),
                createdAt: new Date(),
                fromUid: currentUser.uid,
                content: inputValue,
                isRead: false,
            }
            await addMessage(currentUser, currentChat.friendChat.uid, newMessage)
        } else {
            //if havent chat with this friend then we create once
            const content = inputValue
            await addChat(currentUser, currentChat.friendChat.uid, content)
        }
        dispath(messageActions.setInputValue(''))
    }
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <div className={clsx('input-box', 'd-flex', { width: inputValue?.length > 0 })}>
                <Input placeholder='Send a message...' onSubmit={handleOnSubmit} />
                <SmileIcon />
            </div>
            {inputValue?.length > 0 && (
                <div onClick={handleOnSubmit} className={clsx('flex-center')}>
                    <MessengerIcon height='3.2rem' width='3.2rem' className={clsx('input-btn')} />
                </div>
            )}
        </div>
    )
}

export default MessageInput
