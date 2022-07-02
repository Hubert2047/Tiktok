import classNames from 'classnames/bind'
import { useState } from 'react'
import Button from '~/components/Button'
import { ArrowIcon, CheckBoxIcon, HagTag, TagUserIcon, UploadIcon, WramIcon } from '~/components/Icons'
import styles from './Upload.module.scss'
const clsx = classNames.bind(styles)

function Upload() {
    const [showMenu, setShowMenu] = useState(false)
    const [copyrightCheck, setCopyrightCheck] = useState(false)
    const [shareState, setShareState] = useState('Public')
    const [permissionCheck, setPermissionCheck] = useState({
        comment: true,
        duet: true,
        stitch: true,
    })
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
        console.log(e.target.attributes.data)
        setPermissionCheck((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.checked,
            }
        })
    }
    return (
        <div className={clsx('wrapper')}>
            <div className={clsx('top')}>
                <div className={clsx('header')}>
                    <p>Upload Video</p>
                    <span>Post a video to your acount</span>
                </div>
                <div className={clsx('main-content', 'd-flex')}>
                    <div className={clsx('left', 'd-flex')}>
                        <UploadIcon />
                        <span className={clsx('text-main')}>Select video to upload</span>
                        <span className={clsx('text-sub')}>Or drag and drop a file</span>
                        <span className={clsx('text-video')}>Mp4 or WebM</span>
                        <span className={clsx('text-video')}>720x1280 resolution or higher</span>
                        <span className={clsx('text-video')}>Up to 10 minutes</span>
                        <span className={clsx('text-video')}>Less than 2 GB</span>
                        <Button
                            title='Select file'
                            bg='bg-primary'
                            color='color-white'
                            size='size-md'
                            className={clsx('upload-btn')}
                        />
                    </div>
                    <div className={clsx('right')}>
                        <div className={clsx('caption', 'd-flex')}>
                            <p>Caption</p>
                            <span className={clsx('require-text')}>0/150</span>
                        </div>
                        <div className={clsx('input-box', 'd-flex')}>
                            <div
                                suppressContentEditableWarning={true}
                                contentEditable={true}
                                className={clsx('caption-input')}></div>
                            <TagUserIcon />
                            <HagTag />
                        </div>
                        <div className={clsx('cover')}>
                            <p className={clsx('cover-text')}>Cover</p>
                            <div className={clsx('cover-container')}>
                                <div className={clsx('cover-candidate')}></div>
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
                            <Button title='Discard' border='border-grey' className={clsx('action-btn')} />
                            <Button title='Post' bg='bg-grey' color='color-grey' className={clsx('action-btn')} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx('footer')}></div>
        </div>
    )
}

export default Upload
