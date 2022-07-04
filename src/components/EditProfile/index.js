import classNames from 'classnames/bind'
import React from 'react'
import { useSelector } from 'react-redux'
import Button from '../Button'
import { ChangeIcon, XIcon } from '../Icons'
import Image from '../Image'
import styles from './EditProfile.module.scss'

const clsx = classNames.bind(styles)
function EditProfile() {
    const currentUser = useSelector((state) => state.user.user)
    const handleOnChange = function () {}
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('header', 'd-flex')}>
                <h4 className={clsx('title')}>Edit profile</h4>
                <XIcon className={clsx('close-icon')} />
            </div>
            <div className={clsx('middle')}>
                <div className={clsx('item-box', 'd-flex')}>
                    <p className={clsx('right-text')}>Profile photo</p>
                    <div className={clsx('img-box')}>
                        <Image src={currentUser.avatar} className={clsx('avatar')} />
                        <div className={clsx('edit-photo-box', 'flex-center')}>
                            <ChangeIcon />
                        </div>
                        <input type='file' className={clsx('file-input')} />
                    </div>
                </div>
                <div className={clsx('item-box', 'd-flex')}>
                    <p className={clsx('right-text')}>User Name</p>
                    <div className={clsx('user-name-box', 'd-flex')}>
                        <input
                            name='user-name'
                            onChange={handleOnChange}
                            className={clsx('input', 'valid')}
                            value={currentUser.full_name}
                        />
                        <span>{`www.tiktok.com/@${currentUser.full_name}`}</span>
                        <p className={clsx('user-name-desc')}>
                            Usernames can only contain letters, numbers, underscores, and periods. Changing your
                            username will also change your profile link.
                        </p>
                    </div>
                </div>
                <div className={clsx('item-box', 'd-flex')}>
                    <p className={clsx('right-text')}>Nick Name</p>
                    <input
                        name='nick-name'
                        onChange={handleOnChange}
                        className={clsx('input', 'valid')}
                        value={currentUser.full_name}
                    />
                </div>
                <div className={clsx('item-box', 'd-flex')}>
                    <p className={clsx('right-text')}>Bio</p>
                    <div className={clsx('input-box', 'valid', 'd-flex')}>
                        <textarea className={clsx('area-input', 'valid')} placeholder='Bio' />
                        <span className={clsx('text-limit')}>{`0/80`}</span>
                    </div>
                </div>
            </div>
            <div className={clsx('bottom', 'd-flex')}>
                <Button title={'Cancel'} border='border-grey' size='size-md' />
                <Button title={'Save'} bg='bg-primary' color='color-white' size='size-md' />
            </div>
        </div>
    )
}

export default EditProfile
