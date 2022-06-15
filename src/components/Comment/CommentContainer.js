import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { Comment } from '~/components/Comment'
import { getComments } from '~/firebase'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function CommentContainer({ post, className }) {
    const [rootComments, setRootComments] = useState()
    useEffect(() => {
        try {
            getComments(post.id, (data) => {
                setRootComments(data)
            })
        } catch (e) {
            console.log(e)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className={clsx('comment-container', className, 'd-flex')}>
            {rootComments?.map((rootComment) => {
                return (
                    <Comment
                        key={rootComment.id}
                        rootCommentId={rootComment.id}
                        comment={rootComment}
                        postId={post.id}
                    />
                )
            })}
        </div>
    )
}

export default CommentContainer
