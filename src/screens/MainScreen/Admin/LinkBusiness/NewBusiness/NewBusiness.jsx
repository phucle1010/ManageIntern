import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from './NewBusiness.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const NewBusiness = ({ openScreen, setBusinesses, editable, businesses }) => {
    const [business, setBusiness] = useState({
        userName: '',
        image: '',
        phone: '',
        email: '',
        address: '',
        establishDate: '',
        industrySector: '',
        shortDesc: '',    
        representator: '',    
    });
    const saveBusiness = () => {
        axios
            .post('/user/business', business)
            .then((res) => {
                setBusinesses([...businesses, res.data]);
                alert('Thêm thành công');
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    alert(error.response.data.details[0]);
                } else if (error.response.status === 401) {
                    alert(error.response.data);
                } else {
                    alert('Unknown error occurred');
                }
            });

        setBusiness ({
            userName: '',
            image: '',
            phone: '',
            email: '',
            address: '',
            establishDate: '',
            industrySector: '',
            representator: '',
            shortDesc: '',        
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
                                business.image ||
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
                        name="image"
                        onChange={(e) => {
                            const getbase64 = (file) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    setBusiness((prev) => {
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
                                name="userName"
                                value={business.userName}
                                placeholder="FPT"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                                value={business.phone}
                                placeholder="0368xxx"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                                value={business.email}
                                placeholder="abc@gmail.com"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                                name="establishDate"
                                value={business.establishDate}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                                value={business.address}
                                // placeholder="Hồ Chí Minh"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                                name="industrySector"
                                value={business.industrySector}
                                // placeholder="Hồ Chí Minh"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                                value={business.representator}
                                // placeholder="Hồ Chí Minh"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                                name="shortDesc"
                                value={business.shortDesc}
                                placeholder="Mô tả"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setBusiness((prev) => {
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
                    saveBusiness();
                    //openScreen(false);
                }}
            >
                Lưu
            </button>
        </div>
    );
};

export default NewBusiness;
