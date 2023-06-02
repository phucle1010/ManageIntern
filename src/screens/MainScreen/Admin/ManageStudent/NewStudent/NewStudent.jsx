/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './NewStudent.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const NewStudent = ({ open, editable, studentinfo }) => {
    const [departmentlist, setDepartmentList] = useState([]);
    const [classlist, setCLassList] = useState([]);
    const [majorlist, setMajorList] = useState([]);

    const [newStudent, setNewStudent] = useState({
        image: '',
        full_name: '',
        dob: '',
        email: '',
        address: '',
        department_id: '',
        class_id: '',
        major_id: '',
    });

    useEffect(() => {
        if (studentinfo) {
            const dateFromMySQL = studentinfo.dob;
            const dateOnly = dateFromMySQL.substr(0, 10); // Lấy ra phần ngày tháng (YYYY-MM-DD)
            const inputDate = new Date(dateOnly);
            const formattedDate = inputDate.toISOString().slice(0, 10);
            setNewStudent((prevStudent) => {
                return {
                    ...newStudent,
                    image: studentinfo.image,
                    full_name: studentinfo.full_name,
                    dob: formattedDate,
                    email: studentinfo.email,
                    address: studentinfo.address,
                    department_id: studentinfo.id,
                    class_id: studentinfo.class_id,
                    major_id: studentinfo.major_id,
                };
            });
        }
    }, [studentinfo]);

    useEffect(() => {
        axios
            .get('/department')
            .then((res) => setDepartmentList(res.data))
            .catch((err) => console.log({ err: err }));
    }, []);

    useEffect(() => {
        if (newStudent.department_id !== '') {
            axios
                .get(`/class/department?department_id=${newStudent.department_id}`)
                .then((res) => setCLassList(res.data))
                .catch((err) => console.log(err));
        }
    }, [newStudent.department_id]);

    useEffect(() => {
        if (newStudent.department_id !== '') {
            axios
                .get(`/major/department?department_id=${newStudent.department_id}`)
                .then((res) => setMajorList(res.data))
                .catch((err) => console.log(err));
        }
    }, [newStudent.department_id]);

    const handleSave = () => {
        axios
            .post('/student/add', newStudent)
            .then((res) => {
                alert(res.data.responseData);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };

    const handleUpdate = () => {
        axios
            .put('/student/update', { newStudent: newStudent, user_id: studentinfo.user_id })
            .then((res) => {
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
    };

    const handleClickSave = () => {
        if (editable) {
            if (studentinfo) {
                handleUpdate();
            } else {
                handleSave();
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => open(false)} />
            <h3 className={cx('main-heading')}>Thông tin sinh viên</h3>
            <div className={cx('user-info')}>
                <div className={cx('user-upload')}>
                    <h4 className={cx('upload-heading')}>Ảnh đại diện</h4>
                    <div className={cx('upload-avatar')}>
                        <img
                            src={
                                newStudent.image ||
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
                                    setNewStudent((prev) => {
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
                                placeholder="Nguyễn Văn A"
                                readOnly={!editable}
                                value={newStudent.full_name}
                                onChange={(e) =>
                                    setNewStudent((prev) => {
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
                                placeholder="10/10/2002"
                                readOnly={!editable}
                                value={newStudent.dob}
                                onChange={(e) =>
                                    setNewStudent((prev) => {
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
                                placeholder="abc@gmail.com"
                                readOnly={!editable}
                                value={newStudent.email}
                                onChange={(e) =>
                                    setNewStudent((prev) => {
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
                                placeholder="Thành phố Hồ Chí Minh"
                                readOnly={!editable}
                                value={newStudent.address}
                                onChange={(e) =>
                                    setNewStudent((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Khoa</h5>
                            <select
                                className={cx('input-item')}
                                name="department_id"
                                disabled={!editable}
                                value={newStudent.department_id}
                                onChange={(e) =>
                                    e.target.value !== '' &&
                                    setNewStudent((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value="">Chọn Khoa</option>
                                {departmentlist.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.department_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Lớp</h5>
                            <select
                                className={cx('input-item')}
                                name="class_id"
                                disabled={!editable}
                                value={newStudent.class_id}
                                onChange={(e) =>
                                    e.target.value !== '' &&
                                    setNewStudent((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value="">Chọn Lớp</option>
                                {classlist.map((classes) => (
                                    <option key={classes.id} value={classes.id}>
                                        {classes.class_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('user-data-item', 'full-width')}>
                            <h5 className={cx('input-title')}>Ngành học</h5>
                            <select
                                className={cx('input-item')}
                                name="major_id"
                                disabled={!editable}
                                value={newStudent.major_id}
                                onChange={(e) =>
                                    e.target.value !== '' &&
                                    setNewStudent((prev) => {
                                        return {
                                            ...prev,
                                            [e.target.name]: e.target.value,
                                        };
                                    })
                                }
                            >
                                <option value="">Chọn ngành học</option>
                                {majorlist.map((major) => (
                                    <option key={major.id} value={major.id}>
                                        {major.major_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button className={cx('save-btn')} onClick={() => handleClickSave()}>
                Lưu
            </button>
        </div>
    );
};

export default NewStudent;
