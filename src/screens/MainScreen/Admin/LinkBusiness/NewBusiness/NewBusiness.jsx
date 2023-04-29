import React from 'react';
import classNames from 'classnames/bind';
import styles from './NewBusiness.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const NewBusiness = ({ openScreen, setNewBusiness, editable, lastIndex }) => {
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => openScreen(false)} />
            <h3 className={cx('main-heading')}>Thông tin doanh nghiệp</h3>
            <div className={cx('business-info')}>
                <div className={cx('business-upload')}>
                    <h4 className={cx('upload-heading')}>Hình ảnh</h4>
                    <div className={cx('upload-avatar')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                        Chọn File
                    </label>
                    <input type="file" id={cx('upload-input')} readOnly={!editable} />
                </div>
                <div className={cx('business-detail')}>
                    <h4 className={cx('detail-heading')}>Chi tiết doanh nghiệp</h4>
                    <div className={cx('business-form')}>
                        <div className={cx('business-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Tên doanh nghiệp</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="name"
                                placeholder="FPT"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('business-data-item')}>
                            <h5 className={cx('input-title')}>Số điện thoại</h5>
                            <input
                                className={cx('input-item')}
                                type="phone"
                                name="phone"
                                placeholder="0368xxx"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('business-data-item')}>
                            <h5 className={cx('input-title')}>Email</h5>
                            <input
                                className={cx('input-item')}
                                type="email"
                                name="email"
                                placeholder="abc@gmail.com"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('business-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Địa chỉ</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="address"
                                // placeholder="Hồ Chí Minh"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('business-data-item')}>
                            <h5 className={cx('input-title')}>Lĩnh vực hoạt động</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="sector"
                                // placeholder="Hồ Chí Minh"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('business-data-item')}>
                            <h5 className={cx('input-title')}>Người đại diện</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="representator"
                                // placeholder="Hồ Chí Minh"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('business-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Mô tả công ty</h5>
                            <textarea
                                className={cx('input-item')}
                                rows={3}
                                name="desc"
                                placeholder="Mô tả"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            <button
                className={cx('save-btn')}
                onClick={() => {
                    setNewBusiness((prev) => {
                        return {
                            ...prev,
                            id: lastIndex + 1,
                        };
                    });
                    openScreen(false);
                }}
            >
                Lưu
            </button>
        </div>
    );
};

export default NewBusiness;
