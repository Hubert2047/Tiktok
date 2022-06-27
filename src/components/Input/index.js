import classNames from 'classnames/bind'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { messageActions } from '~/redux/messageSlice'
import styles from './Input.module.scss'

const clsx = classNames.bind(styles)
function Input({ placeholder = '', onSubmit }) {
    const inputValue = useSelector((state) => state.message.inputValue)
    const dispath = useDispatch()
    const divRef = useRef()
    const handleOnKeyUp = function (e) {
        // console.log(e.keyCode)
        if (e.keyCode === 13 && inputValue.trim()) {
            onSubmit()
            divRef.current.innerHTML = ''
        } else {
            dispath(messageActions.setInputValue(e.target.textContent))
        }
    }
    useEffect(() => {
        if (inputValue === '') {
            divRef.current.innerHTML = ''
        }
    }, [inputValue])
    return (
        <div
            ref={divRef}
            suppressContentEditableWarning={true}
            contentEditable={true}
            onKeyUp={handleOnKeyUp}
            className={clsx('editor-root')}
            data-placeholder={placeholder}></div>
    )
}

export default Input
