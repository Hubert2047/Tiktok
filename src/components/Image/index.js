import classNames from 'classnames'
import { forwardRef, useState } from 'react'
import images from '~/assets/images'
import styles from './Image.module.scss'
const Image = forwardRef(({ src, alt, className, fallbackImage = images.defaultImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = function () {
        setFallback(fallbackImage)
    }
    return (
        <img
            ref={ref}
            className={classNames(className, styles.img)}
            src={fallback || src}
            alt={alt}
            {...props}
            onError={handleError}
        />
    )
})
export default Image
