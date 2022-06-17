/* eslint-disable react-hooks/rules-of-hooks */
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CommentIcon, HeartIcon, ShareIcon } from '~/components/Icons'
import Menu from '~/components/Menu'
import { getCommentCount } from '~/firebase'
import { formatCountNumber } from '~/helper'
import { useVideoPageRoute } from '~/hooks'
import { shareItems } from '~/staticData'
import styles from './VideoFooter.module.scss'

const clsx = classNames.bind(styles)
function VideoFooter({ className, post }) {
    const navigate = useNavigate()
    const handleOnClickComment = function () {
        // console.log(post)
        navigate(useVideoPageRoute(post))
    }
    const [commentCount, setCommentCount] = useState()
    useEffect(() => {
        getCommentCount(post.id, (data) => {
            setCommentCount(data)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            <div className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <HeartIcon />
                </div>
                <span>{formatCountNumber(post?.likes)}</span>
            </div>
            <div onClick={handleOnClickComment} className={clsx('action-container', 'd-flex')}>
                <div className={clsx('box', 'grid-center')}>
                    <CommentIcon />
                </div>
                <span>{commentCount}</span>
            </div>
            <div className={clsx('action-container', 'd-flex')}>
                <Menu menu={shareItems} placement={'top-start'} link={post.video}>
                    <div className={clsx('box', 'grid-center')}>
                        <ShareIcon />
                    </div>
                </Menu>
                <span>{formatCountNumber(post?.shares)}</span>
            </div>
        </div>
    )
}

export default VideoFooter
