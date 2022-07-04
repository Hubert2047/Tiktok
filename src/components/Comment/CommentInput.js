import classNames from 'classnames/bind'
import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { SmileIcon } from '~/components/Icons'
import Loading from '~/components/Loading'
import { alertConstain } from '~/staticData'
import { addComment } from '~/firebase'
import { commentActions } from '~/redux/commentSlice'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { toastActions } from '~/redux/toastSlice'
import { notification } from '~/staticData'
import Button from '../Button'
import { LoginPopup } from '../Popper'
import UserAvatar from '../UserAvatar'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function CommentInput({ post, className }) {
    const dispath = useDispatch()
    const inputRef = useSelector((state) => state.comment.inputRef)
    const lastUserWasTouchedReplyInfor = useSelector((state) => state.comment.lastUserWasTouchedReplyInfor)
    const currentUser = useSelector((state) => state.user.user)
    const [value, setValue] = useState('')
    // console.log(currentParentId, lastUserWasTouchedReply)
    const isExistReply = lastUserWasTouchedReplyInfor?.userWasTouched?.uid && true
    const callbackInput = useCallback((node) => {
        dispath(commentActions.setInputRef(node))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // when it moused then dispath input element to redux, then reply buttom can acces
    async function addCommentToFireBase(e) {
        e.preventDefault()
        // open loading
        dispath(containerPortalActions.setComponent(<Loading />))
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
            inputRef.textContent = ''
            //reset current reply user
            dispath(
                commentActions.setLastUserWasTouchedReplyInfor({
                    commentParentId: 'null',
                    userWasTouched: {},
                })
            )
            //reset input
            setValue('')
            //close loading
            dispath(containerPortalActions.setComponent(null))
        } catch (e) {
            console.log(e)
        }
    }
    const handleShowLogin = function () {
        dispath(containerPortalActions.setComponent(<LoginPopup />))
    }
    // console.log(value)
    const handleKeyDown = function (e) {
        //run first
        if (e.keyCode === 13 && value.length > 0) {
            try {
                addCommentToFireBase(e)
                e.preventDefault()
            } catch (error) {
                console.log(error)
            }
        }
    }
    const handleKeyPress = function (e) {
        //handle limit text. if text >150 then prevent key event so div input can not display value
        //second run
        if (e.target.textContent?.length > 149) {
            e.preventDefault()
            dispath(toastActions.addToast({ message: alertConstain.TEXT_LIMITED, mode: 'success' }))
        }
    }
    const handleInput = function (e) {
        //check if user copy  content >150
        //third run
        if (e.target.textContent.length > 149 && value === '') {
            e.target.textContent = ''
            dispath(toastActions.addToast({ message: alertConstain.TEXT_LIMITED, mode: 'success' }))
        }
    }
    const handleInputOnkeyUp = function (e) {
        //four run
        if (e.keyCode === 8 && value?.length === 0 && isExistReply) {
            //check to clear reply user.
            dispath(
                commentActions.setLastUserWasTouchedReplyInfor({
                    commentParentId: 'null',
                    userWasTouched: {},
                })
            )
        }
        //set value
        setValue(e.target.textContent)
    }
    return (
        <div>
            {currentUser?.uid ? (
                <div className={clsx('comment-input', className)}>
                    <div>
                        <UserAvatar user={currentUser} />
                    </div>
                    <div className={clsx('input-box', 'd-flex')}>
                        {isExistReply && (
                            <span className={clsx('tag')}>
                                {`Reply to @${lastUserWasTouchedReplyInfor?.userWasTouched?.full_name} :`}
                            </span>
                        )}
                        <div
                            ref={callbackInput}
                            suppressContentEditableWarning={true}
                            contentEditable={true}
                            data-placeholder={!isExistReply ? 'Add comment ...' : ''}
                            className={clsx('input')}
                            onKeyDown={handleKeyDown}
                            onKeyUp={handleInputOnkeyUp}
                            onKeyPress={handleKeyPress}
                            onInput={handleInput}></div>
                        <span
                            className={clsx('limit-text', {
                                limited: value.length > 149,
                            })}>{`${value?.length}/150`}</span>
                        <SmileIcon />
                    </div>
                    {value.length > 0 && (
                        <Button
                            onClick={addCommentToFireBase}
                            title='Post'
                            color={'color-white'}
                            bg='bg-primary'
                            className={clsx('btn')}
                        />
                    )}
                </div>
            ) : (
                <div onClick={handleShowLogin} className={clsx('lets-login')}>
                    Please log in to comment
                </div>
            )}
        </div>
    )
}

export default CommentInput
