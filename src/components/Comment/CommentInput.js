import classNames from 'classnames/bind'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SmileIcon } from '~/components/Icons'
import { addComment } from '~/firebase'
import { commentActions } from '~/redux/commentSlice'
import Button from '../Button'
import { LoginPopup } from '../Popper'
import FullScreenModal from '../Popper/FullScreenModal'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function CommentInput({ post, className }) {
    const dispath = useDispatch()
    const inputRef = useSelector((state) => state.comment.inputRef)
    const lastUserWasTouchedReply = useSelector((state) => state.comment.lastUserWasTouchedReply)
    const currentParentId = useSelector((state) => state.comment.currentParentId)
    const currentUser = useSelector((state) => state.user.user)
    const [value, setValue] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const handleOnchange = function (e) {
        setValue(e.target.value)
    }
    // console.log(currentParentId, lastUserWasTouchedReply)
    const btnColor = value ? 'color-primary' : 'color-grey'
    const disabled = value ? false : true
    const callbackInput = useCallback((node) => {
        dispath(commentActions.setInputRef(node))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (inputRef) {
            inputRef.addEventListener('keydown', (e) => {
                if (e.keyCode === 8 && e.target.value.length === 0) {
                    dispath(commentActions.setLastUserWasTouchedReply({}))
                    dispath(commentActions.setCurrentParentId('null'))
                }
                // inputRef.style.height = '1.5rem'
                // let scheight = e.target.scrollHeight
                // inputRef.style.height = `${scheight}px`
            })
            inputRef.addEventListener('keyup', (e) => {
                inputRef.style.height = '1.5rem'
                let scheight = e.target.scrollHeight
                inputRef.style.height = `${scheight}px`
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef])
    const addCommentToFireBase = function (e) {
        e.preventDefault()
        const newComment = {
            parentId: currentParentId,
            uid: currentUser.uid,
            content: value,
            likes: [],
            postId: post.id,
        }
        try {
            addComment(newComment)
        } catch (e) {
            console.log(e)
        }
    }
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    return (
        <div>
            {currentUser?.uid && (
                <form className={clsx('comment-input', className)}>
                    <div className={clsx('input-box', 'd-flex')}>
                        {lastUserWasTouchedReply?.uid && (
                            <span className={clsx('tag')}>{`Reply to @${lastUserWasTouchedReply.full_name} :`}</span>
                        )}
                        <textarea
                            ref={callbackInput}
                            placeholder={`${lastUserWasTouchedReply?.uid ? '' : 'Add comment ...'}`}
                            value={value}
                            maxLength={150}
                            require='true'
                            onChange={handleOnchange}
                            className={clsx('input')}
                        />
                        <span className={clsx('limit-text')}>{`${value?.length}/150`}</span>
                        <SmileIcon />
                    </div>
                    <Button
                        onClick={addCommentToFireBase}
                        title='Post'
                        color={btnColor}
                        className={clsx('btn')}
                        disabled={disabled}
                    />
                </form>
            )}
            {!currentUser?.uid && (
                <div onClick={handleShowLogin} className={clsx('lets-login')}>
                    Please log in to comment
                </div>
            )}
            {showLogin && (
                <FullScreenModal handleShowPopup={handleShowLogin}>
                    <LoginPopup handleShowPopup={handleShowLogin} />
                </FullScreenModal>
            )}
        </div>
    )
}

export default CommentInput
