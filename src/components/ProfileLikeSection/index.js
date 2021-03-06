import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { PrivateIcon, ProfileLikeIcon } from '~/components/Icons'
import MovieContainer from '~/components/MovieContainer'
import { searchPostByArray } from '~/firebase'
import styles from './ProfileLikeSection.module.scss'
const clsx = classNames.bind(styles)
function ProfileLikeSection({ user, isCurrentUser, className }) {
    const [userLikePosts, setUserLikePosts] = useState([])
    const [lastIndex, setlastIndex] = useState(0)
    const limit = 39
    useEffect(() => {
        if (user?.likes?.length > 0 && user.likes?.length > lastIndex && userLikePosts?.length < limit) {
            searchPostByArray(user.likes.slice(lastIndex, lastIndex + 10), (data) => {
                setUserLikePosts((prev) => [...prev, ...data])
                setlastIndex((prev) => prev + 11)
            }).catch((err) => {
                console.log(err)
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, lastIndex])
    return (
        <div className={clsx('wrapper', className)}>
            {!isCurrentUser ? (
                <div className={clsx('private-box', 'd-flex')}>
                    <PrivateIcon />
                    <h4>No liked videos yet</h4>
                    <p>Videos liked by {user.full_name} are currently hidden</p>
                </div>
            ) : (
                <div>
                    {!user?.likes?.length > 0 ? (
                        <div className={clsx('private-box', 'd-flex')}>
                            <ProfileLikeIcon />
                            <h4>No liked videos yet</h4>
                            <p>Videos you liked will appear here</p>
                        </div>
                    ) : (
                        <MovieContainer posts={userLikePosts} className={clsx('main-content')} />
                    )}
                </div>
            )}
        </div>
    )
}

export default ProfileLikeSection
