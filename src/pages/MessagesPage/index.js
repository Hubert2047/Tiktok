import classNames from 'classnames/bind'
import React, { useEffect, useState } from 'react'
import UserAvatar from '~/components/UserAvatar'
import { getSuggestFollowing } from '~/firebase'
import styles from './MessagesPage.module.scss'

const clsx = classNames.bind(styles)
function MessagesPage() {
    const [users, setUsers] = useState([])
    console.log(users)
    useEffect(() => {
        const getSunggestFollowingData = async function () {
            const data = await getSuggestFollowing('', 'more')

            setUsers(data)
        }
        getSunggestFollowingData()
    }, [])
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('conversation-list')}>
                <div className={clsx('list-header')}>
                    <h4 className={clsx('title')}>Messages</h4>
                </div>
                <div className={clsx('list-content')}>
                    {users?.map((user) => {
                        return (
                            <div key={user.id} className={clsx('user-container', 'd-flex')}>
                                <UserAvatar user={user} height={'5.6rem'} className={clsx('list-user-avatar')} />
                                <div className={clsx('user-infor', 'd-flex')}>
                                    <span className={clsx('list-user-name')}>{user.full_name}</span>
                                    <div className={clsx('infor-extract-box', 'd-flex')}>
                                        <span className={clsx('infor-extract')}>
                                            this is an extract box fefefefefefefefefefee his is an extract box
                                            fefefefefefefefefefee
                                        </span>
                                        <span className={clsx('list-user-time')}>6/7/2022</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className={clsx('conversation-container')}>
                <div className={clsx('conversation-header', 'd-flex ')}>
                    <UserAvatar user={users[0]} height={'4.8rem'} />
                    <div className={clsx('conversation-infor', 'd-flex')}>
                        <span>{users[0]?.full_name}</span>
                        <span>{`@${users[0]?.nickname}`}</span>
                    </div>
                </div>
                <div className={clsx('conversation-main')}></div>
                <div className={clsx('conversation-bottom')}></div>
            </div>
        </div>
    )
}

export default MessagesPage
