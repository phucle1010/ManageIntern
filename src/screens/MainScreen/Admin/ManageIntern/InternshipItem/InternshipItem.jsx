import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InternshipItem.module.scss';
import { Visibility } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import InternInfo from '../InternInfo';

const cx = classNames.bind(styles);

const InternshipItem = ({ student, interned, waiting }) => {
    const [internInfoScreen, setInternInfoScreen] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item', { interned })}>
                <div className={cx('data-item', { interned })}>
                    <Avatar src={student.studentImage} />
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.studentId}</span>
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.studentName}</span>
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.position}</span>
                </div>
                {interned === true && (
                    <div className={cx('data-item', { interned })}>
                        <span className={cx('title-heading')}>{student.score}</span>
                    </div>
                )}
                {!interned && !waiting && (
                    <div className={cx('data-item', { interned })}>
                        <span className={cx('title-heading')}>{student.internTime}</span>
                    </div>
                )}
            </div>
            {interned === false && waiting === true && (
                <div className={cx('options')}>
                    <div className={cx('option-item')}>
                        <Visibility className={cx('view-icon')} onClick={() => setInternInfoScreen(true)} />
                    </div>
                </div>
            )}

            {internInfoScreen === true && <InternInfo student={student} close={setInternInfoScreen} />}
        </div>
    );
};

export default InternshipItem;
