function useShowIconStart(setIsShow, time) {
    setIsShow(true)
    setTimeout(() => {
        setIsShow(false)
    }, time)

    return []
}

export default useShowIconStart
