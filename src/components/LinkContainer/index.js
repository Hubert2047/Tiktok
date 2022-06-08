import classNames from 'classnames/bind'
import Button from '~/components/Button'
import styles from './LinkContainer.module.scss'
const clsx = classNames.bind(styles)
function LinkContainer({ data, className }) {
    return (
        <div className={clsx('wrapper', 'd-flex', className)}>
            {data?.map((btn) => {
                return <Button key={btn.id} href='#' title={btn.title} className={clsx('btn', className)} />
            })}
        </div>
    )
}

export default LinkContainer
