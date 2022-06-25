/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '~/components/Button'
import { FollowingIcon, HomeIcon, VideoIcon } from '~/components/Icons'
import LinkContainer from '~/components/LinkContainer'
import UserContainer from '~/components/UserContainer'
import { getFollowing, getSuggestFollowing } from '~/firebase'
import { discovers, footerData } from '~/staticData'
import DiscoverContainer from '../DiscoverContainer'
import styles from './Sidebar.module.scss'
const clsx = classNames.bind(styles)

function Sidebar({ className }) {
    const currentUser = useSelector((state) => state.user.user)
    // console.log('re-render sidebar')
    const [suggestFollowingData, setSuggestFollowingData] = useState([])
    const [followingData, setFollowingData] = useState([])
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
                const data = await getSuggestFollowing(currentUser?.uid, 'more')
                setSuggestFollowingData((prev) => [...prev, data])
            } else {
                const data = await getSuggestFollowing(currentUser?.uid, 'less')
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
    return (
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
    )
}

export default Sidebar
