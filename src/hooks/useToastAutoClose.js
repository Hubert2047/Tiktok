import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toastActions } from '~/redux/toastSlice'

function useToastAutoClose({ autoClose, autoCloseTime, toasts }) {
    const dispath = useDispatch()
    const [removing, setRemoving] = useState('')
    useEffect(() => {
        if (removing) {
            dispath(toastActions.removeToast())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removing])
    useEffect(() => {
        if (autoClose && toasts?.length > 0) {
            setTimeout(() => {
                setRemoving(toasts[toasts.length - 1].id)
            }, autoCloseTime)
        }
    }, [toasts, autoCloseTime, autoClose])
    return <div>useToastAutoClose</div>
}

export default useToastAutoClose
