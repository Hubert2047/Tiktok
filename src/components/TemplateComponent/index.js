import styles from './TemplateComponent.module.scss'
import classNames from 'classnames/bind'
const clsx = classNames.bind(styles)
function TemplateComponent() {
    return <div className={clsx('wrapper')}>TemplateComponent</div>
}

export default TemplateComponent
