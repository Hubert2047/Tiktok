import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toastActions } from '~/redux/toastSlice'

function useToastAutoClose({ autoClose, autoCloseTime, toasts }) {
    const dispath = useDispatch()
    const [removingId, setRemovingId] = useState('')
    useEffect(() => {
        if (removingId) {
            dispath(toastActions.removeToast(removingId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removingId])
    useEffect(() => {
        if (autoClose && toasts?.length > 0) {
            setTimeout(() => {
                setRemovingId(toasts[toasts.length - 1].id)
            }, autoCloseTime)
        }
    }, [toasts, autoCloseTime, autoClose])
    return <div>useToastAutoClose</div>
}

export default useToastAutoClose
