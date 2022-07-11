import classNames from 'classnames/bind'
import { useRef } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { IoIosArrowBack } from 'react-icons/io'
import Button from '~/components/Button'
import styles from './EditPhoto.module.scss'

const clsx = classNames.bind(styles)
function EditPhoto({ src, inputValue = 0, onScaleChange, onBack, setImg, setData }) {
    const scale = 1 + parseInt(inputValue) / 10
    const dotStyle = {
        left: `${inputValue}%`,
        transform: `translateX(-${inputValue}%)`,
    }
    const inputStyle = {
        width: `${parseInt(inputValue) + (100 - parseInt(inputValue)) / 100}%`,
    }
    const editorRef = useRef()
    const handleOnApply = function () {
        if (editorRef.current) {
            const url = editorRef.current.getImageScaledToCanvas().toDataURL()
            setData((prev) => {
                return { ...prev, avatar: url }
            })
            setImg(null)
        }
    }
    const handleOnCancel = function () {
        setImg(null)
    }
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <div onClick={onBack} className={clsx('header', 'd-flex')}>
                <IoIosArrowBack className={clsx('back-icon')} />
                <h4 className={clsx('title')}>Edit Photo</h4>
            </div>
            <div className={clsx('mid', 'flex-center')}>
                <div>
                    <AvatarEditor
                        className={clsx('editor')}
                        image={src}
                        ref={editorRef}
                        width={350}
                        height={350}
                        border={50}
                        color={[255, 255, 255, 0.6]} // RGBA
                        scale={scale}
                        backgroundColor={'black'}
                        rotate={0}
                        borderRadius={350}
                    />
                    <div className={clsx('zoom-box', 'd-flex')}>
                        <span>Zoom</span>
                        <div className={clsx('input-box')}>
                            <input
                                className={clsx('input')}
                                type='range'
                                onChange={(e) => {
                                    onScaleChange(e)
                                }}
                            />
                            <div style={dotStyle} className={clsx('dot')}></div>
                            <div className={clsx('input-custom')}></div>
                            <div style={inputStyle} className={clsx('input-display')}></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx('actions', 'd-flex')}>
                <Button onClick={handleOnCancel} title='Cancel' border='border-grey' size='size-md' />
                <Button onClick={handleOnApply} title='Apply' color='color-white' bg='bg-primary' size='size-md' />
            </div>
        </div>
    )
}

export default EditPhoto
