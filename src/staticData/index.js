import 'tippy.js/dist/tippy.css'
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
import { loginWithGoogle, logOut } from '~/firebase'

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

export const floowingUsers = [
    {
        id: 1,
        avatar: 'https://tse1.mm.bing.net/th?id=OIP.DA2u6Ioeunl7aZ8z_sVsaQHaLH&pid=Api&P=0&w=111&h=167',
        full_name: 'tonyun_',
        nickname: '云☁️',
        isLive: true,
        tick: false,
        followers: '163.1M',
        likes: '200.1M',
    },
    {
        id: 2,
        avatar: 'https://tse1.mm.bing.net/th?id=OIP.ZzzqnND4nfYyd_zqtB11agHaKI&pid=Api&P=0&w=120&h=164',
        full_name: 'haryluthfi21____',
        nickname: '💥 💫🍃 21- 𝕁𝕦ℕ𝕚- 90🍃💫',
        isLive: true,
        tick: false,
        followers: '11.1M',
        likes: '102.2M',
    },
    {
        id: 3,
        avatar: 'https://tse1.mm.bing.net/th?id=OIP.OiJlx3T6DTV6fQvYZi2o_QHaFj&pid=Api&P=0&w=220&h=165',
        full_name: 'cia.hartono',
        nickname: 'Cia☁️🐝',
        isLive: false,
        tick: false,
        followers: '11.1M',
        likes: '111.2M',
    },
    {
        id: 4,
        avatar: 'https://tse2.mm.bing.net/th?id=OIP.oEgh_fWsj_w188uN_vszmAHaEK&pid=Api&P=0&w=306&h=172',
        full_name: 'shanwei153',
        nickname: 'Sharon🇹🇼',
        isLive: true,
        tick: false,
        followers: '112K',
        likes: '589.1K',
    },
    {
        id: 5,
        avatar: 'https://tse1.mm.bing.net/th?id=OIP.sliJZnPcIPGGOD6gsTYoSwHaLH&pid=Api&P=0&w=125&h=188',
        full_name: 'musingxer',
        nickname: '木星人MuSingxer 🌟',
        isLive: false,
        tick: true,
        followers: '112K',
        likes: '290.1K',
    },
    {
        id: 6,
        avatar: 'https://tse3.mm.bing.net/th?id=OIP._wb8OGvRl-ii6qB3cpUFKAHaLH&pid=Api&P=0&w=127&h=191',
        full_name: 'neneko.n',
        nickname: '✨ Neneko ✨',
        isLive: true,
        tick: false,
        followers: '632K',
        likes: '1.1M',
    },
    {
        id: 7,
        avatar: 'https://tse3.mm.bing.net/th?id=OIP.Jofr-i0jvWPTQJgd2wwj7AHaHa&pid=Api&P=0&w=173&h=173',
        full_name: 'janie.lin',
        nickname: '泥泥Janie🇹🇼🇯🇵ˣ🇲🇾',
        isLive: false,
        tick: false,
        followers: '324M',
        likes: '1029.1M',
    },
    {
        id: 8,
        avatar: 'https://tse2.mm.bing.net/th?id=OIP.YVKi1hHEvXrnQpPfrErnugHaE8&pid=Api&P=0&w=251&h=167',
        full_name: 'junya1gou.jr',
        nickname: 'junya jr.&Mask🎭/こじゅんや',
        isLive: true,
        tick: false,
        followers: '412.1K',
        likes: '653.3K',
    },
    {
        id: 9,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/f43f9124aa9dd610423a8aecccf06f92~c5_100x100.jpeg?x-expires=1654786800&x-signature=wUoddbJUgXH1hSjGw2Y%2FlbWpetA%3D',
        full_name: 'vangiang7992',
        nickname: 'Streetfood🌍',
        isLive: false,
        tick: true,
        followers: '322.4K',
        likes: '432.1M',
    },
    {
        id: 10,
        avatar: 'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/6de6fd6edb276342649d1eeb6948485e.jpeg?x-expires=1654786800&x-signature=YSOFuB1IcqvN3WI3JRv4PdV1%2Fnk%3D',
        full_name: 'vieazkhanza05',
        nickname: '🐾𝔼_𝕧𝕚𝕖𝟘𝟝🐾',
        isLive: false,
        tick: false,
        followers: '214K',
        likes: '425.2K',
    },
    {
        id: 11,
        avatar: 'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/0983cf9be053097a780de7b6e44eedbe.jpeg?x-expires=1654790400&x-signature=YM%2BP23jjxGE4HY3ml4tZVPTr21Q%3D',
        full_name: 'brick_grandpa',
        nickname: '벽돌할아버지',
        isLive: false,
        tick: false,
        followers: '110.4M',
        likes: '351.5M',
    },
    {
        id: 12,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/b4e9efd9a474a87f25ddb1ab68dc6881~c5_100x100.jpeg?x-expires=1654786800&x-signature=1aT1O2O%2FJN5Jf07tUMf30V%2ByJZk%3D',
        full_name: 'bitch_089457',
        nickname: '鴛鴦蝴蝶夢',
        isLive: false,
        tick: true,
        followers: '112.1K',
        likes: '1.2M',
    },
    {
        id: 13,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d25ee8a69ad2d0fafabced1ccb511d4~c5_100x100.jpeg?x-expires=1654786800&x-signature=7BaCaf%2BOos8arLSkjgF3HytN2QE%3D',
        full_name: 'wei.piano',
        nickname: '威猛叔叔Piano🍍',
        isLive: false,
        tick: false,
        followers: '1.1K',
        likes: '126.1K',
    },
    {
        id: 14,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/ae812686c8149ca9363ea773089d21ad~c5_100x100.jpeg?x-expires=1654786800&x-signature=aj388ewMFDrff3llju9R6Ytw%2Bzs%3D',
        full_name: 'jinxly8',
        nickname: '🌹遇鉴藏友Collect the world',
        isLive: false,
        tick: false,
        followers: '11.1M',
        likes: '127.4M',
    },
    {
        id: 15,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/4869b227d823078669edf37049925be5~c5_100x100.jpeg?x-expires=1654786800&x-signature=pEApsWgUjKtDsyC61WtCHiX%2FTTc%3D',
        full_name: 'userlkyez1utjn',
        nickname: '曾經滄海💸',
        isLive: false,
        tick: false,
        followers: '1298K',
        likes: '1029.1K',
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
export const LOG_OUT = 'log-out'
export const LOGIN_MENU_ITEM = [
    {
        data: [
            { title: 'View profile', icon: <ProfileIcon />, to: './' },
            { title: 'Setting', icon: <SettingIcon />, to: './' },
            ...UNLOGIN_MENU_ITEM[0].data, //clone data from unlogin menu
            { title: 'Log out', icon: <LogoutIcon />, to: './', separate: true, onClick: logOut, type: LOG_OUT },
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

export const movies = [
    {
        id: 1,
        title: 'Did you know that for THE GRAND BUDAPEST HOTEL...',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2Fchinese-song-1.jpeg?alt=media&token=f6ae69ca-ebc1-492d-b279-9adcb479bbba',
        playCount: `12K`,
        src: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2Fchinses-song-1.mp4?alt=media&token=5e678fb3-3826-41ea-b9ec-c74cc1646c1e',
    },
    {
        id: 2,
        title: 'Tag that guy when u listen to this song.',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2Fchinese-song-2.jpeg?alt=media&token=ad86b49d-7069-4d23-a7fa-c50faad98362',
        playCount: `11.3K`,
        src: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2Fchinese-song-2.mp4?alt=media&token=e4674739-96e4-4f52-9cc7-9efa6208c4b4',
    },
    {
        id: 3,
        title: 'Did you know that for THE GRAND BUDAPEST HOTEL...',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2Fchinese-song-3.jpeg?alt=media&token=175070d9-ccb7-49da-a03b-ae2070161d64',
        playCount: `123K`,
        src: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2Fchinese-song-3.mp4?alt=media&token=e943f3d9-3694-4530-85d4-16f77637a996',
    },
    {
        id: 4,
        title: 'Did you know that for THE GRAND BUDAPEST HOTEL...',
        poster: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/image%2FmessageImage_1655022867422.jpg?alt=media&token=d67d0c00-2c40-4b25-81bc-57e4ac03dd87',
        playCount: `19.2K`,
        src: 'https://firebasestorage.googleapis.com/v0/b/tiktok-b748a.appspot.com/o/videos%2Fchinses-song-4.mp4?alt=media&token=33894452-810d-4e04-8b37-6bb89291f1c2',
    },
    {
        id: 5,
        title: 'Did you know that for THE GRAND BUDAPEST HOTEL...',
        poster: 'https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/b51e787568874c3eb67146c8e9c49311_1654792396?x-expires=1654963200&x-signature=DyuicNq%2FKficg%2BndjXNyPJwqpuk%3D',
        playCount: `16.3K`,
    },
    {
        id: 6,
        title: 'Did you know that for THE GRAND BUDAPEST HOTEL...',
        poster: 'https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/ef70db265fe04aafb16db3d9cd41c5c3?x-expires=1654963200&x-signature=tHD6pNnAcx5%2BnbviG38kHrgIsRw%3D',
        playCount: `123M`,
    },
    {
        id: 7,
        title: 'Did you know that for THE GRAND BUDAPEST HOTEL...',
        poster: 'https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/d89d618e4ecf4405ac2933547762a9df_1654597217?x-expires=1654963200&x-signature=FzTgL4%2B%2BBbNgiPVuA1NoMOxSSkU%3D',
        playCount: `12K`,
    },
    {
        id: 8,
        title: 'Did you know that for THE GRAND BUDAPEST HOTEL...',
        poster: 'https://p16-sign-va.tiktokcdn.com/obj/tos-useast2a-p-0037-aiso/e92f26033f5146bd812cb6fb011b4696?x-expires=1654963200&x-signature=WwIxZTEPG5hXhWQqc9zNtbTXSxM%3D',
        playCount: `1.3K`,
    },
]

export const loginFeatureBtns = [
    {
        id: 1,
        title: 'Use QR code',
        icon: <QRCIcon />,
        onClick: () => {
            incomingFeature('Use QRC')
        },
    },
    {
        id: 2,
        title: 'Use phone / email / username',
        icon: <ProfileIcon />,
        onClick: () => {
            incomingFeature('Use Phone')
        },
    },
    { id: 3, title: 'Continue with Facebook', icon: <FaceBookIcon />, onClick: incomingFeature },
    { id: 4, title: 'Continue with Google', icon: <GooogleIcon />, onClick: loginWithGoogle },
    { id: 5, title: 'Continue with Line', icon: <LineIcon />, onClick: incomingFeature },
    { id: 6, title: 'Continue with Twitter', icon: <TwitterIcon />, onClick: incomingFeature },
    { id: 7, title: 'Continue with KakaoTalk', icon: <TalkIcon />, onClick: incomingFeature },
    { id: 8, title: 'Continue with Apple', icon: <AppleIcon />, onClick: incomingFeature },
    { id: 9, title: 'Continue with Instagram', icon: <IstalgramIcon />, onClick: incomingFeature },
]

function incomingFeature(feature = 'this feature') {
    return `${feature} is coming later. Please, use continue with google`
}
