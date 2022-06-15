// import classNames from 'classnames/bind'
// import { forwardRef, useCallback, useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { commentActions } from '~/redux/commentSlice'
// import styles from './TextArea.module.scss'

// const clsx = classNames.bind(styles)
// const TextArea = forwardRef(({ className }, ref) => {
//     const dispath = useDispatch()
//     const [value, setValue] = useState('')
//     const handleOnchange = function (e) {
//         setValue(e.target.value)
//     }
//     const inputRef = useCallback((node) => {
//         dispath(commentActions.setInputRef(node))
//     }, [])
//     return (
//         <form className={clsx('comment-input', className)}>
//             {/* <div className={clsx('input-box', 'd-flex')}>
//                 <textarea
//                     ref={inputRef}
//                     placeholder='Add comment ...'
//                     value={value}
//                     maxLength={150}
//                     require='true'
//                     onChange={handleOnchange}
//                     className={clsx('text-area')}
//                 />
//                 <SmileIcon />
//             </div>
//             <Button
//                 onClick={() => {
//                     console.log('click')
//                 }}
//                 title='Post'
//                 color={btnColor}
//                 className={clsx('btn')}
//                 disabled={disabled}
//             /> */}
//         </form>
//     )
// })

// export default TextArea
