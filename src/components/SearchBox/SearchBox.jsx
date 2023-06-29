import React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchBox.module.scss';
import { Search } from '@mui/icons-material';

const cx = classNames.bind(styles);

const SearchBox = ({search, setSearch}) => {
    return (
        <div className={cx('wrapper')}>
            <input className={cx('search-input')} type="text" placeholder="Tìm kiếm..." name="search" value={search} onChange={(e) => setSearch(e.target.value)} />
            <Search className={cx('icon-search')} />
        </div>
    );
};

export default SearchBox;
