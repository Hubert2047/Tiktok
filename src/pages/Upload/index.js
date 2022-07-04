/* eslint-disable react-hooks/exhaustive-deps */
import classNames from 'classnames/bind'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Fragment, useEffect, useRef, useState } from 'react'
import { HiOutlineCheckCircle } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import Button from '~/components/Button'
import {
    ArrowIcon,
    CheckBoxIcon,
    CreateVideoIcon,
    HagTag,
    HomeIcon,
    InboxIcon,
    ProfileIcon,
    SearchIcon,
    TagUserIcon,
    UploadIcon,
    WramIcon,
} from '~/components/Icons'
import Image from '~/components/Image'
import { alertConstain } from '~/staticData'
import { addPost, uploadFile } from '~/firebase'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { toastActions } from '~/redux/toastSlice'
import MobileSidebar from '../../mobile/components/MobileSidebar/index'
import Spiner from '../../mobile/components/MobileVideoFooter/Spiner'
import LoadCircle from './LoadCircle'
import styles from './Upload.module.scss'
const clsx = classNames.bind(styles)

let intervalId
function Upload() {
    const dispath = useDispatch()
    const currentUser = useSelector((state) => state.user.user)
    const contentRef = useRef()
    const [showMenu, setShowMenu] = useState(false)
    const [copyrightCheck, setCopyrightCheck] = useState(false)
    const [posters, setPosters] = useState([])
    const [onloadVideoPrivew, setOnloadVideoPriview] = useState(false)
    const [activePosterIndex, setActivePosterIndex] = useState(0)
    const [shareState, setShareState] = useState('Public')
    const [process, setProcess] = useState(0)
    const [videoPreviewDuration, setVideoPreviewDuration] = useState()
    const [permissionCheck, setPermissionCheck] = useState({
        comment: true,
        duet: true,
        stitch: true,
    })
    const videoRef = useRef()
    const canvasRef = useRef()
    const [postPreview, setPostPreview] = useState({})
    const [data, setData] = useState({
        id: uuidv4(),
        createdAt: new Date(),
        content: '',
        poster: '',
        video: '',
        likes: 0,
        shares: 0,
        played: 0,
        uid: currentUser.uid,
    })
    useEffect(() => {
        if (!videoRef.current) return
        videoRef.current.onloadedmetadata = function () {
            setVideoPreviewDuration(videoRef.current.duration)
        }
    }, [postPreview])
    useEffect(() => {
        const handlePreviewLoadingVideo = async function () {
            if (!videoRef.current || !postPreview.id || !videoPreviewDuration) return
            const imgs = []
            intervalId = setInterval(() => {
                const seekTime = imgs?.length ? (videoPreviewDuration / 8) * imgs?.length : 0
                videoRef.current.currentTime = seekTime
                //set canvas height,width
                canvasRef.current.width = videoRef.current.videoWidth
                canvasRef.current.height = videoRef.current.videoHeight
                //drawImage from video
                canvasRef.current.getContext('2d').drawImage(videoRef.current, 0, 0)
                //push img to imgs
                const url = canvasRef.current.toDataURL('image/png')
                imgs.push(url)
                //set progess of get 8 pictures
                const _currentProcess = ((imgs?.length || 0) * 100) / 8 + Math.floor(Math.random() * 10)
                setProcess(_currentProcess > 100 ? 100 : _currentProcess)
                // check if we already have 8 pictures then clear interval
                if (imgs?.length === 8) {
                    clearInterval(intervalId)
                    setPosters(imgs)
                    window.scrollTo({ top: 0, behavior: 'smooth' }) //scroll to header so we can see video
                    setOnloadVideoPriview(false) // when load imgs done , set onload video state to false
                    setData((prev) => {
                        return { ...prev, poster: imgs[0] }
                    })
                }
            }, 300)
        }

        handlePreviewLoadingVideo()
    }, [videoPreviewDuration])
    const handleShare = function (e) {
        setShareState(e.target.innerText)
    }
    const handleShowMenuSelect = function () {
        setShowMenu((prev) => !prev)
    }
    const handleCopyRightCheck = function () {
        setCopyrightCheck((prev) => !prev)
    }
    const handleOnchange = function (e) {
        setPermissionCheck((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.checked,
            }
        })
    }
    const handleOnClickPoster = function (poster, index) {
        setActivePosterIndex(index)
        setData((prev) => {
            return { ...prev, poster: poster }
        })
    }
    const handleInputVideoOnChange = async function (e) {
        setOnloadVideoPriview(true)
        const limitedSize = 100 * (1024 * 1024) //100MB
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        if (e.target.files[0].size > limitedSize) {
            setOnloadVideoPriview(false)
            dispath(toastActions.addToast({ message: alertConstain.FILE_SIZE_LIMITED, mode: 'success' }))
            return
        }
        reader.onload = function () {
            setPostPreview({
                id: 1,
                video: reader.result,
                user: currentUser,
                fileName: e.target.files[0].name,
                file: e.target.files[0],
            })
        }
    }
    const handleCaptionInput = function (e) {
        if (e.target.textContent.length > 149 && data.content === '') {
            e.target.textContent = ''
            dispath(toastActions.addToast({ message: alertConstain.TEXT_LIMITED, mode: 'success' }))
        } else {
            setData((prev) => {
                return { ...prev, content: e.target.textContent }
            })
        }
    }
    const handleKeyDownValue = function (e) {
        if (data?.content?.length > 149 && e.keyCode !== 8) {
            e.preventDefault()
            dispath(toastActions.addToast({ message: alertConstain.TEXT_LIMITED, mode: 'success' }))
            return
        }
    }
    const handleResetOnChangeVideo = function () {
        setPostPreview({})
        setPosters({})
        setActivePosterIndex(0) //reset
        setProcess(0) //reset process state when select new video
        setVideoPreviewDuration(0) //reset duration state when select new video
        setOnloadVideoPriview(false)
        setData((prev) => {
            contentRef.current.innerHTML = ''
            return { ...prev, content: '' }
        }) //reset content
        if (intervalId) clearInterval(intervalId)
        window.scrollTo({ top: 0, behavior: 'smooth' }) //scroll to header so we can see video
    }
    const handleAddPost = async function () {
        if (!postPreview.video || onloadVideoPrivew) {
            dispath(toastActions.addToast({ message: 'Video is null.', mode: 'success' }))
            return
        }
        try {
            const storage = getStorage()
            const storageRef = ref(storage, `videos/${postPreview.fileName}`)
            const uploadTask = uploadBytesResumable(storageRef, postPreview.file)
            // setShowLoadingPost(true)
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100) //1% to wait update to firedatabase
                    // setProcess(progress < 5 ? progress : progress - 5)
                    dispath(
                        containerPortalActions.setComponent(
                            <LoadCircle process={progress < 5 ? progress : progress - 1} titleColor='white' />
                        )
                    )
                },
                (error) => {
                    console.log(error)
                    dispath(containerPortalActions.setComponent(null))
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        const posterUrl = await uploadFile(data.poster, `images/${postPreview.fileName}`)
                        const newPost = {
                            ...data,
                            video: downloadURL,
                            poster: posterUrl,
                        }
                        addPost(newPost).catch((error) => {
                            console.log(error)
                        })
                        dispath(containerPortalActions.setComponent(null))
                        dispath(toastActions.addToast({ message: 'Your video is being uploaded .', mode: 'success' }))
                    })
                }
            )
        } catch (error) {
            console.log(error)
            dispath(containerPortalActions.setComponent(null))
        }
    }
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('top', 'd-flex')}>
                {postPreview?.id && !onloadVideoPrivew && (
                    <div className={clsx('video-container', 'd-flex')}>
                        <div className={clsx('preview-upload')}>
                            <div className={clsx('video-box', 'd-flex')}>
                                <video
                                    // ref={videoRef}
                                    autoPlay={true}
                                    loop={true}
                                    controls={true}
                                    className={clsx('video')}
                                    src={postPreview.video}></video>
                            </div>
                            <MobileSidebar className={clsx('mobile-sidebar')} post={postPreview} />
                            <Spiner post={postPreview} isplay={true} className={clsx('spiner')} />
                            <div className={clsx('video-footer', 'd-flex')}>
                                <HomeIcon className={clsx('btn', 'home-btn')} height={'30px'} width={'30px'} />
                                <SearchIcon className={clsx('btn', 'search-btn')} height={'30px'} width={'30px'} />
                                <CreateVideoIcon className={clsx('btn', 'create-video')} />
                                {/* <div className={clsx('create-video-btn')}></div> */}
                                <InboxIcon className={clsx('btn', 'inbox-btn')} height={'30px'} width={'30px'} />
                                <ProfileIcon className={clsx('btn', 'profile-btn')} height={'25px'} width={'25px'} />
                            </div>
                        </div>
                        <div className={clsx('change-video', 'd-flex')}>
                            <HiOutlineCheckCircle />
                            <span className={clsx('ellipsis')}>{postPreview.fileName}</span>
                            <button onClick={handleResetOnChangeVideo}>Change video</button>
                        </div>
                    </div>
                )}
                <div>
                    <div className={clsx('header', { 'header-center': postPreview?.id && !onloadVideoPrivew })}>
                        <p>Upload Video</p>
                        <span>Post a video to your account</span>
                    </div>
                    <div className={clsx('main-content', 'd-flex')}>
                        {!postPreview?.id && !onloadVideoPrivew && (
                            <div className={clsx('left', 'd-flex')}>
                                <Fragment>
                                    <UploadIcon />
                                    <span className={clsx('text-main')}>Select video to upload</span>
                                    <span className={clsx('text-sub')}>Or drag and drop a file</span>
                                    <span className={clsx('text-video')}>Mp4 or WebM</span>
                                    <span className={clsx('text-video')}>720x1280 resolution or higher</span>
                                    <span className={clsx('text-video')}>Up to 10 minutes</span>
                                    <span className={clsx('text-video')}>Less than 2 GB</span>
                                    <div className={clsx('upload-btn-box')}>
                                        <input
                                            type='file'
                                            accept='video/*'
                                            className={clsx('upload-input')}
                                            onChange={handleInputVideoOnChange}
                                        />
                                        <Button
                                            title='Select file'
                                            bg='bg-primary'
                                            color='color-white'
                                            size='size-md'
                                            className={clsx('upload-btn')}
                                        />
                                    </div>
                                </Fragment>
                            </div>
                        )}
                        {onloadVideoPrivew && (
                            <div className={clsx('left', 'd-flex')}>
                                <Fragment>
                                    <LoadCircle process={process} titleColor='black' />
                                    <p className={clsx('loading-text')}>{`Uploading ${postPreview?.fileName || ''}`}</p>
                                    <Button
                                        onClick={handleResetOnChangeVideo}
                                        title='Cancel'
                                        border='border-grey'
                                        size='size-sm'
                                    />
                                </Fragment>
                                <video ref={videoRef} className={clsx('video-poster')} src={postPreview.video}></video>
                            </div>
                        )}

                        <canvas ref={canvasRef} className={clsx('canvas')}></canvas>
                        <div className={clsx('right')}>
                            <div className={clsx('caption', 'd-flex')}>
                                <p>Caption</p>
                                <span
                                    className={clsx('require-text', {
                                        'limited-text': data?.content?.length > 149,
                                    })}>{`${data?.content?.length || 0}/150`}</span>
                            </div>
                            <div className={clsx('input-box', 'd-flex')}>
                                <div
                                    suppressContentEditableWarning={true}
                                    contentEditable={true}
                                    onKeyDown={handleKeyDownValue}
                                    className={clsx('caption-input')}
                                    onInput={handleCaptionInput}
                                    value={data?.content}
                                    ref={contentRef}
                                />

                                <TagUserIcon />
                                <HagTag />
                            </div>
                            <div className={clsx('cover')}>
                                <p className={clsx('cover-text')}>Cover</p>
                                <div className={clsx('cover-container', 'd-flex')}>
                                    {!posters?.length ? (
                                        <div className={clsx('cover-candidate')}></div>
                                    ) : (
                                        <>
                                            {posters?.map((poster, index) => {
                                                return (
                                                    <Image
                                                        onClick={() => handleOnClickPoster(poster, index)}
                                                        key={index}
                                                        src={poster}
                                                        alt={poster}
                                                        className={clsx('poster', {
                                                            'poster-active': index === activePosterIndex,
                                                        })}
                                                    />
                                                )
                                            })}
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className={clsx('share-premission')}>
                                <p className={clsx('share-text')}>Who can view this video</p>
                                <div onClick={handleShowMenuSelect} className={clsx('share-select', 'd-flex')}>
                                    <span>{shareState}</span>
                                    <ArrowIcon className={clsx({ 'arrow-rotate': showMenu }, 'arrow')} />
                                    {showMenu && (
                                        <ul className={clsx('list-item', { 'show-menu': showMenu })}>
                                            <li onClick={handleShare} className={clsx('item', 'select-active')}>
                                                Public
                                            </li>
                                            <li onClick={handleShare} className={clsx('item')}>
                                                Friends
                                            </li>
                                            <li onClick={handleShare} className={clsx('item')}>
                                                Private
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <p className={clsx('share-text')}>Allow users to: </p>
                                <div className={clsx('check-box', 'd-flex')}>
                                    <div className={clsx('check-box-group', 'd-flex')}>
                                        <div className={clsx('check-item', { checked: permissionCheck?.comment })}>
                                            <input
                                                onChange={handleOnchange}
                                                type='checkbox'
                                                className={clsx('input-check')}
                                                checked={permissionCheck?.comment}
                                                id='comment'
                                                name='comment'
                                            />
                                            <CheckBoxIcon className={clsx('check-icon')} />
                                        </div>
                                        <label htmlFor='comment'>Comment</label>
                                    </div>
                                    <div className={clsx('check-box-group', 'd-flex')}>
                                        <div className={clsx('check-item', { checked: permissionCheck?.duet })}>
                                            <input
                                                onChange={handleOnchange}
                                                type='checkbox'
                                                className={clsx('input-check')}
                                                checked={permissionCheck?.duet}
                                                id='duet'
                                                name='duet'
                                            />
                                            <CheckBoxIcon className={clsx('check-icon')} />
                                        </div>
                                        <label htmlFor='duet'>Duet</label>
                                    </div>
                                    <div className={clsx('check-box-group', 'd-flex')}>
                                        <div className={clsx('check-item', { checked: permissionCheck?.stitch })}>
                                            <input
                                                onChange={handleOnchange}
                                                checked={permissionCheck?.stitch}
                                                type='checkbox'
                                                className={clsx('input-check')}
                                                id='stitch'
                                                name='stitch'
                                            />
                                            <CheckBoxIcon className={clsx('check-icon')} />
                                        </div>
                                        <label htmlFor='stitch'>Stitch</label>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx('copy-right')}>
                                <div className={clsx('copy-right-header', 'd-flex')}>
                                    <span>Run a copy right check</span>
                                    <div
                                        onClick={handleCopyRightCheck}
                                        className={clsx('switch', 'd-flex', { 'switch-action': copyrightCheck })}>
                                        <div className={clsx('switch-inner', { 'inner-action': copyrightCheck })}></div>
                                    </div>
                                </div>
                                {!copyrightCheck ? (
                                    <p className={clsx('desc')}>
                                        We'll check your video for potential copyright infringements on used sounds. If
                                        infringements are found, you can edit the video before posting.
                                    </p>
                                ) : (
                                    <div className={clsx('d-flex', 'wraning-box')}>
                                        <WramIcon className={clsx('wraning-icon')} />
                                        <p>Copyright check will not begin until your video is uploaded.</p>
                                    </div>
                                )}
                            </div>
                            <div className={clsx('actions', 'd-flex')}>
                                <Button
                                    onClick={handleResetOnChangeVideo}
                                    title='Discard'
                                    border='border-grey'
                                    className={clsx('action-btn')}
                                />
                                <Button
                                    onClick={handleAddPost}
                                    title='Post'
                                    bg={!postPreview?.video && !onloadVideoPrivew ? 'bg-grey' : 'bg-primary'}
                                    color={!postPreview?.video && !onloadVideoPrivew ? 'color-grey' : 'color-white'}
                                    className={clsx('action-btn')}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx('footer')}></div>
        </div>
    )
}

export default Upload
