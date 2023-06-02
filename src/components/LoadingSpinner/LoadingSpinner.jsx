import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoadingSpinner.module.scss';
import { Loading } from '@nextui-org/react';

const cx = classNames.bind(styles);

const LoadingSpinner = () => {
    return (
        <div className={cx('wrapper')}>
            <Loading type="points" color="primary" textColor="primary" />
        </div>
    );
};

export default LoadingSpinner;
