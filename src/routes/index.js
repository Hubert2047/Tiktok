import config from '~/config'
import BlankLayout from '~/layouts/BlankLayout'
//layouts
import MainLayout from '~/layouts/MainLayout'
import ProfileLayout from '~/layouts/ProfileLayout'
import SidebarLayout from '~/layouts/SidebarLayout'
import UploadLayout from '~/layouts/UploadLayout'
//pages
import Following from '~/pages/Following'
import Home from '~/pages/Home'
import MessagesPage from '~/pages/MessagesPage'
import NotFoundPage from '~/pages/NotFoundPage'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import VideoPage from '~/pages/VideoPage'
const publicRoutes = [
    { path: config.routes.home, page: Home, layout: SidebarLayout },
    { path: config.routes.following, page: Following, layout: SidebarLayout },
    { path: config.routes.profile(), page: Profile, layout: ProfileLayout },
    { path: config.routes.video(), page: VideoPage, layout: BlankLayout },
    { path: config.routes.messages(), page: MessagesPage, layout: MainLayout },
    { path: '*', page: NotFoundPage, layout: MainLayout },
]
const privateRoutes = [{ path: config.routes.upload, page: Upload, layout: UploadLayout }]
export { publicRoutes, privateRoutes }
