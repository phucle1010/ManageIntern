/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './Login.module.scss';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: '', pass: '' });
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
        axios
            .post('/user/auth', user)
            .then((res) => {
                if (res.data.statusCode === 400) {
                    setError(true);
                } else {
                    const token = res.data.responseData;
                    storeToken(token);
                }
            })
            .catch((err) => console.log({ err: err }));
    };

    const storeToken = (token) => {
        axios
            .post('/user/login/token', {
                token,
                username: user.username,
            })
            .then((res) => {
                if (res.data.statusCode === 200) {
                    localStorage.setItem('user_token', JSON.stringify(token));
                    setStateSuccessfulLogin();
                }
            })
            .catch((err) => console.log({ err: err }));
    };

    const setStateSuccessfulLogin = () => {
        setSuccess(true);
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
                        <label htmlFor="username">Tên đăng nhập</label>
                        <input
                            id="username"
                            className={cx(`${error === true && 'notice-error'}`)}
                            value={user.username}
                            type="text"
                            name="username"
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
                                // placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
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
