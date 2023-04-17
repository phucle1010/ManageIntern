import React, { useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './MenuItem.module.scss';
import { MenuContext } from '../../../screens/Home/Home';

const cx = classNames.bind(styles);

const MenuItem = ({ ...props }) => {
    const { minimizeMenu } = useContext(MenuContext);
    const { index, item, selectedItem, setSelectedItem, setSelectedSectionItem } = props;
    const ItemIcon = item.icon;

    return (
        <div
            className={cx(`wrapper`, {
                active: selectedItem === index,
            })}
            onClick={() => {
                setSelectedItem(index);
                setSelectedSectionItem(item);
            }}
        >
            <ItemIcon className={cx('icon')} />
            <h4
                className={cx('header', {
                    minimize: minimizeMenu,
                })}
            >
                {item.name}
            </h4>
        </div>
    );
};

export default MenuItem;
