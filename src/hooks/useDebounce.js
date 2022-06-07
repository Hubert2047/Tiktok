import { useEffect, useState } from 'react'
const useDebounce = function (value, delay) {
    const [debounceValue, setDebounceValue] = useState(value)
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            //     console.log('time')
            setDebounceValue(() => {
                // console.log('goin use state')
                return value
            })
        }, delay)

        return () => clearTimeout(timeOutId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value])
    return debounceValue
}

export default useDebounce
