import config from '~/config'
import BlankLayout from '~/layouts/BlankLayout'
//layouts
import MainLayout from '~/layouts/MainLayout'
import SidebarLayout from '~/layouts/SidebarLayout'
import ProfileLayout from '~/layouts/ProfileLayout'
//pages
import Following from '~/pages/Following'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import VideoPage from '~/pages/VideoPage'
const publicRoutes = [
    { path: config.routes.home, page: Home, layout: SidebarLayout },
    { path: config.routes.following, page: Following, layout: SidebarLayout },
    { path: config.routes.upload, page: Upload, layout: MainLayout },
    { path: config.routes.profile(), page: Profile, layout: ProfileLayout },
    { path: config.routes.video, page: VideoPage, layout: BlankLayout },
]

export { publicRoutes }
