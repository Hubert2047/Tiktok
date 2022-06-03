import DefaultLayout from '~/layouts/DefaultLayout'
import SidebarLayout from '~/layouts/SidebarLayout'
import Following from '~/pages/Following'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'

const publicRoutes = [
    { path: '/', page: Home, layout: SidebarLayout },
    { path: '/home', page: Home, layout: SidebarLayout },
    { path: '/following', page: Following, layout: SidebarLayout },
    { path: '/upload', page: Upload, layout: DefaultLayout },
    { path: '/profile', page: Profile, layout: SidebarLayout },
]

export { publicRoutes }
