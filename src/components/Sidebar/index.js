/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '~/components/Button'
import { FollowingIcon, HomeIcon, VideoIcon } from '~/components/Icons'
import LinkContainer from '~/components/LinkContainer'
import UserContainer from '~/components/UserContainer'
import { getFollowing, getSuggestFollowing } from '~/firebase'
import { discovers, footerData } from '~/staticData'
import DiscoverContainer from '../DiscoverContainer'
import { FullScreenContainer, LoginPopup } from '../Popper'
import styles from './Sidebar.module.scss'
const clsx = classNames.bind(styles)

function Sidebar({ className }) {
    const currentUser = useSelector((state) => state.user.user)
    // console.log('re-render sidebar')
    const [suggestFollowingData, setSuggestFollowingData] = useState([])
    const [followingData, setFollowingData] = useState([])
    const [showLogin, setShowLogin] = useState(false)
    const currentSuggestFollowingData = suggestFollowingData[suggestFollowingData?.length - 1]
    const [seeText, setSeeText] = useState('See all')
    const [isCallApi, setCallApi] = useState(false)
    useEffect(() => {
        const getFollowingData = async function () {
            const data = await getFollowing(currentUser?.following || [])
            setFollowingData(data)
        }
        const getSunggestFollowingData = async function () {
            if (seeText === 'See less') {
                const data = await getSuggestFollowing(currentUser, 10)
                setSuggestFollowingData((prev) => [...prev, data])
            } else {
                const data = await getSuggestFollowing(currentUser, 5)
                setSuggestFollowingData([data])
            }
        }
        //if use login then render following data otherwise render nothing
        if (currentUser?.uid) {
            getFollowingData()
        } else {
            setFollowingData([])
        }
        getSunggestFollowingData()
    }, [isCallApi, currentUser])
    const handleSeeMoreClick = function (seeText) {
        if (seeText === 'See all') {
            setSeeText('See less')
            setCallApi(true)
        } else {
            setSeeText('See all')
        }
        if (suggestFollowingData?.length > 1) {
            setSuggestFollowingData((prev) => {
                const [first, second] = prev
                return [second, first]
            })
        }
    }
    const handleShowLogin = function () {
        setShowLogin((prev) => !prev)
    }
    return (
        <Fragment>
            {showLogin && (
                <FullScreenContainer handleShowPopup={handleShowLogin}>
                    <LoginPopup handleShowPopup={handleShowLogin} />
                </FullScreenContainer>
            )}
            <div className={clsx('wrapper', className)}>
                <div className={clsx('action')}>
                    <Button
                        to={'/'}
                        size='size-big'
                        icon={<HomeIcon />}
                        title='For You'
                        color={'color-primary'}
                        className={clsx('action-btn')}
                    />
                    <Button
                        to={'/'}
                        size='size-big'
                        icon={<FollowingIcon />}
                        title='Following'
                        color={'color-black'}
                        className={clsx('action-btn')}
                    />
                    <Button
                        to={'/'}
                        size='size-big'
                        icon={<VideoIcon />}
                        title='LIVE'
                        color={'color-black'}
                        className={clsx('action-btn')}
                    />
                </div>
                {!currentUser?.uid && (
                    <div onClick={handleShowLogin} className={clsx('login-box', 'd-flex')}>
                        <p className={clsx('login-text')}>Log in to follow creators, like videos, and view comments.</p>
                        <Button title={'Login'} size='size-big' border='border-primary' color='color-primary' />
                    </div>
                )}
                <UserContainer
                    title={'Suggested Accounts'}
                    handleSeeMoreClick={handleSeeMoreClick}
                    data={currentSuggestFollowingData}
                    seeText={seeText}
                    className={clsx('suggest-list')}
                />
                <UserContainer
                    title={'Following Accounts'}
                    data={followingData}
                    className={clsx('suggest-list', 'following-list')}
                />
                <DiscoverContainer discovers={discovers} className={clsx('discover')} />
                <div className={clsx('footer')}>
                    {footerData?.map((data) => {
                        return <LinkContainer key={data.id} data={data.data} />
                    })}
                    <div className={clsx('copy-right')}>© 2022 TikTok</div>
                </div>
            </div>
        </Fragment>
    )
}

export default Sidebar
