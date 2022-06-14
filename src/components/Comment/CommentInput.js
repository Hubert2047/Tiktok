import classNames from 'classnames/bind'
import { useState } from 'react'
import { SmileIcon } from '~/components/Icons'
import Button from '../Button'
import styles from './Comment.module.scss'
const clsx = classNames.bind(styles)

function CommentInput({ className }) {
    const [value, setValue] = useState('')
    const handleOnchange = function (e) {
        setValue(e.target.value)
    }
    const btnColor = value ? 'color-primary' : 'color-grey'
    const disabled = value ? false : true
    return (
        <div className={clsx('comment-input', className)}>
            <div className={clsx('input-box', 'd-flex')}>
                <input placeholder='Add comment' value={value} onChange={handleOnchange} className={clsx('input')} />
                <SmileIcon />
            </div>
            <Button title='Post' color={btnColor} className={clsx('btn')} disabled={disabled} />
        </div>
    )
}

export default CommentInput
