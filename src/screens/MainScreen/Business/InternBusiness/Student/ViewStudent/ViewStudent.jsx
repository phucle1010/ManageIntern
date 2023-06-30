import React, {useState} from 'react';
import classNames from 'classnames/bind';
import styles from './ViewStudent.module.scss';
import { Close } from '@mui/icons-material';
import axios from 'axios';

const cx = classNames.bind(styles);

const ViewStudent = ({ student, setChosedStudent }) => {

    const [docx, setDocx] = useState(student?.appreciation_file);
    const [startDate, setStartDate] = useState((new Date(student?.start_date)  || new Date()).toISOString().slice(0, 10));

    const updateStudent = () => {
        const token = JSON.parse(localStorage.getItem('user_token'));
        axios
            .put(`/business/interns/${student.studentId}`, {appreciation_file :docx, key: student.key, start_date: startDate}, {headers: {'authorization': token}})
            .then((res) => alert('Cập nhật thành công'))
            .catch((err) => console.log(err));
    }
  
    const handleDocxFileChange = async (event) => {
        const file = event.target.files[0];
        let base64 = await convertBase64(file);
        base64 = base64.replace(/^data:.*;base64,/, '');

        console.log(base64);

        if (typeof base64 !== 'string') {
            alert('Dữ liệu không hợp lệ: không phải là một chuỗi');
            return;
        }
        if (base64.length === 0) {
            alert('Dữ liệu không hợp lệ: chuỗi rỗng');
            return;
        }
        if (!base64.match(/^[A-Za-z0-9+/=]*$/)) {
            alert('Dữ liệu không hợp lệ: chuỗi chứa ký tự không hợp lệ');
            return;
        }
        setDocx(base64);
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleStartDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const formattedDate = selectedDate.toISOString().slice(0, 10);
        setStartDate(formattedDate);
    };
    return (
        <div className={cx('wrapper')}>
            <Close className={cx('close-main-btn')} onClick={() => setChosedStudent({})} />
            <h3 className={cx('main-heading')}>Thông tin sinh viên</h3>
            <div className={cx('profile')}>
                <div className={cx('profile-options')}>
                    <div className={cx('profile-avt')}>
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZaC8D-jIIEjybXk20m1WRizMVjShsdMYPXw&usqp=CAU"
                            alt=""
                        />
                    </div>
                    <h3 className={cx('job-position')}>{student.job_name}</h3>
                    <h5 className={cx('name')}>{student.full_name}</h5>
                </div>
                <div className={cx('profile-detail')}>
                    <div className={cx('user-form')}>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Đại học / Cao đẳng</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="university"
                                placeholder="Tên trường"
                                readOnly={true}
                                value={student.school_name}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Số điện thoại</h5>
                            <input
                                className={cx('input-item')}
                                type="phone"
                                name="email"
                                placeholder="0368xxx"
                                readOnly={true}
                                value={student.phone}
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
                                value={student.email}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Ngày vào làm</h5>
                            <input
                                className={cx('input-item')}
                                type="date"
                                name="entryDate"
                                // placeholder="Thành phố Hồ Chí Minh"
                                value={startDate}
                                onChange={handleStartDateChange}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Địa chỉ</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                name="address"
                                placeholder="Thành phố Hồ Chí Minh"
                                readOnly={true}
                                value={student.address}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>Trạng thái thực tập</h5>
                            <select
                                className={cx('input-item')}
                                name="major"
                                value={student.internStatus === 'interning' ? 'Đang thực tập' : 'Đã thực tập'}
                            >
                                <option>Chọn</option>
                                <option>Đang thực tập</option>
                                <option>Đã thực tập</option>
                            </select>
                        </div>
                        <div className={cx('user-data-item')}>
                            <h5 className={cx('input-title')}>File đánh giá</h5>
                            <input
                                className={cx('input-item')}
                                type="text"
                                placeholder="File đính kèm thông tin giới thiệu thực tập"
                                value={docx}
                                readOnly={true}
                            />
                        </div>
                        <div className={cx('user-data-item')}>
                            <label htmlFor={cx('gif-input')} className={cx('gif-label')}>
                                <span className={cx('gif-btn')}>Đính kèm</span>
                            </label>
                            <input type="file" id={cx('gif-input')}  accept=".docx" onChange={(e) => handleDocxFileChange(e)} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('option-btn')}>
                <button className={cx('save-btn')} onClick={() => updateStudent()}>Lưu thay đổi</button>
            </div>
        </div>
    );
};

export default ViewStudent;
