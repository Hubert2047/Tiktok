import classNames from 'classnames/bind'
import { Fragment } from 'react'
import User from '~/components/User'
import ProfileContainer from '../ProfileContainer'
import styles from './UserContainer.module.scss'
const clsx = classNames.bind(styles)
function UserContainer({ data, className, title, seeText, handleSeeMoreClick }) {
    return (
        <div className={clsx('wrapper', className)}>
            <h4 className={clsx('title')}>{title}</h4>
            {data?.length > 0 ? (
                <Fragment>
                    {data?.map?.((user) => {
                        return (
                            <ProfileContainer key={user.id} user={user} placement='bottom-start'>
                                <User key={user.id} user={user} />
                            </ProfileContainer>
                        )
                    })}
                    <p className={clsx('seemore')} onClick={() => handleSeeMoreClick(seeText)}>
                        {seeText}
                    </p>
                </Fragment>
            ) : (
                <p className={clsx('text')}>{`${title.toLowerCase()} will appear here`}</p>
            )}
        </div>
    )
}

export default UserContainer
