import 'tippy.js/dist/tippy.css'
import { v4 as uuidv4 } from 'uuid'
import {
    AppleIcon,
    Blocktcon,
    CopyLinkIcon,
    EmbedIcon,
    FaceBookIcon,
    GooogleIcon,
    HelpIcon,
    IstalgramIcon,
    KeyboardIcon,
    LanguageIcon,
    LineIcon,
    LinkedInIcon,
    LogoutIcon,
    MessengerIcon,
    Pinterestcon,
    ProfileIcon,
    QRCIcon,
    ReditIcon,
    ReportIcon,
    SettingIcon,
    TalkIcon,
    TeleGramIcon,
    TwitterIcon,
    WhatsAppIcon,
} from '~/components/Icons'
import { loginWithGoogle } from '~/firebase'

export const discovers = [
    {
        id: 1,
        title: 'Jiggle Jiggle - Duke & Jones & Louis Theroux',
        type: 'video',
    },
    {
        id: 2,
        title: 'tiktok-1sw5kok-PText eikhr9j12',
        type: 'video',
    },
    {
        id: 3,
        title: '我是女王',
        type: 'video',
    },
    {
        id: 4,
        title: '墨鏡搖擺',
        type: 'text',
    },
    {
        id: 5,
        title: '濃情粽意',
        type: 'text',
    },
    {
        id: 6,
        title: '交誼舞',
        type: 'text',
    },

    {
        id: 7,
        title: 'FEARLESS - LE SSERAFIM',
        type: 'video',
    },
    {
        id: 8,
        title: '濃情粽意',
        type: 'text',
    },
    {
        id: 9,
        title: '  TOMBOY - (G)I-DLE',
        type: 'video',
    },
]

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
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
                        { title: 'English' },
                        { title: 'VietNam' },
                        { title: 'Chinese' },
                        { title: 'Cebuano (Pilipinas)' },
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

// menu buttom
export const LOG_OUT = 'log-out'
export const VIEW_PROFILE = 'view-profile'
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

//footer
export const footerData = [
    {
        id: 1,
        data: [
            { id: 1, title: 'About' },
            { id: 2, title: 'Newsroom' },
            { id: 3, title: 'Contact' },
            { id: 4, title: 'Career' },
            { id: 5, title: 'ByteDance' },
        ],
    },
    {
        id: 2,
        data: [
            { id: 1, title: 'TikTok for Good' },
            { id: 2, title: 'Advertise' },
            { id: 3, title: 'Developers' },
            { id: 4, title: 'Transparence' },
            { id: 5, title: 'TikTok Rewards' },
        ],
    },
    {
        id: 3,
        data: [
            { id: 1, title: 'Help' },
            { id: 2, title: 'Safety' },
            { id: 3, title: 'Terms' },
            { id: 4, title: 'Privacy' },
            { id: 5, title: 'Creator Portal' },
        ],
    },
]
// share icon

export const shareItems = [
    {
        data: [
            { id: 1, title: 'Embed ', icon: <EmbedIcon /> },
            { id: 2, title: 'Share to whatsApp', icon: <WhatsAppIcon /> },
            { id: 3, title: 'Share to Facebook', icon: <FaceBookIcon /> },
            { id: 4, title: 'Share to Twitter', icon: <TwitterIcon /> },
            { id: 5, title: 'Copy Link', icon: <CopyLinkIcon /> },
            { id: 6, title: 'Share to Telegram', icon: <TeleGramIcon /> },
            { id: 9, title: 'Share to LinkIn', icon: <LinkedInIcon /> },
            { id: 7, title: 'Share to Reddit', icon: <ReditIcon /> },
            { id: 8, title: 'Share to Pinterest', icon: <Pinterestcon /> },
        ],
    },
]
export const profileActionIcons = [
    {
        data: [
            { id: 1, title: 'Send message', icon: <MessengerIcon height='1.6rem' width='1.6rem' /> },
            { id: 1, title: 'Report', icon: <ReportIcon height='1.6rem' width='1.6rem' /> },
            { id: 1, title: 'Block', icon: <Blocktcon height='1.6rem' width='1.6rem' /> },
        ],
    },
]

const quickLogin = function () {
    const clientId = 'giO0CmLkFvxUqN_h7ctKT39ewlvVzH1XnoLSZAbkuhA'
    const endpoint = `https://api.unsplash.com/photos/random/?client_id=${clientId}`
    return fetch(endpoint)
        .then((result) => {
            return result.json()
        })
        .then((result) => {
            const user = {
                uid: uuidv4(),
                displayName: result.user.name,
                photoURL: result.urls.regular,
                nickname: result.user.username,
                desc: result.user.bio,
                isLive: result.liked_by_user,
            }
            return user
        })
}
export const loginFeatureBtns = [
    {
        id: 0,
        title: 'Quick Login',
        icon: <CopyLinkIcon />,
        onClick: quickLogin,
    },
    // {
    //     id: 1,
    //     title: 'Use QR code',
    //     icon: <QRCIcon />,
    //     onClick: () => {
    //         incomingFeature('Use QRC')
    //     },
    // },
    // {
    //     id: 2,
    //     title: 'Use phone / email / username',
    //     icon: <ProfileIcon />,
    //     onClick: () => {
    //         incomingFeature('Use Phone')
    //     },
    // },
    // { id: 3, title: 'Continue with Facebook', icon: <FaceBookIcon />, onClick: incomingFeature },
    { id: 4, title: 'Continue with Google', icon: <GooogleIcon />, onClick: loginWithGoogle },
    // { id: 5, title: 'Continue with Line', icon: <LineIcon />, onClick: incomingFeature },
    // { id: 6, title: 'Continue with Twitter', icon: <TwitterIcon />, onClick: incomingFeature },
    // { id: 7, title: 'Continue with KakaoTalk', icon: <TalkIcon />, onClick: incomingFeature },
    // { id: 8, title: 'Continue with Apple', icon: <AppleIcon />, onClick: incomingFeature },
    // { id: 9, title: 'Continue with Instagram', icon: <IstalgramIcon />, onClick: incomingFeature },
]

function incomingFeature(feature = 'this feature') {
    return `${feature} is coming later. Please, use continue with google`
}
