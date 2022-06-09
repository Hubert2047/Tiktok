import classNames from 'classnames/bind'
import UserAvatar from '~/components/UserAvatar'
import UserName from '~/components/UserName'
import Video from '~/components/Video'
import { floowingUsers } from '~/staticData'
import Button from '../Button'
import { MusicIcon } from '../Icons'
import styles from './PostContainer.module.scss'
const clsx = classNames.bind(styles)
function PostContainer() {
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <UserAvatar user={floowingUsers[0]} className={clsx('avatar')} />
            <div className={clsx('content')}>
                <div className={clsx('header', 'd-flex')}>
                    <UserName user={floowingUsers[0]} className={clsx('name')} />
                    <p className={clsx('disc')}>Let’s go Fishing 🎣</p>
                    <div className={clsx('tag')}>
                        <MusicIcon />
                        original sound - Zuvaan_Masveriya
                    </div>
                </div>
                <Video />
            </div>
            <Button title='Follow' border={'border-primary'} size={'size-sm'} color={'color-primary'} />
        </div>
    )
}

export default PostContainer
