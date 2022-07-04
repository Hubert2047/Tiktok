import classNames from 'classnames/bind'
import { useDispatch } from 'react-redux'
import { containerPortalActions } from '~/redux/containerPortalSlice'
import Button from '../Button/index'
import styles from './Comfirm.module.scss'
const clsx = classNames.bind(styles)
function Comfirm({ question, subMitTitle, onSubmit, className }) {
    const dispath = useDispatch()
    const onCancel = function () {
        dispath(containerPortalActions.setComponent(null))
    }
    return (
        <div className={clsx('wrapper', className)}>
            <p className={clsx('question')}>{question}</p>
            <Button title={subMitTitle} className={clsx('comfirm-btn')} onClick={onSubmit} />
            <Button title={'Cancel'} className={clsx('cancel-btn')} onClick={onCancel} />
        </div>
    )
}

export default Comfirm
