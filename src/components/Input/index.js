import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateSendingMessageState } from '~/firebase'
import { messageActions } from '~/redux/messageSlice'
import styles from './Input.module.scss'

const clsx = classNames.bind(styles)
function Input({ placeholder = '', onSubmit, currentUser, currentChat }) {
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
    const handleOnFocus = function (e) {
        if (!currentChat.id) return //if dont have any current friend chat then return
        try {
            updateSendingMessageState(currentUser, currentChat.friendUid, true)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (divRef.current) {
            divRef.current.focus()
        }
    }, [currentChat])
    const handleOnblur = function (e) {
        if (!currentChat.id) return
        try {
            updateSendingMessageState(currentUser, currentChat.friendUid, false)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div
            ref={divRef}
            suppressContentEditableWarning={true}
            contentEditable={true}
            onKeyUp={handleOnKeyUp}
            className={clsx('editor-root')}
            data-placeholder={placeholder}
            onFocus={handleOnFocus}
            onBlur={handleOnblur}></div>
    )
}

export default Input
