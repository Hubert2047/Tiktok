import classNames from 'classnames/bind'
import { forwardRef } from 'react'
import * as ReactDOM from 'react-dom'
import { useDispatch, useSelector } from 'react-redux'
import { usePortalContainer, useToastAutoClose } from '~/hooks'
import { toastActions } from '~/redux/toastSlice'
import Toast from '../Toast'
import styles from './ToastPortal.module.scss'

const clsx = classNames.bind(styles)
function ToastPortal({ className, autoClose = true, autoCloseTime = 2000 }, ref) {
    const dispath = useDispatch()
    // console.log('run')
    // const currentUser = useSelector((state) => state.user.user)
    // useEffect(() => {
    //     if (!currentUser?.uid) return
    //     getNewNotification(currentUser, (data) => {
    //         if (!data) return
    //         dispath(
    //             toastActions.addToast({
    //                 message: `You have a new notification from ${data?.fromUser?.full_name}`,
    //                 mode: 'success',
    //             })
    //         )
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    const toasts = useSelector((state) => state.toast.toasts)
    const [loaded, portalId] = usePortalContainer('position:fixed;top:10px;left:40%;z-index:9999')
    // useImperativeHandle(ref, () => ({
    //     addToast(toast) {
    //         setToasts([...(toasts || []), { ...toast, id: uuidv4() }])
    //     },
    // }))
    useToastAutoClose({ autoClose, autoCloseTime, toasts })
    const removeToast = function (toastId) {
        dispath(toastActions.setToast(toasts.filter((toast) => toast.id !== toastId)))
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
