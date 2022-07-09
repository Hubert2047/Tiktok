import classNames from 'classnames/bind'
import React, { memo, useEffect, useRef, useState } from 'react'
import { VolumIcon, VolumMuteIcon } from '~/components/Icons'
import { formatVideoTime } from '~/helper'
import styles from './VideoControl.module.scss'

const clsx = classNames.bind(styles)
function VideoControl({ video }) {
    const [progress, setProgress] = useState(0)
    const [paused, setPaused] = useState(false)
    const [muted, setMuted] = useState(video.muted)
    const [labelText, setLabelText] = useState({ isShow: false, value: '' })
    const timeOutRef = useRef()
    const getProgress = function () {
        setProgress(Math.round((video.currentTime / video.duration) * 100))
    }
    const handleOnPause = function () {
        setPaused(true)
    }
    const handleOnPlay = function () {
        setPaused(false)
    }
    const handleOnMuteVolum = function (e) {
        e.stopPropagation()
        setMuted(true)
        video.muted = true
    }
    const handleOnUnMuteVolum = function (e) {
        e.stopPropagation()
        setMuted(false)
        video.muted = false
    }
    useEffect(() => {
        video.addEventListener('timeupdate', getProgress)
        video.addEventListener('pause', handleOnPause)
        video.addEventListener('play', handleOnPlay)
        return () => {
            video.removeEventListener('timeupdate', getProgress)
            video.removeEventListener('pause', handleOnPause)
            video.removeEventListener('play', handleOnPlay)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const barRunStyle = {
        width: `${progress + (100 - progress) / 100}%`,
    }
    const dotStyle = {
        left: `${progress}%`,
        transform: `translate(-${progress}%,-50%)`,
    }

    const handleOnChange = function (e) {
        const _process = parseInt(e.target.value)
        setProgress(_process)
        const currentTime = (_process * video.duration) / 100
        video.currentTime = currentTime
        setLabelText({ isShow: true, value: formatVideoTime(Math.floor(currentTime)) })
        if (timeOutRef?.current) clearTimeout(timeOutRef.current)
        timeOutRef.current = setTimeout(() => {
            setLabelText((prev) => {
                return { ...prev, isShow: false }
            })
        }, 300)
    }
    return (
        <div className={clsx('wrapper', 'd-flex', { 'wrapper-paused': paused })}>
            <div className={clsx('bar-box', 'flex-center')}>
                <div className={clsx('bar-container', { 'bar-container-paused': paused })}>
                    <div className={clsx('bar')}></div>
                    <input
                        type='range'
                        value={progress}
                        onChange={handleOnChange}
                        max={100}
                        min={0}
                        step={1}
                        className={clsx('bar-change')}
                    />
                    <div style={barRunStyle} className={clsx('bar-run')}></div>
                    <div style={dotStyle} className={clsx('dot', { 'dot-paused': paused })}>
                        {labelText.isShow && (
                            <div className={clsx('label', 'flex-center')}>
                                <span>{labelText.value}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={clsx('volum-box', 'flex-center')}>
                {!muted ? <VolumIcon onClick={handleOnMuteVolum} /> : <VolumMuteIcon onClick={handleOnUnMuteVolum} />}
            </div>
        </div>
    )
}

export default memo(VideoControl)
