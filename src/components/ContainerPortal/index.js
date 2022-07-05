import classNames from 'classnames/bind'
import { useRef } from 'react'
import * as ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { usePortalContainer } from '~/hooks'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import styles from './ContainerPortal.module.scss'

const clsx = classNames.bind(styles)

function ContainerPortal() {
    const dispath = useDispatch()
    const [loaded, portalId] = usePortalContainer('position:fixed;top:0;left:0;z-index:9999')
    const component = useSelector((state) => state.containerPortal.component)
    const divRef = useRef()
    const isExsit = component !== null
    const handleOnClick = function (e) {
        if (e.target === divRef.current) {
            dispath(containerPortalActions.setComponent(null))
        }
    }
    return loaded ? (
        ReactDOM.createPortal(
            <>
                {isExsit && (
                    <div ref={divRef} onClick={handleOnClick} className={clsx('wrapper', 'flex-center')}>
                        {component}
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
