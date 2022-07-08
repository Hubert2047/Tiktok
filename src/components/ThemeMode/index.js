import classNames from 'classnames/bind'
import React from 'react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import Switch from '~/components/Switch'
import { themeActions } from '~/redux/themeSlice'
import { theme } from '~/staticData'
import VerticalSwitch from '../Switch/VerticalSwitch'
import styles from './ThemeMode.module.scss'

const clsx = classNames.bind(styles)
function ThemeMode({ className, vertical = false }) {
    const dispath = useDispatch()
    const currentTheme = useSelector((state) => state.theme.theme.name)
    const onSwitchChange = () => {
        let switchTheme
        if (currentTheme === 'dark') {
            switchTheme = 'light'
        } else {
            switchTheme = 'dark'
        }
        const styleTheme = handleChangeTheme(switchTheme)
        dispath(themeActions.setTheme(styleTheme))
    }
    const handleChangeTheme = function (switchTheme) {
        switch (switchTheme) {
            case 'dark':
                return { name: 'dark', styles: theme.styleThemes.dark }
            case 'light':
                return { name: 'light', styles: theme.styleThemes.light }
            default:
                return { name: 'dark', styles: theme.styleThemes.dark }
        }
    }
    return (
        <div className={clsx('theme-mode', 'd-flex', className)}>
            <div className={clsx('mode-box', 'flex-center', { 'active-mode-white': currentTheme === 'light' })}>
                <MdLightMode className={clsx('theme-mode-icon')} />
            </div>
            {!vertical ? (
                <Switch onClick={onSwitchChange} checked={currentTheme === 'dark'} />
            ) : (
                <VerticalSwitch onClick={onSwitchChange} checked={currentTheme === 'dark'} />
            )}
            <div className={clsx('mode-box', 'flex-center', { 'active-mode-black': currentTheme === 'dark' })}>
                <MdDarkMode className={clsx('theme-mode-icon')} />
            </div>
        </div>
    )
}

export default ThemeMode
