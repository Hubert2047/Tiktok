import { HelpIcon, KeyboardIcon, LanguageIcon, LogoutIcon, ProfileIcon, SettingIcon } from '~/components/Icons'

// menu buttom
export const LOG_OUT = 'log-out'
export const VIEW_PROFILE = 'view-profile'
export const UNLOGIN_MENU_ITEM = [
    {
        data: [
            {
                title: 'English',
                icon: <LanguageIcon />,
                children: {
                    title: 'languages',
                    data: [
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                    ],
                },
            },
            { title: 'Feedback and help', icon: <HelpIcon />, to: './' },
            { title: 'Keyboard shortcuts', icon: <KeyboardIcon /> },
        ],
    },
]
export const LOGIN_MENU_ITEM = [
    {
        data: [
            { title: 'View profile', icon: <ProfileIcon />, to: './', type: VIEW_PROFILE },
            { title: 'Setting', icon: <SettingIcon />, to: './' },
            ...UNLOGIN_MENU_ITEM[0].data, //clone data from unlogin menu
            { title: 'Log out', icon: <LogoutIcon />, to: './', separate: true, type: LOG_OUT },
        ],
    },
]
