import classNames from 'classnames/bind'
import { serverTimestamp } from 'firebase/firestore'
import { useCallback, useEffect, useState } from 'react'
import { HiArrowCircleUp } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { SmileIcon } from '~/components/Icons'
import { LoginPopup } from '~/components/Popper'
import FullScreenModal from '~/components/Popper/FullScreenModal'
import UserAvatar from '~/components/UserAvatar'
import { addComment } from '~/firebase'
import { commentActions } from '~/redux/commentSlice'
import styles from './MobileCommentInput.module.scss'
const clsx = classNames.bind(styles)

function MobileCommentInput({ post, className }) {
    const dispath = useDispatch()
    const inputRef = useSelector((state) => state.comment.inputRef)
    const lastUserWasTouchedReplyInfor = useSelector((state) => state.comment.lastUserWasTouchedReplyInfor)
    const currentUser = useSelector((state) => state.user.user)
    const [value, setValue] = useState('')
    const [showLogin, setShowLogin] = useState(false)
    const handleOnchange = function (e) {
        setValue(e.target.value)
    }
    // console.log(currentParentId, lastUserWasTouchedReply)
    const isExistReply = lastUserWasTouchedReplyInfor?.userWasTouched?.uid && true
    const callbackInput = useCallback((node) => {
        dispath(commentActions.setInputRef(node))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (inputRef) {
            inputRef.addEventListener('keydown', (e) => {
                if (e.keyCode === 8 && e.target.value.length === 0) {
                    dispath(
                        commentActions.setLastUserWasTouchedReplyInfor({
                            commentParentId: 'null',
                            userWasTouched: {},
                        })
                    )
                }
            })
            inputRef.addEventListener('keyup', (e) => {
                inputRef.style.height = '1.5rem'
                let scheight = e.target.scrollHeight
                if (scheight > 230) {
                    inputRef.style.height = `230px`
                    return
                }
                inputRef.style.height = `${scheight}px`
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputRef])
    const addCommentToFireBase = async function (e) {
        e.preventDefault()
        const newComment = {
            parentId: lastUserWasTouchedReplyInfor.commentParentId,
            uid: currentUser.uid,
            content: value,
            likes: [],
            postId: post.id,
            createdAt: serverTimestamp(),
        }
        try {
            await addComment(newComment)
            dispath(
                commentActions.setLastUserWasTouchedReplyInfor({
                    commentParentId: 'null',
                    userWasTouched: {},
                })
            )
            setValue('')
        } catch (e) {
            console.log(e)
        }
    }
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    return (
        <div>
            {currentUser?.uid ? (
                <div className={clsx('wrapper', className)}>
                    <div>
                        <UserAvatar user={currentUser} />
                    </div>
                    <div className={clsx('input-box', 'd-flex')}>
                        <textarea
                            ref={callbackInput}
                            placeholder={`${
                                isExistReply
                                    ? `@${lastUserWasTouchedReplyInfor.userWasTouched.full_name}`
                                    : 'Add comment ...'
                            }`}
                            value={value}
                            maxLength={150}
                            require='true'
                            onChange={handleOnchange}
                            className={clsx('input')}
                        />
                        <span className={clsx('limit-text')}>{`${value?.length}/150`}</span>
                        <SmileIcon />
                    </div>
                    {value?.length > 0 && (
                        <button onClick={addCommentToFireBase} className={clsx('flex-center')}>
                            <HiArrowCircleUp className={clsx('submit-btn')} />
                        </button>
                    )}
                    {/* <Button title='Post' color={btnColor} disabled={disabled} /> */}
                </div>
            ) : (
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

export default MobileCommentInput
