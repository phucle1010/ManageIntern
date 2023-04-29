/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const cx = classNames.bind(styles);

const ADMIN = 1;
const TEACHER = 2;
const STUDENT = 3;
const BUSINESS = 4;

const Login = ({ setRole, setSuccessfulLogin }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ email: '', pass: '' });
    const [error, setError] = useState(false);
    const [isEmptyFields, setIsEmptyFields] = useState(false);
    const [success, setSuccess] = useState(false);
    const [showPass, setShowPass] = useState(false);

    const passInputElement = useRef();

    useEffect(() => {
        if (!showPass) {
            passInputElement.current.type = 'password';
        } else {
            passInputElement.current.type = 'text';
        }
    }, [showPass]);

    const handleLogin = () => {
        if (user.email === '' || user.pass === '') {
            setIsEmptyFields(true);
        }
        if (user.email === 'admin' && user.pass === '123456') {
            authenAccount(ADMIN);
            return;
        }
        if (user.email === 'teacher' && user.pass === '123456') {
            authenAccount(TEACHER);
            return;
        }
        if (user.email === 'student' && user.pass === '123456') {
            authenAccount(STUDENT);
            return;
        }
        if (user.email === 'business' && user.pass === '123456') {
            authenAccount(BUSINESS);
            return;
        }
        setError(true);
    };

    const authenAccount = (role) => {
        switch (role) {
            case ADMIN:
                setRole(ADMIN);
                setStateSuccessfulLogin();
                break;
            case TEACHER:
                setRole(TEACHER);
                setStateSuccessfulLogin();
                break;
            case STUDENT:
                setRole(STUDENT);
                setStateSuccessfulLogin();
                break;
            case BUSINESS:
                setRole(BUSINESS);
                setStateSuccessfulLogin();
                break;
            default:
                break;
        }
    };

    const setStateSuccessfulLogin = () => {
        setSuccess(true);
        setSuccessfulLogin(true);
        setTimeout(() => navigate('/'), 2000);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('login-poster')}>
                <img
                    src="https://img.freepik.com/premium-vector/internship-flat-style-illustration-design_538610-608.jpg?w=2000"
                    alt=""
                />
                <h2 className={cx('login-poster-heading')}>QUẢN LÝ THỰC TẬP</h2>
            </div>
            <div className={cx('login-form')}>
                <div className={cx('login-form-detail')}>
                    <h2 className={cx('login-heading')}>Đăng nhập tài khoản</h2>
                    <i className={cx('login-note')}>
                        Vui lòng nhập thông tin đầy đủ để truy cập ứng dụng <span style={{ color: '#e34343' }}>*</span>
                    </i>
                    <div className={cx('input-item')}>
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            className={cx(`${error === true && 'notice-error'}`)}
                            value={user.email}
                            type="text"
                            placeholder="abc@gmail.com"
                            name="email"
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    [e.target.name]: e.target.value,
                                })
                            }
                            onFocus={() => {
                                setError(false);
                                setIsEmptyFields(false);
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        />
                    </div>
                    <div className={cx('input-item')}>
                        <label htmlFor="password">Mật khẩu</label>
                        <div className={cx('password-field')}>
                            <input
                                ref={passInputElement}
                                id="password"
                                className={cx(`${error === true && 'notice-error'}`)}
                                value={user.pass}
                                type="password"
                                placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                                name="pass"
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                                onFocus={() => {
                                    setError(false);
                                    setIsEmptyFields(false);
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                            />
                            {showPass === true ? (
                                <Visibility className={cx('show-pass')} onClick={() => setShowPass(false)} />
                            ) : (
                                <VisibilityOff className={cx('show-pass')} onClick={() => setShowPass(true)} />
                            )}
                        </div>
                    </div>
                </div>
                <div className={cx('options')}>
                    <div className={cx('remember-me')}>
                        <input id="remember" type="checkbox" value={`Nhớ tài khoản`} />
                        <label htmlFor="remember">Nhớ tài khoản</label>
                    </div>
                    <span className={cx('forgetpass')} onClick={() => navigate('/reset/password')}>
                        Quên mật khẩu?
                    </span>
                </div>
                {error === true && <div className={cx('notice')}>Vui lòng kiểm tra lại thông tin đăng nhập</div>}
                {isEmptyFields === true && <div className={cx('notice')}>Vui lòng điền đầy đủ thông tin đăng nhập</div>}
                {success === true && <div className={cx('notice-success')}>Đăng nhập thành công</div>}
                <button className={cx('btn-submit')} onClick={handleLogin}>
                    Đăng nhập
                </button>
            </div>
        </div>
    );
};

export default Login;
