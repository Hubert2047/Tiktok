import styles from './Comfirm.module.scss'
import classNames from 'classnames/bind'
import Button from '../Button/index'
const clsx = classNames.bind(styles)
function Comfirm({ question, btnTitle, onCancel, onComfirm }) {
    return (
        <div className={clsx('wrapper')}>
            <p className={clsx('question')}>{question}</p>
            <Button title={btnTitle} className={clsx('comfirm-btn')} onClick={onComfirm} />
            <Button title={'Cancel'} className={clsx('cancel-btn')} onClick={onCancel} />
        </div>
    )
}

export default Comfirm
