import classNames from 'classnames/bind'
import React from 'react'
import { useSelector } from 'react-redux'
import { MessengerIcon, SmileIcon } from '~/components/Icons'
import Input from '~/components/Input'
import styles from './MessageInput.module.scss'

const clsx = classNames.bind(styles)
function MessageInput() {
    const handleOnSubmit = function () {}
    const inputValue = useSelector((state) => state.message.inputValue)
    console.log(inputValue)
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <div className={clsx('input-box', 'd-flex', { width: inputValue?.length > 0 })}>
                <Input placeholder='Send a message...' />
                <SmileIcon />
            </div>
            {inputValue?.length > 0 && (
                <div onClick={handleOnSubmit} className={clsx('grid-center')}>
                    <MessengerIcon height='3.2rem' width='3.2rem' className={clsx('input-btn')} />
                </div>
            )}
        </div>
    )
}

export default MessageInput
