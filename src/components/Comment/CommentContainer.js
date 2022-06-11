import classNames from 'classnames/bind'
import { Comment } from '~/components/Comment'
import { floowingUsers } from '~/staticData'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)
const comments = [
    {
        id: 1,
        text: '厲害😳',
        user: floowingUsers[0],
        subcomment: [
            {
                id: 2,
                text: '🥰🥰',
                user: floowingUsers[8],
            },
            {
                id: 3,
                text: '🥰🥰',
                user: floowingUsers[6],
            },
            {
                id: 4,
                text: '🥰🥰',
                user: floowingUsers[4],
            },
        ],
    },
    {
        id: 2,
        text: '厲害😳',
        user: floowingUsers[3],
        subcomment: [
            {
                id: 2,
                text: '🥰🥰',
                user: floowingUsers[3],
            },
            {
                id: 3,
                text: '🥰🥰',
                user: floowingUsers[5],
            },
            {
                id: 4,
                text: '🥰🥰',
                user: floowingUsers[10],
            },
        ],
    },
    {
        id: 3,
        text: '厲害😳',
        user: floowingUsers[4],
        subcomment: [
            {
                id: 2,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 3,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 4,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
        ],
    },
    {
        id: 4,
        text: '厲害😳',
        user: floowingUsers[4],
        subcomment: [
            {
                id: 2,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 3,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 4,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
        ],
    },
    {
        id: 5,
        text: '厲害😳',
        user: floowingUsers[4],
        subcomment: [
            {
                id: 2,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 3,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 4,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
        ],
    },
    {
        id: 6,
        text: '厲害😳',
        user: floowingUsers[4],
        subcomment: [
            {
                id: 2,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 3,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
            {
                id: 4,
                text: '🥰🥰',
                user: floowingUsers[1],
            },
        ],
    },
]
function CommentContainer() {
    return (
        <div className={clsx('comment-container', 'd-flex')}>
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
        </div>
    )
}

export default CommentContainer
