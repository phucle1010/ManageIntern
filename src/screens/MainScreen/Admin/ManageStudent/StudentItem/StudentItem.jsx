import React from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import styles from './StudentItem.module.scss';
import { Avatar } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';

const cx = classNames.bind(styles);

const StudentItem = ({ student, setChosedStudent, setEditable, setShowNewStudent }) => {
    const handleDelete = () => {
        axios
            .post('/student/delete', { user_id: student.user_id, username: student.email })
            .then((res) => {
                alert(res.data.responseData);
                window.location.reload();
            })
            .catch((err) => console.log(err));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('detail-item')}>
                <div className={cx('data-item')}>
                    <Avatar src={student.image} />
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{student.student_id}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{student.full_name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span className={cx('title-heading')}>{student.class_name}</span>
                </div>
                <div className={cx('data-item')}>
                    <span
                        className={cx('title-heading', {
                            'graduted-status': student.current_status.data[0] === 0,
                            'studying-status': student.current_status.data[0] === 1,
                            //'stop-status': student.status === 'Nghỉ học',
                        })}
                    >
                        {student.current_status ? 'Đang học' : 'Tốt nghiệp'}
                    </span>
                </div>
            </div>
            <div className={cx('options')}>
                <div className={cx('option-item')}>
                    <Visibility
                        className={cx('view-icon')}
                        onClick={() => {
                            setChosedStudent(student);
                            setEditable(false);
                            setShowNewStudent(true);
                        }}
                    />
                </div>
                <div className={cx('option-item')}>
                    <Edit
                        className={cx('edit-icon')}
                        onClick={() => {
                            setChosedStudent(student);
                            setEditable(true);
                            setShowNewStudent(true);
                        }}
                    />
                </div>
                <div className={cx('option-item')}>
                    <Delete className={cx('delete-icon')} onClick={handleDelete} />
                </div>
            </div>
            {/* {viewStudent && <NewStudent close={setViewStudent} editable={false} studentinfo={student}/>}
            {editStudent && <NewStudent close={setEditStudent} editable={true} studentinfo={student}/>} */}
        </div>
    );
};

export default StudentItem;
