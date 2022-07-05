import classNames from 'classnames/bind'
import React, { Fragment, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '~/components/Button'
import { ChangeIcon, XIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { updateUser, uploadFile } from '~/firebase'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { toastActions } from '~/redux/toastSlice'
import { alertConstain } from '~/staticData'
import Loading from '../Loading'
import EditPhoto from './EditPhoto'
import styles from './EditProfile.module.scss'

const clsx = classNames.bind(styles)
function EditProfile() {
    const dispath = useDispatch()
    const currentUser = useSelector((state) => state.user.user)
    const [inputValue, setInputValue] = useState(1)
    const [img, setImg] = useState(null)
    const [fileName, setFileName] = useState('') //just for testing to save photo to firebase storage
    const [data, setData] = useState({
        full_name: currentUser.full_name,
        nickname: currentUser.nickname,
        desc: currentUser.desc,
        avatar: currentUser.avatar,
    })
    const hasUserChangedData = useMemo(() => {
        return (
            currentUser.full_name !== data.full_name ||
            currentUser.nickname !== data.nickname ||
            currentUser.desc !== data.desc ||
            currentUser.avatar !== data.avatar
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    const handleOnChange = function (e) {
        setData((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
        if (e.target.name === 'desc' && e.target.value.length > 79) {
            dispath(toastActions.addToast({ message: alertConstain.TEXT_LIMITED, mode: 'success' }))
        }
    }
    const handleOnCancle = function () {
        dispath(containerPortalActions.setComponent(null))
    }
    const handleRangeOnChange = function (e) {
        setInputValue(e.target.value)
    }
    const handleBackToEditProfile = function () {
        setImg(null)
    }
    const handleOnSelecFile = function (e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            setImg(reader.result)
            setFileName(e.target.files[0])
        }
    }
    const validateUpdataData = function () {
        if (!data?.avatar) {
            dispath(toastActions.addToast({ message: 'photo is null', mode: 'success' }))
            return false
        }
        if (!data?.full_name.length > 0) {
            dispath(toastActions.addToast({ message: 'User name is null', mode: 'success' }))
            return false
        }
        if (!data?.nickname.length > 0) {
            dispath(toastActions.addToast({ message: 'Nick name is null', mode: 'success' }))
            return false
        }
        return true
    }
    const handleUpdateUser = async function () {
        try {
            if (!validateUpdataData()) return
            dispath(containerPortalActions.setComponent(null)) //close edit profile
            let photoUrl = data.avatar
            if (photoUrl !== currentUser.avatar) {
                dispath(containerPortalActions.setComponent({ component: <Loading />, onClickOutside: true }))
                //upload image to firebase
                photoUrl = await uploadFile(data.avatar, `images/${fileName}`)
                dispath(containerPortalActions.setComponent(null)) //close edit profile
            }
            await updateUser({ ...data, avatar: photoUrl }, currentUser.uid)

            dispath(toastActions.addToast({ message: 'Profile have been updated !', mode: 'success' }))
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            dispath(containerPortalActions.setComponent(null))
            console.log(error)
        }
    }
    return (
        <div className={clsx('wrapper')}>
            {img ? (
                <EditPhoto
                    src={img}
                    inputValue={inputValue}
                    onScaleChange={handleRangeOnChange}
                    onBack={handleBackToEditProfile}
                    setImg={setImg}
                    setData={setData}
                />
            ) : (
                <Fragment>
                    <div className={clsx('header', 'd-flex')}>
                        <h4 className={clsx('title')}>Edit profile</h4>
                        <XIcon onClick={handleOnCancle} className={clsx('close-icon')} />
                    </div>
                    <div className={clsx('middle')}>
                        <div className={clsx('item-box', 'd-flex')}>
                            <p className={clsx('right-text')}>Profile photo</p>
                            <div className={clsx('img-box')}>
                                <Image src={data.avatar} className={clsx('avatar')} />
                                <div className={clsx('edit-photo-box', 'flex-center')}>
                                    <ChangeIcon />
                                </div>
                                <input
                                    onChange={handleOnSelecFile}
                                    type='file'
                                    className={clsx('file-input')}
                                    accept='image/*'
                                />
                            </div>
                        </div>
                        <div className={clsx('item-box', 'd-flex')}>
                            <p className={clsx('right-text')}>User Name</p>
                            <div className={clsx('user-name-box', 'd-flex')}>
                                <input
                                    name='full_name'
                                    onChange={handleOnChange}
                                    className={clsx('input', 'valid')}
                                    value={data.full_name}
                                />
                                <span>{`www.tiktok.com/@${data.full_name}`}</span>
                                <p className={clsx('user-name-desc')}>
                                    Usernames can only contain letters, numbers, underscores, and periods. Changing your
                                    username will also change your profile link.
                                </p>
                            </div>
                        </div>
                        <div className={clsx('item-box', 'd-flex')}>
                            <p className={clsx('right-text')}>Nick Name</p>
                            <input
                                name='nickname'
                                onChange={handleOnChange}
                                className={clsx('input', 'valid')}
                                value={data.nickname}
                            />
                        </div>
                        <div className={clsx('item-box', 'd-flex')}>
                            <p className={clsx('right-text')}>Bio</p>
                            <div className={clsx('input-box', 'valid', 'd-flex')}>
                                <textarea
                                    onChange={handleOnChange}
                                    value={data?.desc}
                                    name='desc'
                                    maxLength={80}
                                    className={clsx('area-input', 'valid')}
                                    placeholder='Bio'
                                />
                                <span
                                    className={clsx('text-limit', {
                                        'text-limited': data.desc?.length > 79,
                                    })}>{`${data.desc?.length}/80`}</span>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('bottom', 'd-flex')}>
                        <Button onClick={handleOnCancle} title={'Cancel'} border='border-grey' size='size-md' />
                        <Button
                            onClick={handleUpdateUser}
                            title={'Save'}
                            border={hasUserChangedData ? '' : 'border-grey'}
                            bg={hasUserChangedData ? 'bg-primary' : 'bg-grey'}
                            color={hasUserChangedData ? 'color-white' : 'color-grey'}
                            size='size-md'
                            disabled={!hasUserChangedData}
                        />
                    </div>
                </Fragment>
            )}
        </div>
    )
}

export default EditProfile
