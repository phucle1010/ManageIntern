import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './InternItem.module.scss';
import { Visibility } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import DetailSignUpInfo from '../DetailSignUpInfo';

const cx = classNames.bind(styles);

const InternItem = ({ student, interned, waiting, loadStudentSignUpIntern }) => {
    const [detailSignUpInternScreen, setDetailSignUpInternScreen] = useState(false);

    useEffect(() => {
        loadStudentSignUpIntern();
    }, [detailSignUpInternScreen]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item', { interned })}>
                <div className={cx('data-item', { interned })}>
                    <Avatar src={student.studentImage} />
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.id}</span>
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.studentName}</span>
                </div>
                <div className={cx('data-item', { interned })}>
                    <span className={cx('title-heading')}>{student.teacherName}</span>
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
                        <Visibility className={cx('view-icon')} onClick={() => setDetailSignUpInternScreen(true)} />
                    </div>
                </div>
            )}

            {detailSignUpInternScreen === true && (
                <DetailSignUpInfo student={student} show={setDetailSignUpInternScreen} />
            )}
        </div>
    );
};

export default InternItem;
