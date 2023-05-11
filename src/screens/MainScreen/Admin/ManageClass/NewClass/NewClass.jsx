import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './NewClass.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const NewClass = ({ close, editable , classInfo}) => {
    const [departmentlist, setDepartmentList] = useState([]);
    const [teacherList, setTeacherList] = useState([]);

    const [newclass, setNewClass] = useState({
        name: '',
        students: '',
        academic_year: new Date().getFullYear(),
        head_teacher: '',
        department_id: '',
    });

    useEffect(() => {
        if (classInfo) {
            console.log(classInfo);
            setNewClass(prevClass => {
            return {
              ...newclass,
              name: classInfo.class_name,
              students: classInfo.students,
              academic_year: classInfo.academic_year,
              head_teacher: classInfo.head_teacher,
              department_id: classInfo.department_id,
            };
          });
        }
      }, [classInfo]);

    useEffect(() => {
        axios
            .get('/department')
            .then((res) => setDepartmentList(res.data))
            .catch((err) => console.log({err: err}));
    }, []);

    useEffect(() => {
        if (newclass.department_id !== "") {
            axios
                .get(`/teacher/department?department_id=${newclass.department_id}`)
                .then((res) => setTeacherList(res.data))
                .catch((err) => console.log(err));
        }
    }, [newclass.department_id]);

    

    const saveClass = () => {

        axios
            .post('/class/add', newclass)
            .then((res) => {
                if(res.statusCode === 400){
                    window.alert(`Lỗi ${res.data.responseData}`);
                }else if(res.statusCode === 401){
                    window.alert(`Lỗi ${res.data.responseData}`);
                }else{
                    window.alert(res.data.responseData);
                    window.location.reload();
                }
            })
            .catch((err) => {console.log({err: err})})
    }

    const updateClass = () => {
        axios
            .put('/class/update', {newclass: newclass, classId: classInfo.id})
            .then((res) => {
                if(res.statusCode === 400){
                    window.alert(`Lỗi ${res.data.responseData}`);
                }else if(res.statusCode === 401){
                    window.alert(`Lỗi ${res.data.responseData}`);
                }else{
                    window.alert(res.data.responseData);
                    window.location.reload();
                }
            })
            .catch((err) => {console.log({err: err})})
    }

    const handleSave = () => {
        if (classInfo){
            updateClass();
        }else{
            saveClass();
        }
    }

    console.log(editable);
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => close(false)} />
            <h3 className={cx('main-heading')}>Thông tin lớp</h3>
            <div className={cx('user-detail')}>
                <div className={cx('user-form')}>
                    <div className={cx('user-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Tên lớp</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="name"
                            placeholder="KTPM2020"
                            readOnly={!editable}
                            value={newclass.name}
                            onChange={(e) =>
                                setNewClass((prev) => {
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
                        <select value={newclass.department_id} className={cx('input-item')} name="department_id" readOnly={!editable} onChange={(e) => e.target.value !== "" && 
                            setNewClass((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })
                        }>
                            <option value="">Chọn Khoa</option>
                            {departmentlist.map((department) => (
                                <option
                                    key={department.id}
                                    value={department.id}
                                >
                                    {department.department_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('user-data-item')}>
                        <h5 className={cx('input-title')}>Chủ nhiệm lớp</h5>
                        <select value={newclass.head_teacher} className={cx('input-item')} name="head_teacher" readOnly={!editable} onChange={(e) => e.target.value !== "" && 
                            setNewClass((prev) => {
                                return {
                                    ...prev,
                                    [e.target.name]: e.target.value,
                                };
                            })}>
                            <option value="">Chọn giảng viên</option>
                            {teacherList.map((teacher) => (
                                <option
                                    key={teacher.id}
                                    value={teacher.id}
                                >
                                    {teacher.full_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('user-data-item', 'full-width')}>
                        <h5 className={cx('input-title')}>Sĩ số lớp</h5>
                        <input
                            className={cx('input-item')}
                            type="text"
                            name="students"
                            placeholder="100"
                            readOnly={!editable}
                            value={newclass.students}
                            onChange={(e) =>
                                setNewClass((prev) => {
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
            <button className={cx('save-btn')} onClick={() => {handleSave()}}>Lưu</button>
        </div>
    );
};

export default NewClass;
