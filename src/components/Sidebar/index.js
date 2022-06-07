/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import { useEffect, useState } from 'react'
import Button from '~/components/Button'
import { FollowingIcon, HomeIcon, VideoIcon } from '~/components/Icons'
import LinkContainer from '~/components/LinkContainer'
import UserContainer from '~/components/UserContainer'
import { discovers, floowingUsers, footerData } from '~/staticData'
import DiscoverContainer from '../DiscoverContainer '
import styles from './Sidebar.module.scss'
const clsx = classNames.bind(styles)
const getData = function (type) {
    if (type === 'less') {
        return floowingUsers.slice(0, 5)
    }
    return floowingUsers
}
function Sidebar({ className }) {
    const [followerData, setFollowerData] = useState([])
    const currentFollowerData = followerData.at(-1)
    const [seeText, setSeeText] = useState('See all')
    const [isCallApi, setCallApi] = useState(false)
    useEffect(() => {
        if (seeText === 'See less') {
            const data = getData()
            setFollowerData((prev) => [...prev, data])
        } else {
            const data = getData('less')
            setFollowerData([data])
        }
    }, [isCallApi])
    const handleSeeMoreClick = function (seeText) {
        if (seeText === 'See all') {
            setSeeText('See less')
            setCallApi(true)
        } else {
            setSeeText('See all')
        }
        if (followerData?.length > 1) {
            setFollowerData((prev) => {
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
                data={currentFollowerData}
                seeText={seeText}
                className={clsx('suggest-list')}
            />
            <UserContainer title={'Following Accounts'} className={clsx('suggest-list')} />
            <DiscoverContainer discovers={discovers} />
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
