import classNames from 'classnames/bind'
import { useState } from 'react'
import Button from '~/components/Button'
import GetApp from '~/components/GetApp'
import { HorizontalThreeDot, LockIcon, PrivateIcon, ShareWhiteIcon } from '~/components/Icons'
import Menu from '~/components/Menu'
import MovieContainer from '~/components/MovieContainer'
import UserAvatar from '~/components/UserAvatar'
import UserName from '~/components/UserName'
import { floowingUsers, movies, profileActions, shareItems } from '~/staticData'
import styles from './Profile.module.scss'

const clsx = classNames.bind(styles)

function Profile() {
    const [active, setActive] = useState(false)
    const handleVideoBtnClick = function () {
        setActive(false)
    }
    const handleLikeBtnClick = function () {
        setActive(true)
    }
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('header', 'd-flex')}>
                <div className={clsx('header-left')}>
                    <div className={clsx('share-infor', 'd-flex')}>
                        <UserAvatar user={floowingUsers[0]} height='11.6rem' />
                        <div className={clsx('share-title', 'd-flex')}>
                            <UserName className={clsx('name')} user={floowingUsers[0]} />
                            <Button
                                title='Follow'
                                type='btn-primary'
                                bg='bg-primary'
                                color='color-white'
                                className={clsx('follow-btn')}
                            />
                        </div>
                    </div>
                    <div className={clsx('count-infor', 'd-flex')}>
                        <div className={clsx('count-infor-box', 'd-flex')}>
                            <strong>123K</strong>
                            <span>Following</span>
                        </div>
                        <div className={clsx('count-infor-box', 'd-flex')}>
                            <strong>123K</strong>
                            <span>Followers</span>
                        </div>
                        <div className={clsx('count-infor-box', 'd-flex')}>
                            <strong>123K</strong>
                            <span>Likes</span>
                        </div>
                    </div>
                    <p className={clsx('desc-infor')}>
                        純屬娛樂/如有巧合/純屬虛構 📣對嘴搞笑，🎬就是愛演 請不要（連續按❤️謝謝）
                        人可以有「不同立場」但，不可以「沒有是非」
                    </p>
                </div>
                <div className={clsx('header-right', 'd-flex')}>
                    <Menu menu={shareItems}>
                        <div>
                            <ShareWhiteIcon className={clsx('share-icon-btn')} />
                        </div>
                    </Menu>
                    <Menu menu={profileActions}>
                        <div>
                            <HorizontalThreeDot />
                        </div>
                    </Menu>
                </div>
            </div>
            <div className={clsx('content')}>
                <div className={clsx('top-content', 'd-flex')}>
                    <Button onClick={handleVideoBtnClick} title='Videos' className={clsx('video-btn')} />
                    <Button
                        onClick={handleLikeBtnClick}
                        title='Liked'
                        className={clsx('liked-btn')}
                        icon={<LockIcon />}
                    />
                    <div className={clsx('line', { 'active-btn': active })}></div>
                </div>
                {active ? (
                    <div className={clsx('private-section', 'grid-center')}>
                        <div className={clsx('private-box', 'd-flex')}>
                            <PrivateIcon />
                            <h4>This user's liked videos are private</h4>
                            <p>Videos liked by imallentsai are currently hidden</p>
                        </div>
                    </div>
                ) : (
                    <MovieContainer movies={movies} className={clsx('main-content')}>
                        <GetApp />
                    </MovieContainer>
                )}
            </div>
        </div>
    )
}

export default Profile
