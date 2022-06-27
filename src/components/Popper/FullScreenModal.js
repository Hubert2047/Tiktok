import classNames from 'classnames/bind'
import { useEffect, useRef } from 'react'
import styles from './Popper.module.scss'
const clsx = classNames.bind(styles)
function FullScreenModal({ children, className, handleShowPopup }) {
    const divRef = useRef(null)
    useEffect(() => {
        document.body.style.overflow = 'hidden'
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])
    const handleOnclick = (e) => {
        if (divRef.current === e.target) handleShowPopup(false)
    }
    return (
        <div ref={divRef} onClick={handleOnclick} className={clsx('fullscreen-modal', 'd-flex', `${className}`)}>
            {children}
        </div>
    )
}

export default FullScreenModal
