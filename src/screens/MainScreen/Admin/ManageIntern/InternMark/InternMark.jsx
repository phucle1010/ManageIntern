import React from 'react';
import classNames from 'classnames/bind';
import styles from './InternMark.module.scss';
import { Close } from '@mui/icons-material';
import { Avatar, FormControl, InputLabel, NativeSelect } from '@mui/material';

const cx = classNames.bind(styles);

const MARK_COMMUNITY = [
    {
        id: 1,
        name: 'Đặng Minh Quang',
        role: 'Chủ tịch',
        email: 'quangdm@gm.uit.edu.vn',
        img: 'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png',
    },
    {
        id: 2,
        name: 'Đỗ Nguyên Triết',
        role: 'Thư ký',
        email: 'trietnd@gm.uit.edu.vn',
        img: 'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png',
    },
    {
        id: 3,
        name: 'Trần Công Nguyên',
        role: 'Phản biện',
        email: 'nguyentc@gm.uit.edu.vn',
        img: 'https://icons.veryicon.com/png/o/business/bitcoin-icon/anonymous-4.png',
    },
];

const InternMark = ({ close }) => {
    const isCreatedCommunity = true;
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('title-heading')}>Thông tin chấm điểm</h3>
            {isCreatedCommunity === true ? (
                <div className={cx('list-info')}>
                    <h4 className={cx('list-heading')}>Thông tin hội đồng chấm thi</h4>
                    {MARK_COMMUNITY.map((markItem) => (
                        <div key={markItem.id} className={cx('list-detail', 'community')}>
                            <div className={cx('list-detail-item')}>
                                <Avatar src={markItem.img} />
                            </div>
                            <span className={cx('list-detail-item')}>{markItem.name}</span>
                            <span className={cx('list-detail-item')}>{markItem.role}</span>
                            <span className={cx('list-detail-item')}>{markItem.email}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={cx('list-info')}>
                    <h4 className={cx('list-heading')}>Lập hội đồng chấm thi</h4>
                    <div className={cx('list-detail', 'community')}>
                        {/* <div className={cx('list-detail-item')}>
                            <Avatar src={student.img} />
                        </div>
                        <span className={cx('list-detail-item')}>{student.name}</span>
                        <span className={cx('list-detail-item')}>{student.position}</span>
                        <div className={cx('list-detail-item')}>
                            <div className={cx('status')}>Đang chờ</div>
                        </div> */}
                    </div>
                </div>
            )}
            {/* <FormControl className={cx('list-info')}>
                <InputLabel variant="standard" className={cx('list-heading')} htmlFor="uncontrolled-native">
                    Vị trí Chủ tịch
                </InputLabel>
                <NativeSelect>
                    <option>Nguyễn Văn A</option>
                    <option>Nguyễn Văn B</option>
                    <option>Nguyễn Văn C</option>
                </NativeSelect>
            </FormControl> */}
        </div>
    );
};

export default InternMark;
