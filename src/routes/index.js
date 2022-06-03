import Following from '~/pages/Following'
import Home from '~/pages/Home'
import Profile from '~/pages/Profile'
import Upload from '~/pages/Upload'
import DefaultLayout from '~/Layouts/DefaultLayout'
import SidebarLayout from '~/Layouts/SidebarLayout'

const publicRoutes = [
    { path: '/', page: Home, layout: SidebarLayout },
    { path: '/home', page: Home, layout: SidebarLayout },
    { path: '/following', page: Following, layout: SidebarLayout },
    { path: '/upload', page: Upload, layout: DefaultLayout },
    { path: '/profile', page: Profile, layout: SidebarLayout },
]

export { publicRoutes }
