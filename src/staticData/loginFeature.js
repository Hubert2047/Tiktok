import {
    CopyLinkIcon,
    GooogleIcon,
    ProfileIcon,
    LineIcon,
    TwitterIcon,
    TalkIcon,
    AppleIcon,
    IstalgramIcon,
    FaceBookIcon,
} from '~/components/Icons'
import { v4 as uuidv4 } from 'uuid'
import { loginWithGoogle } from '~/firebase'
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
    {
        id: 2,
        title: 'Use phone / email / username',
        icon: <ProfileIcon />,
        onClick: () => {
            incomingFeature('Use Phone')
        },
    },
    { id: 4, title: 'Continue with Google', icon: <GooogleIcon />, onClick: loginWithGoogle },
    { id: 3, title: 'Continue with Facebook', icon: <FaceBookIcon />, onClick: incomingFeature },
    { id: 5, title: 'Continue with Line', icon: <LineIcon />, onClick: incomingFeature },
    { id: 6, title: 'Continue with Twitter', icon: <TwitterIcon />, onClick: incomingFeature },
    { id: 7, title: 'Continue with KakaoTalk', icon: <TalkIcon />, onClick: incomingFeature },
    { id: 8, title: 'Continue with Apple', icon: <AppleIcon />, onClick: incomingFeature },
    { id: 9, title: 'Continue with Instagram', icon: <IstalgramIcon />, onClick: incomingFeature },
]

function incomingFeature(feature = 'this feature') {
    return `${feature} is coming later. Please, use continue with google`
}
