import React from 'react';
import classNames from 'classnames/bind';
import styles from './DetailBusiness.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const DetailBusiness = ({ business, openScreen }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => openScreen({})} />
            <h3 className={cx('main-heading')}>Thông tin doanh nghiệp</h3>
            <div className={cx('profile')}>
                <div className={cx('profile-options')}>
                    <div className={cx('profile-avt')}>
                        <img
                            src={
                                business.img ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU'
                            }
                            alt=""
                        />
                    </div>
                    <h3 className={cx('job-position')}>{business.name}</h3>
                    <h5 className={cx('name')}>{business.address}</h5>
                </div>
                <div className={cx('profile-detail')}>
                    <div className={cx('user-form')}>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Số điện thoại</h5>
                            <input
                                className={cx('input-item')}
                                type="phone"
                                name="email"
                                placeholder="0368xxx"
                                readOnly={true}
                                value={business.phone}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Email</h5>
                            <input
                                className={cx('input-item')}
                                type="email"
                                name="email"
                                placeholder="abc@gmail.com"
                                readOnly={true}
                                value={business.email}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Ngày thành lập</h5>
                            <input
                                className={cx('input-item')}
                                type="date"
                                name="entryDate"
                                value={business.establishDate}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Lĩnh vực hoạt động</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="sector"
                                readOnly={true}
                                value={business.sector}
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Người đại diện</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="representator"
                                readOnly={true}
                                value={business.representator}
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Mô tả công ty</h5>
                            <textarea
                                className={cx('input-item')}
                                type="text"
                                name="representator"
                                readOnly={true}
                                value={business.desc}
                                rows={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className={cx('option-btn')}>
                <button className={cx('save-btn')}>Lưu thay đổi</button>
            </div> */}
        </div>
    );
};

export default DetailBusiness;
