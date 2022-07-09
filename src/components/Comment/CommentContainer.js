import classNames from 'classnames/bind'
import { memo, useEffect, useState } from 'react'
import { Comment } from '~/components/Comment'
import { getComments } from '~/firebase'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function CommentContainer({ post, className }) {
    const [rootComments, setRootComments] = useState([])
    const updateCommentState = function (data) {
        // console.log(data.comment)
        setRootComments(data)
        console.log('data comemet', data, post.id)
        // setLastDocComment(data.lastDoc)
    }

    useEffect(() => {
        getComments({
            postId: post.id,
            callback: updateCommentState,
            parentId: 'null',
        }).catch((e) => console.log(e))
        console.log('run commentcontainer', post.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [post])

    return (
        <div className={clsx('comment-container', className, 'd-flex')}>
            {rootComments.map((rootComment) => {
                return <Comment key={rootComment.id} rootCommentId={rootComment.id} comment={rootComment} post={post} />
            })}
        </div>
    )
}

export default memo(CommentContainer)
