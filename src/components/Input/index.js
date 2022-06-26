import classNames from 'classnames/bind'
import React from 'react'
import { useDispatch } from 'react-redux'
import { messageActions } from '~/redux/messageSlice'
import styles from './Input.module.scss'

const clsx = classNames.bind(styles)
function Input({ placeholder = '' }) {
    const dispath = useDispatch()
    const handleOnKeyUp = function (e) {
        dispath(messageActions.setInputValue(e.target.textContent))
    }
    return (
        <div
            suppressContentEditableWarning={true}
            contentEditable={true}
            onKeyUp={handleOnKeyUp}
            className={clsx('editor-root')}
            data-placeholder={placeholder}></div>
    )
}

export default Input
