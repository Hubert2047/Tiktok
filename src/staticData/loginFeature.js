import { v4 as uuidv4 } from 'uuid'
import {
    CopyLinkIcon,
    FaceBookIcon,
    GooogleIcon,
    IstalgramIcon,
    LineIcon,
    ProfileIcon,
    QRCIcon,
    TalkIcon,
    TwitterIcon,
} from '~/components/Icons'
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
    { id: 4, title: 'Continue with Google', icon: <GooogleIcon />, onClick: loginWithGoogle, type: 'google' },
    {
        id: 1,
        title: 'Use QR code',
        icon: <QRCIcon />,
    },
    {
        id: 2,
        title: 'Use phone / email / username',
        icon: <ProfileIcon />,
    },
    { id: 3, title: 'Continue with Facebook', icon: <FaceBookIcon /> },
    { id: 5, title: 'Continue with Line', icon: <LineIcon /> },
    { id: 6, title: 'Continue with Twitter', icon: <TwitterIcon /> },
    { id: 7, title: 'Continue with KakaoTalk', icon: <TalkIcon /> },
    { id: 8, title: 'Continue with Instagram', icon: <IstalgramIcon /> },
]
