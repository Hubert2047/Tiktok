/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '~/components/Button'
import { FollowingIcon, HomeIcon, VideoIcon } from '~/components/Icons'
import LinkContainer from '~/components/LinkContainer'
import UserContainer from '~/components/UserContainer'
import { getFollowing, getSuggestFollowing } from '~/firebase'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { discovers, footerData } from '~/staticData'
import DiscoverContainer from '../DiscoverContainer'
import { LoginPopup } from '../Popper'
import styles from './Sidebar.module.scss'
const clsx = classNames.bind(styles)

function Sidebar({ className }) {
    const dispath = useDispatch()
    const currentUser = useSelector((state) => state.user.user)
    // const navigate = useNavigate()

    // console.log('re-render sidebar')
    const [activeBtnTitle, setActiveBtnTitle] = useState('For You')
    const [suggestFollowingData, setSuggestFollowingData] = useState([])
    const [followingData, setFollowingData] = useState([])
    const currentSuggestFollowingData = suggestFollowingData[suggestFollowingData?.length - 1]
    const [seeText, setSeeText] = useState('See all')
    const [isCallApi, setCallApi] = useState(false)
    useEffect(() => {
        const getFollowingData = async function () {
            const data = await getFollowing(currentUser?.following.slice(0, 9) || [])
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
        dispath(containerPortalActions.setComponent({ component: <LoginPopup />, onClickOutside: true }))
    }
    const handleBtnOnClick = function (title) {
        setActiveBtnTitle(title)
    }
    return (
        <Fragment>
            <div className={clsx('wrapper', className)}>
                <div className={clsx('action')}>
                    <Button
                        onClick={() => {
                            handleBtnOnClick('For You')
                        }}
                        to={'/'}
                        size='size-big'
                        icon={<HomeIcon className={clsx({ 'active-btn': activeBtnTitle === 'For You' })} />}
                        title='For You'
                        color={'color-grey'}
                        className={clsx('action-btn', { 'active-btn': activeBtnTitle === 'For You' })}
                    />
                    <Button
                        to={'/'}
                        onClick={() => {
                            handleBtnOnClick('Following')
                        }}
                        size='size-big'
                        icon={<FollowingIcon className={clsx({ 'active-btn': activeBtnTitle === 'Following' })} />}
                        title='Following'
                        color={'color-grey'}
                        className={clsx('action-btn', { 'active-btn': activeBtnTitle === 'Following' })}
                    />
                    <Button
                        to={'/'}
                        onClick={() => {
                            handleBtnOnClick('LIVE')
                        }}
                        size='size-big'
                        icon={<VideoIcon className={clsx({ 'active-btn': activeBtnTitle === 'LIVE' })} />}
                        title='LIVE'
                        color={'color-grey'}
                        className={clsx('action-btn', { 'active-btn': activeBtnTitle === 'LIVE' })}
                    />
                </div>
                {!currentUser?.uid && (
                    <div onClick={handleShowLogin} className={clsx('login-box')}>
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
