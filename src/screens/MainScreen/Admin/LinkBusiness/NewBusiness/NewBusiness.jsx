import React from 'react';
import classNames from 'classnames/bind';
import styles from './NewBusiness.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const NewBusiness = ({ openScreen, setNewBusiness, editable, newBusiness }) => {
    const saveBusiness = (newBusiness) => {
        console.log(newBusiness);

        axios
            .post('/user/business/add', newBusiness)
            .then((res) => {
                console.log(res.data);
                if (res.statusCode === 400) {
                    window.alert(`Lỗi ${res.data.responseData}`);
                } else if (res.statusCode === 401) {
                    window.alert(`Lỗi ${res.data.responseData}`);
                } else {
                    window.alert(res.data.responseData);
                    window.location.reload();
                }
            })
            .catch((err) => {
                console.log({ err: err });
            });

        setNewBusiness({
            id: 0,
            name: '',
            img: '',
            phone: '',
            email: '',
            address: '',
            establishDate: '',
            sector: '',
            representator: '',
            desc: '',
        });
    };
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => openScreen(false)} />
            <h3 className={cx('main-heading')}>Thông tin doanh nghiệp</h3>
            <div className={cx('business-info')}>
                <div className={cx('business-upload')}>
                    <h4 className={cx('upload-heading')}>Hình ảnh</h4>
                    <div className={cx('upload-avatar')}>
                        <img
                            src={
                                newBusiness.img ||
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
                        readOnly={!editable}
                        name="img"
                        onChange={(e) => {
                            const getbase64 = (file) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    setNewBusiness((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: reader.result,
                                        };
                                    });
                                };
                            };
                            if (e.target.files && e.target.files[0]) {
                                getbase64(e.target.files[0]);
                            }
                        }}
                    />
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
                                value={newBusiness.name}
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
                                value={newBusiness.phone}
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
                                value={newBusiness.email}
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
                                value={newBusiness.address}
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
                                value={newBusiness.sector}
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
                                value={newBusiness.representator}
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
                                value={newBusiness.desc}
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
                    saveBusiness(newBusiness);
                    openScreen(false);
                }}
            >
                Lưu
            </button>
        </div>
    );
};

export default NewBusiness;
