import classNames from 'classnames/bind'
import React, { useRef } from 'react'
import * as ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import styles from './ContainerPortal.module.scss'
import { usePortalContainer } from '../../hooks'
import { containerPortalActions } from '../../redux/containerPortalSlice'

const clsx = classNames.bind(styles)
function ContainerPortal() {
    const dispath = useDispatch()
    const [loaded, portalId] = usePortalContainer('position:fixed;top:0;left:0;z-index:9999')
    const children = useSelector((state) => state.containerPortal.component)
    const divRef = useRef()

    const handleOnClick = function (e) {
        if (!children?.onClickOutside) return
        if (e.target === divRef.current) {
            dispath(containerPortalActions.setComponent(null))
        }
    }
    return loaded ? (
        ReactDOM.createPortal(
            <>
                {children && (
                    <div ref={divRef} onClick={handleOnClick} className={clsx('wrapper', 'flex-center')}>
                        {children?.component}
                    </div>
                )}
            </>,
            document.getElementById(portalId)
        )
    ) : (
        <></>
    )
}

export default ContainerPortal
