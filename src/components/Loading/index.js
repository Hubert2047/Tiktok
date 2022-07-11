import classNames from 'classnames/bind'
import React from 'react'
import styles from './Loading.module.scss'
const clsx = classNames.bind(styles)
// interface Props {
//     className?: string
// }
function Loading({ className }) {
    return <div className={clsx('wrapper', className)}></div>
}

export default Loading
