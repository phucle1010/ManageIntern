/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import styles from './Student.module.scss';
import classNames from 'classnames/bind';
import { Reorder, Cottage, HomeWork, Chat, AccountCircle, LibraryBooksTwoTone } from '@mui/icons-material';
import { MenuContext } from '../../../screens/Home/Home';

import MenuItem from '../MenuItem';

const cx = classNames.bind(styles);

const MENUS = [
    {
        name: 'Trang chủ',
        icon: Cottage,
        accessRole: 'student',
    },
    {
        name: 'Thư viện',
        icon: LibraryBooksTwoTone,
        accessRole: 'student',
    },
    {
        name: 'Thực tập',
        icon: HomeWork,
        accessRole: 'student',
    },
    {
        name: 'Trao đổi',
        icon: Chat,
        accessRole: 'student',
    },
    {
        name: 'Tài khoản',
        icon: AccountCircle,
        accessRole: 'student',
    },
];

const Student = ({ setMinimizeMenu, selectedSectionItem, setSelectedSectionItem }) => {
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
                    minimizeMenu={minimizeMenu}
                    setSelectedSectionItem={setSelectedSectionItem}
                />
            ))}
        </div>
    );
};

export default Student;
