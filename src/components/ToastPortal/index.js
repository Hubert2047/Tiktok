import classNames from 'classnames/bind'
import { forwardRef } from 'react'
import * as ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useToast, useToastAutoClose } from '~/hooks'
import { toastActions } from '~/redux/toastSlice'
import Toast from '../Toast'
import styles from './ToastPortal.module.scss'

const clsx = classNames.bind(styles)
function ToastPortal({ className, autoClose = true, autoCloseTime = 2000 }, ref) {
    const dispath = useDispatch()
    const toasts = useSelector((state) => state.toast.toasts)
    const [loaded, portalId] = useToast()
    // useImperativeHandle(ref, () => ({
    //     addToast(toast) {
    //         setToasts([...(toasts || []), { ...toast, id: uuidv4() }])
    //     },
    // }))
    useToastAutoClose({ autoClose, autoCloseTime, toasts })
    const removeToast = function (toastId) {
        dispath(toastActions.setToasts(toasts.filter((toast) => toast.id !== toastId)))
    }
    return loaded ? (
        ReactDOM.createPortal(
            <div className={clsx('wrapper', 'd-flex')}>
                {toasts?.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        mode={toast.mode}
                        title={toast.title}
                        onClose={() => {
                            removeToast(toast.id)
                        }}
                    />
                ))}
            </div>,
            document.getElementById(portalId)
        )
    ) : (
        <></>
    )
}

export default forwardRef(ToastPortal)
