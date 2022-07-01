import classNames from 'classnames/bind'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Comment } from '~/components/Comment'
import { getComments } from '~/firebase'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function CommentContainer({ post, className }) {
    const [rootComments, setRootComments] = useState()
    const [lastDocComment, setLastDocComment] = useState()
    const [hasMore, setHasMore] = useState(true)
    const observer = useRef()
    const lastComment = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    if (rootComments?.length < 5 && !hasMore) return
                    getMoreComment()
                }
            })
            if (node) observer.current.observe(node)
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lastDocComment]
    )
    const updateCommentState = function (data) {
        setRootComments(data.comments)
        setLastDocComment(data.lastDoc)
    }
    const updateGetMoreCommentState = function (data) {
        if (data?.comments?.length < 1) {
            setHasMore(false)
            return
        }
        setRootComments([...rootComments, ...data.comments])
        setLastDocComment(data.lastDoc)
    }
    useEffect(() => {
        getComments({
            postId: post.id,
            callback: updateCommentState,
            parentId: 'null',
            lastDocComment: 0,
            commentLimit: 8,
        }).catch((e) => console.log(e))

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const getMoreComment = function () {
        getComments({
            postId: post.id,
            callback: updateGetMoreCommentState,
            parentId: 'null',
            lastDocComment: lastDocComment,
            commentLimit: 8,
        }).catch((e) => console.log(e))
    }
    return (
        <div className={clsx('comment-container', className, 'd-flex')}>
            {rootComments?.map((rootComment, index) => {
                if (rootComments.length - 2 === index) {
                    return (
                        <Comment
                            ref={lastComment}
                            key={rootComment.id}
                            rootCommentId={rootComment.id}
                            comment={rootComment}
                            post={post}
                        />
                    )
                } else {
                    return (
                        <Comment
                            key={rootComment.id}
                            rootCommentId={rootComment.id}
                            comment={rootComment}
                            post={post}
                        />
                    )
                }
            })}
        </div>
    )
}

export default memo(CommentContainer)
