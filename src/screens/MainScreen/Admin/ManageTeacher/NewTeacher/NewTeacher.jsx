import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NewTeacher.module.scss';
import axios from 'axios';
import { Close } from '@mui/icons-material';

const cx = classNames.bind(styles);

const NewTeacher = ({ show, editable, teacher, departments }) => {
    const [teacherItem, setTeacherItem] = useState({ ...teacher, current_status: teacher.current_status.data[0] });

    const formmatedDate = (date) => {
        const convertedDate = new Date(Date.parse(date));
        const day = ('0' + convertedDate.getDate()).slice(-2);
        const month = ('0' + (convertedDate.getMonth() + 1)).slice(-2);
        return convertedDate.getFullYear() + '-' + month + '-' + day;
    };

    const handleTeacherAccount = () => {
        const isCreateNewTeacher = teacherItem.id === null;
        if (isCreateNewTeacher) {
            axios
                .post('/admin/teacher/createAccount', {
                    full_name: teacherItem.full_name,
                })
                .then((res) => {
                    if (res.data.statusCode === 400) {
                        alert(res.data.responseData);
                    } else {
                        const createdUsername = res.data.responseData;
                        handlePostTeacherPerson(createdUsername);
                    }
                });
        } else {
            handlePutTeacherPerson(teacherItem.username);
        }
    };

    const handlePostTeacherPerson = (username) => {
        axios
            .post('/admin/teacher/createPersonalInfo', {
                username,
                full_name: teacherItem.full_name,
                image: teacherItem.image,
                phone: teacherItem.phone,
                email: teacherItem.email,
                address: teacherItem.address,
                isPosted: true,
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    alert(res.data.responseData);
                } else {
                    const user_id = res.data.responseData;
                    handlePostTeacherDetail(user_id);
                }
            });
    };

    const handlePutTeacherPerson = (username) => {
        axios
            .put('/admin/teacher/editPersonalInfo', {
                username,
                full_name: teacherItem.full_name,
                image: teacherItem.image,
                phone: teacherItem.phone,
                email: teacherItem.email,
                address: teacherItem.address,
                isPosted: false,
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    alert(res.data.responseData);
                } else {
                    if (res.data.responseData.affectedRows > 0) {
                        handlePutTeacherDetail(username);
                    }
                }
            });
    };

    const handlePostTeacherDetail = (id) => {
        axios
            .post('/admin/teacher/createDetailInfo', {
                user_id: id,
                dob: teacherItem.dob,
                start_date: teacherItem.start_date,
                education_level: teacherItem.education_level,
                experience_year: teacherItem.experience_year,
                current_status: teacherItem.current_status,
                department_id: teacherItem.department_id,
                isPosted: true,
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    alert(res.data.responseData);
                } else {
                    alert(res.data.responseData);
                    show({});
                }
            });
    };

    const handlePutTeacherDetail = (username) => {
        axios
            .put('/admin/teacher/editDetailInfo', {
                username,
                dob: teacherItem.dob,
                start_date: teacherItem.start_date,
                education_level: teacherItem.education_level,
                experience_year: teacherItem.experience_year,
                current_status: teacherItem.current_status,
                department_id: teacherItem.department_id,
                isPosted: false,
            })
            .then((res) => {
                if (res.data.statusCode === 400) {
                    alert(res.data.responseData);
                } else {
                    alert(res.data.responseData);
                    show({});
                }
            });
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => show({})} />
            <h3 className={cx('main-heading')}>Thông tin giảng viên</h3>
            <div className={cx('user-info')}>
                <div className={cx('user-upload')}>
                    <h4 className={cx('upload-heading')}>Ảnh đại diện</h4>
                    <div className={cx('upload-avatar')}>
                        <img
                            src={
                                teacherItem.image ||
                                'https://t4.ftcdn.net/jpg/04/99/93/31/360_F_499933117_ZAUBfv3P1HEOsZDrnkbNCt4jc3AodArl.jpg'
                            }
                            alt=""
                        />
                    </div>
                    <label className={cx('upload-btn')} htmlFor={cx('upload-input')}>
                        Chọn File
                    </label>
                    <input
                        type="file"
                        name="image"
                        id={cx('upload-input')}
                        readOnly={!editable}
                        onChange={(e) => {
                            const getbase64 = (file) => {
                                let reader = new FileReader();
                                reader.readAsDataURL(file);
                                reader.onload = () => {
                                    setTeacherItem((prev) => {
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
                <div className={cx('user-detail')}>
                    <h4 className={cx('detail-heading')}>Thông tin cá nhân</h4>
                    <div className={cx('user-form')}>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Họ và tên</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="full_name"
                                value={teacherItem.full_name}
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Ngày sinh</h5>
                            <input
                                className={cx('input-item')}
                                type="date"
                                name="dob"
                                value={formmatedDate(teacherItem.dob)}
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Số điện thoại</h5>
                            <input
                                className={cx('input-item')}
                                type="phone"
                                name="phone"
                                value={teacherItem.phone}
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Email</h5>
                            <input
                                className={cx('input-item')}
                                type="email"
                                name="email"
                                value={teacherItem.email}
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Địa chỉ</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="address"
                                value={teacherItem.address}
                                placeholder="Thành phố Hồ Chí Minh"
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Ngày vào làm</h5>
                            <input
                                className={cx('input-item')}
                                type="date"
                                name="start_date"
                                value={formmatedDate(teacherItem.start_date)}
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Số năm kinh nghiệm</h5>
                            <input
                                className={cx('input-item')}
                                type="number"
                                name="experience_year"
                                value={teacherItem.experience_year}
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Trình độ học vấn</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="education_level"
                                value={teacherItem.education_level}
                                readOnly={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Trạng thái giảng dạy</h5>
                            <select
                                className={cx('input-item')}
                                name="current_status"
                                value={teacherItem.current_status}
                                disabled={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value="-1">Chọn tình trạng</option>
                                <option value="0">Hết dạy</option>
                                <option value="1">Đang dạy</option>
                            </select>
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Khoa</h5>
                            <select
                                className={cx('input-item')}
                                name="department_id"
                                value={teacherItem.department_id}
                                disabled={!editable}
                                onChange={(e) =>
                                    setTeacherItem((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value="0">Chọn khoa</option>
                                {departments.length > 0 &&
                                    departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.department_name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button className={cx('save-btn')} onClick={handleTeacherAccount}>
                Lưu
            </button>
        </div>
    );
};

export default NewTeacher;
