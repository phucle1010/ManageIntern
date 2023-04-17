/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import styles from './Teacher.module.scss';
import classNames from 'classnames/bind';
import { Reorder, Cottage, Ballot, Chat, AccountCircle } from '@mui/icons-material';
import { MenuContext } from '../../../screens/Home/Home';

import MenuItem from '../MenuItem';

const cx = classNames.bind(styles);

const MENUS = [
    {
        name: 'Trang chủ',
        icon: Cottage,
        accessRole: 'teacher',
    },
    {
        name: 'Bảng điểm',
        icon: Ballot,
        accessRole: 'teacher',
    },
    {
        name: 'Trao đổi',
        icon: Chat,
        accessRole: 'teacher',
    },
    {
        name: 'Tài khoản',
        icon: AccountCircle,
        accessRole: 'teacher',
    },
];

const Teacher = ({ setMinimizeMenu, selectedSectionItem, setSelectedSectionItem }) => {
    const { minimizeMenu } = useContext(MenuContext);
    const [selectedItem, setSelectedItem] = useState(0);
    useEffect(() => {
        if (Object.keys(selectedSectionItem).length === 0) {
            setSelectedSectionItem(MENUS[0]);
        }
    }, [selectedSectionItem]);
    return (
        <div>
            <div className={cx('logo')}>
                <h4
                    className={cx('header', {
                        headerLogo: minimizeMenu,
                    })}
                >
                    LOGO
                </h4>
                <Reorder className={cx('icon')} onClick={() => setMinimizeMenu((prev) => !prev)} />
            </div>
            {MENUS.map((item, index) => (
                <MenuItem
                    key={index}
                    index={index}
                    item={item}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    setSelectedSectionItem={setSelectedSectionItem}
                />
            ))}
        </div>
    );
};

export default Teacher;
