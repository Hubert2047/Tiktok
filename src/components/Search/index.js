/* eslint-disable react-hooks/exhaustive-deps */
import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useEffect, useRef, useState } from 'react'
import { BiLoaderCircle } from 'react-icons/bi'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import { PopperWrapper } from '~/components/Popper'
import UserSearch from '~/components/UserSearch'
import { useDebounce } from '~/hooks'
import * as apiServices from '~/services'
import { SearchIcon } from '../Icons/index'
import styles from './Search.module.scss'
import { memo } from 'react'
const clsx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [isShowSearchResult, setIsShowSearchResult] = useState(true)
    const [searchResult, setSearchResult] = useState([])
    const debounced = useDebounce(searchValue, 500)
    const inputRef = useRef()

    useEffect(() => {
        async function getData() {
            if (!debounced) {
                searchResult?.length > 0 && setSearchResult([])
                return
            }
            setLoading(true)
            try {
                const data = await apiServices.searchUser(debounced)
                console.log(data)
                setSearchResult(data)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        }
        getData()
    }, [debounced])
    const handleInputOnChange = function (e) {
        if (e.target.value.startsWith(' ')) return
        setSearchValue(e.target.value)
    }
    const handleInputOnFocus = function () {
        if (!isShowSearchResult) {
            setIsShowSearchResult(true)
        }
    }
    const handleOnClearClick = function () {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }
    const handleShowResult = function () {
        setIsShowSearchResult(false)
    }
    return (
        <HeadlessTippy
            appendTo={() => document.body}
            visible={isShowSearchResult && searchResult?.length > 0}
            interactive={true}
            render={(attrs) => (
                <div className={clsx('search-result')} tabIndex='-1' {...attrs}>
                    <PopperWrapper>
                        <h4 className={clsx('search-result-title')}>Accounts</h4>
                        {searchResult?.map?.((user) => (
                            <UserSearch key={user.id} user={user} />
                        ))}
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleShowResult}>
            <div className={clsx('wrapper', 'd-flex')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    onChange={handleInputOnChange}
                    onFocus={handleInputOnFocus}
                    placeholder='Search accounts and videos'
                />
                <div className={clsx('d-flex', 'clear-box')}>
                    {searchValue && !loading && (
                        <button className={clsx('clear', 'd-flex')} onClick={handleOnClearClick}>
                            <IoIosCloseCircleOutline className={clsx('clear-icon')} />
                        </button>
                    )}
                    {loading && <BiLoaderCircle className={clsx('loading')} />}
                </div>
                <button
                    className={clsx('search-btn', 'd-flex')}
                    onMouseDown={(e) => {
                        e.preventDefault()
                    }}>
                    <SearchIcon className={clsx('search-icon')} />
                </button>
            </div>
        </HeadlessTippy>
    )
}

export default memo(Search)
