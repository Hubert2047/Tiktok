import config from '~/config'
import MainLayout from '~/layouts/MainLayout'
import SidebarLayout from '~/layouts/SidebarLayout'
import Following from '~/pages/Following'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'

const publicRoutes = [
    { path: config.routes.home, page: Home, layout: SidebarLayout },
    { path: config.routes.following, page: Following, layout: SidebarLayout },
    { path: config.routes.upload, page: Upload, layout: MainLayout },
    { path: config.routes.profile(), page: Profile, layout: SidebarLayout },
]

export { publicRoutes }
