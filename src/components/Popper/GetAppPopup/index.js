import classNames from 'classnames/bind'
import { AiFillApple } from 'react-icons/ai'
import { IoLogoMicrosoft } from 'react-icons/io5'
import { RiGooglePlayFill } from 'react-icons/ri'
import { SiAmazon } from 'react-icons/si'
import { useDispatch } from 'react-redux'
import Button from '~/components/Button'
import { XIcon } from '~/components/Icons'
import Image from '~/components/Image'
import { useOverflow } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import styles from './GetAppPopup.module.scss'
const clsx = classNames.bind(styles)
function GetAppPopup({ className }) {
    const dispath = useDispatch()
    //when show this component we stop body scrolling
    useOverflow()
    return (
        <div className={clsx('wrapper', `${className}`)}>
            <div className={clsx('header', 'd-flex')}>
                <h4 className={clsx('title')}>Get TikTok App</h4>
                <div
                    onClick={() => {
                        dispath(containerPortalActions.setComponent(null))
                    }}>
                    <XIcon className={clsx('close-btn')} />
                </div>
            </div>
            <div className={clsx('mid', 'flex-center')}>
                <p className={clsx('text')}>Scan QR code to download TikTok</p>
                <div className={clsx('image-box')}>
                    <Image
                        className={clsx('image')}
                        src='https://lf16-tiktok-web.ttwstatic.com/obj/tiktok-web/tiktok/webapp/main/webapp-desktop/47624c235266dedd8e4d.png'
                    />
                </div>
            </div>
            <div className={clsx('bottom')}>
                <p className={clsx('text')}>Download from app stores</p>
                <div className={clsx('action-btns')}>
                    <Button
                        className={clsx('link')}
                        icon={<IoLogoMicrosoft />}
                        title='Microsoft'
                        href='https://www.microsoft.com/store/apps/9NH2GPH4JZS4'></Button>
                    <Button
                        className={clsx('link')}
                        icon={<AiFillApple />}
                        title='App Store'
                        href='https://www.microsoft.com/store/apps/9NH2GPH4JZS4'></Button>
                    <Button
                        className={clsx('link')}
                        icon={<SiAmazon />}
                        title='Amazon'
                        href='https://www.microsoft.com/store/apps/9NH2GPH4JZS4'></Button>
                    <Button
                        className={clsx('link')}
                        icon={<RiGooglePlayFill />}
                        title='Google Play'
                        href='https://www.microsoft.com/store/apps/9NH2GPH4JZS4'></Button>
                </div>
            </div>
        </div>
    )
}

export default GetAppPopup
