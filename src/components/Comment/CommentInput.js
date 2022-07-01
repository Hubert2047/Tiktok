import classNames from 'classnames/bind'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { SmileIcon } from '~/components/Icons'
import { addComment } from '~/firebase'
import { commentActions } from '~/redux/commentSlice'
import { notification } from '~/staticData'
import Button from '../Button'
import { LoginPopup } from '../Popper'
import FullScreenModal from '../Popper/FullScreenModal'
import UserAvatar from '../UserAvatar'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function CommentInput({ post, className }) {
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
    const btnColor = value ? 'color-primary' : 'color-grey'
    const disabled = !value ? true : false
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
    async function addCommentToFireBase(e) {
        e.preventDefault()
        const newComment = {
            id: uuidv4(),
            parentId: lastUserWasTouchedReplyInfor.commentParentId,
            uid: currentUser.uid,
            content: value,
            likes: [],
            postId: post.id,
            createdAt: new Date(),
        }
        const newNotification = {
            id: uuidv4(),
            createdAt: new Date(),
            notificationType: notification.constain.COMMENTS,
            comment: value,
            fromUid: currentUser.uid,
            postId: post.id,
            poster: post.poster,
            isRead: false,
        }
        try {
            await addComment(currentUser, post.uid, newComment, newNotification)
            //reset current reply user
            dispath(
                commentActions.setLastUserWasTouchedReplyInfor({
                    commentParentId: 'null',
                    userWasTouched: {},
                })
            )
            //reset input
            setValue('')
            inputRef.style.height = '1.5rem' //reset inbox height
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
                <div className={clsx('comment-input', className)}>
                    <div>
                        <UserAvatar user={currentUser} />
                    </div>
                    <div className={clsx('input-box', 'd-flex')}>
                        {/* {isExistReply && (
                            <span
                                className={clsx(
                                    'tag'
                                )}>{`Reply to @${lastUserWasTouchedReplyInfor?.userWasTouched?.full_name} :`}</span>
                        )} */}
                        <textarea
                            ref={callbackInput}
                            placeholder={`${
                                isExistReply
                                    ? `Reply to @${lastUserWasTouchedReplyInfor?.userWasTouched?.full_name}`
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

                    <Button
                        onClick={addCommentToFireBase}
                        title='Post'
                        color={btnColor}
                        className={clsx('btn')}
                        disabled={disabled}
                    />
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

export default CommentInput
