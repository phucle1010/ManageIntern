import React, { useState } from 'react';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './DetailBusiness.module.scss';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const DetailBusiness = ({ business, openScreen }) => {
    const [businessItem, setBusinessItem] = useState(business);

    const handlePutBusiness = async () => {
        await axios
            .put('/user/business/edit', businessItem)
            .then((res) => {
                alert(res.data.responseData);
                if (res.data.statusCode === 200) {
                    openScreen({});
                }
            })
            .catch((err) => alert(err));
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => openScreen({})} />
            <h3 className={cx('main-heading')}>Thông tin doanh nghiệp</h3>
            <div className={cx('profile')}>
                <div className={cx('profile-options')}>
                    <div className={cx('profile-avt')}>
                        <img
                            src={
                                businessItem.image ||
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU'
                            }
                            alt=""
                        />
                    </div>
                    <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                        Chọn File
                    </label>
                    <input
                        type="file"
                        id={cx('upload-input')}
                        name="image"
                        onChange={(e) => {
                            const getbase64 = (file) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    setBusinessItem((prev) => {
                                        return {
                                            ...prev,
                                            image: reader.result,
                                        };
                                    });
                                };
                            };
                            if (e.target.files && e.target.files[0]) {
                                getbase64(e.target.files[0]);
                            }
                        }}
                    />
                    <h3 className={cx('job-position')}>{business.company_name}</h3>
                    <h5 className={cx('name')}>{business.address}</h5>
                </div>
                <div className={cx('profile-detail')}>
                    <div className={cx('user-form')}>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Số điện thoại</h5>
                            <input
                                className={cx('input-item')}
                                type="phone"
                                name="phone"
                                // placeholder="0368xxx"
                                // readOnly={true}
                                value={businessItem.phone}
                                onChange={(e) =>
                                    setBusinessItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Email</h5>
                            <input
                                className={cx('input-item')}
                                type="email"
                                name="email"
                                value={businessItem.email}
                                onChange={(e) =>
                                    setBusinessItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Ngày thành lập</h5>
                            <input
                                className={cx('input-item')}
                                type="date"
                                name="establish_date"
                                value={businessItem.establish_date}
                                onChange={(e) =>
                                    setBusinessItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Lĩnh vực hoạt động</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="sector"
                                // readOnly={true}
                                value={businessItem.sector}
                                onChange={(e) =>
                                    setBusinessItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Người đại diện</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="representator"
                                // readOnly={true}
                                value={businessItem.representator}
                                onChange={(e) =>
                                    setBusinessItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Mô tả công ty</h5>
                            <textarea
                                className={cx('input-item')}
                                type="text"
                                name="short_desc"
                                // readOnly={true}
                                value={businessItem.short_desc}
                                rows={3}
                                onChange={(e) =>
                                    setBusinessItem((prev) => {
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
            <div className={cx('option-btn')}>
                <button className={cx('save-btn')} onClick={handlePutBusiness}>
                    Lưu thay đổi
                </button>
            </div>
        </div>
    );
};

export default DetailBusiness;
