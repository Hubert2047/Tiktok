/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
import classNames from 'classnames/bind'
import React, { useCallback, useEffect, useRef } from 'react'
import { HiMenuAlt2 } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import GetApp from '~/components/GetApp'
import Loading from '~/components/Loading'
import PostContainer from '~/components/PostContainter'
import ThemeMode from '~/components/ThemeMode'
import { getPosts } from '~/firebase'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import { homeActions } from '~/redux/homeSlice'
import styles from './Home.module.scss'
import MobileMenu from './MobileMenu'
const clsx = classNames.bind(styles)

function Home() {
    // console.log('re-render home')
    const dispath = useDispatch()
    const posts = useSelector((state) => state.home.posts)
    const hasMorePost = useSelector((state) => state.home.hasMorePost)
    const lastPost = useSelector((state) => state.home.lastPost)
    const observer = useRef()

    useEffect(() => {
        const getPostsJSON = function () {
            if (posts?.length > 0) return
            dispath(containerPortalActions.setComponent({ component: <Loading />, onClickOutside: true }))
            getPosts((data) => {
                dispath(homeActions.setPost(data.posts))
                if (!data?.posts?.length || data?.posts?.length < 10) {
                    dispath(homeActions.setHasMorePost(false))
                }
                dispath(homeActions.setLastApiPost(data.lastDoc))
                setTimeout(() => {
                    dispath(containerPortalActions.setComponent(null))
                }, 100) //wait video render
            })
        }
        getPostsJSON()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getMorePostsJSON = function (lastPost) {
        if (!hasMorePost) {
            return
        }
        getPosts((data) => {
            if (!data?.posts?.length || data?.posts?.length < 10) {
                dispath(homeActions.setHasMorePost(false))
                return
            }
            dispath(homeActions.setPost([...posts, ...data.posts]))
            dispath(homeActions.setLastApiPost(data.lastDoc))
        }, lastPost)
    }
    useEffect(() => {
        //reset currentplaying post id when component unmouse
        return () => {
            dispath(homeActions.setCurrentPostPlayingId(null))
        }
    }, [])

    //lazy loaded
    const lastPostCallBack = useCallback(
        (node) => {
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver(
                (entries) => {
                    if (entries[0].isIntersecting) {
                        if (posts?.length < 5 && !hasMorePost) return
                        getMorePostsJSON(lastPost)
                    }
                },
                { threshold: 0.5 }
            )
            if (node) {
                observer.current.observe(node)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [lastPost]
    )
    const handleOpenSidebar = function () {
        dispath(
            containerPortalActions.setComponent({
                component: <MobileMenu className={clsx('mobile-sidebar')} />,
                onClickOutside: false,
            })
        )
    }
    return (
        <div className={clsx('wrapper')}>
            {/* mobile version */}
            <div onClick={handleOpenSidebar} className={clsx('mobile-sidebar-btn')}>
                <HiMenuAlt2 className={clsx('mobile-sidebar-icon')} />
            </div>
            <div className={clsx('theme-mode-box')}>
                <ThemeMode className={clsx('theme-mode')} vertical={true} />
            </div>
            {/* <SnapScrollContainer> */}
            {posts?.map((post, index) => {
                //check the last post to know when have to get new post
                if (posts.length - 2 === index) {
                    return <PostContainer className={clsx('post')} ref={lastPostCallBack} key={index} post={post} />
                } else {
                    return <PostContainer className={clsx('post')} key={index} post={post} />
                }
            })}
            {/* </SnapScrollContainer> */}
            <GetApp />
        </div>
    )
}

export default Home
