import classNames from 'classnames/bind'
import { ReportIcon } from '~/components/Icons'
import VideoFooter from '../VideoFooter'
import styles from './Video.module.scss'
const clsx = classNames.bind(styles)
function Video() {
    return (
        <div className={clsx('wrapper', 'd-flex')}>
            <div className={clsx('video-box')}>
                <video
                    controlsList='nofullscreen'
                    className={clsx('video')}
                    loop={true}
                    src='https://v16-webapp.tiktok.com/0b2a9cb44344c08d2d364af63fa89410/62a1bff2/video/tos/useast2a/tos-useast2a-pve-0037-aiso/1d76588759a34db4a0358e0d55a54d63/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3398&bt=1699&btag=80000&cs=0&ds=3&ft=JpusWhWH6BMtHiFjr0PahnyO-pi&mime_type=video_mp4&qs=0&rc=NTY4ZGU3NDY8N2c8M2c6PEBpM3NyOzw6Zm1vZDMzZjgzM0AxXy0xXmMzX2AxNjAwYjQ1YSNmZmBrcjRnbmBgLS1kL2Nzcw%3D%3D&l=20220609033955010244075067128340C3'
                    controls={true}></video>
                <div className={clsx('report-box')}>
                    <ReportIcon />
                    <span>Report</span>
                </div>
            </div>
            <VideoFooter />
        </div>
    )
}

export default Video
