import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './ResetPassword.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ResetPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [repass, setRepass] = useState('');
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPass, setErrorPass] = useState(false);
    const [isEmptyFields, setIsEmptyFields] = useState(false);
    const [exactEmail, setExactEmail] = useState(false);
    const [exactPass, setExactPass] = useState(false);
    const [errorCode, setErrorCode] = useState(false);
    const [exactCode, setExactCode] = useState(false);
    const [code, setCode] = useState('');

    const handleVerify = () => {
        const sendCode = randomResetCode()
        if (!exactEmail) {
            axios
                .post('/user/resetpassword/email', {email: email})
                .then((res) => {
                    console.log(email);
                    if(res.data.statusCode === 200){
                        setExactEmail(true);
                        console.log(randomResetCode());// ma xac thuc
                        /*axios
                            .post('/user/resetpassword/verifycode', {sendCode: sendCode, email: email})
                            .then((res) => alert(res.data.responseData))
                            .catch((err) => { console.log({err: err})});*/
                    }else{
                        alert(res.data.responseData);
                    }
                })
                .catch((err) => { console.log({err: err})});
        }else if(!exactCode){
            if(code === sendCode){
                setExactCode(true);
            }
        }else {
            if(pass != repass){
                alert('Mật khẩu xác nhận không đúng, vui lòng nhập lại');
            }else{
                axios
                    .post('/user/resetpassword', {pass: pass, email: email})
                    .then((res) => alert(res.data.responseData))
                    .catch((err) => { console.log({err: err})});   
            }
        }
    };

    const randomResetCode = () => {
        return Math.floor(Math.random() * 99999) + 10000;
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('reset-form')}>
                <img
                    className={cx('reset-back')}
                    src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37375.jpg"
                    alt=""
                    style={{ width: '20%' }}
                />
                <div className={cx('heading')}>
                    <h2 className={cx('reset-heading')}>Khôi phục tài khoản</h2>
                    <span className={cx('sub-reset-heading')}>
                        <i>{`${
                            exactEmail === true
                                ? 'Vui lòng cài đặt mật khẩu mới cho tài khoản'
                                : 'Vui lòng điền Email xác thực để khôi phục tài khoản'
                        }`}</i>
                    </span>
                </div>
                <div className={cx('inputs')} style={{ marginBottom: '20px' }}>
                    <input
                        className={cx(
                            'email',
                            `${errorEmail === true && 'notice-error-email'}`,
                            `${exactEmail === true && 'hide-email'}`,
                        )}
                        value={email}
                        type="text"
                        placeholder="abc@gmail.com"
                        name="user"
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => {
                            setErrorEmail(false);
                            setIsEmptyFields(false);
                        }}
                    />
                    <input
                        className={cx(
                            'email',
                            `${errorCode === true && 'notice-error-email'}`,
                            `${exactCode === true && 'hide-email'}`,
                        )}
                        value={code}
                        type="text"
                        placeholder="Verify code"
                        name="user"
                        onChange={(e) => setCode(e.target.value)}
                        onFocus={() => {
                            setErrorCode(false);
                            setIsEmptyFields(false);
                        }}
                    />
                    <div className={cx('input-item', 'pass', `${exactEmail === true && exactCode === true && 'show-reset-pass'}`)}>
                        <span>Mật khẩu mới</span>
                        <input
                            value={pass}
                            type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                            name="user"
                            onChange={(e) => setPass(e.target.value)}
                            onFocus={() => {
                                setErrorPass(false);
                                setIsEmptyFields(false);
                            }}
                        />
                    </div>

                    <div className={cx('input-item', 'pass', `${exactEmail === true && exactCode === true && 'show-reset-pass'}`)}>
                        <span>Xác nhận mật khẩu</span>
                        <input
                            value={repass}
                            type="password"
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;"
                            name="user"
                            onChange={(e) => setRepass(e.target.value)}
                            onFocus={() => {
                                setErrorPass(false);
                                setIsEmptyFields(false);
                            }}
                        />
                    </div>
                    {errorEmail === true && <div className={cx('notice')}>Vui lòng kiểm tra lại Email</div>}
                    {errorPass === true && <div className={cx('notice')}>Vui lòng kiểm tra lại mật khẩu</div>}
                    {errorCode === true && <div className={cx('notice')}>Vui lòng kiểm tra lại mã xác thực</div>}
                    {isEmptyFields === true && <div className={cx('notice')}>Vui lòng điền đầy đủ thông tin</div>}
                    {exactPass === true && <div className={cx('notice')}>Khôi phục tài khoản thành công</div>}
                </div>
                <div className={cx('options-btn')}>
                    <button className={cx('btn-submit')} onClick={handleVerify}>
                        Xác nhận
                    </button>
                    <button className={cx('btn-submit', 'return')} onClick={() => navigate('/login')}>
                        Quay về đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
