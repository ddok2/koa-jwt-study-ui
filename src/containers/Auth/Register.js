import React, { Component } from 'react';
import { isEmail, isLength, isAlphanumeric } from 'validator';
import {
    AuthContent,
    InputWithLabel,
    AuthButton,
    RightAlignedLink,
    AuthError,
} from 'components/Auth';

class Register extends Component {

    render() {
        const { error } = this.props;
        const { email, username, password, passwordConfirm } = this.props.form.toJS();
        const { handleChange } = this;

        return (
            <AuthContent title="회원가입">
                <InputWithLabel
                    label="비밀번호 확인"
                    name="passwordConfirm"
                    placeholder="비밀번호 확인"
                    type="password"
                    value={passwordConfirm}
                    onChange={handleChange}
                />
                {
                    error && <AuthError>{error}</AuthError>
                }
                <AuthButton onClick={handleLocalRegister}>회원가입</AuthButton>
                <RightAlignedLink to="/auth/login">로그인</RightAlignedLink>
            </AuthContent>
        );
    }

    componentWillUnmount() {
        const { AuthActions } = this.props;
        AuthActions.initializeForm('register');
    }

    handleLocalRegister = async () => {
        const { form, AuthActions, error, history } = this.props;
        const { email, username, password, passwordConfirm } = form.toJS();

        const { validate } = this;

        if (error) return;
        if (!validate['email'](email)
            || !validate['username'](username)
            || !validate['password'](password)
            || !validate['passwordConfirm'](passwordConfirm)) {
            return;
        }

        try {
            await AuthActions.localRegister({
                email, username, password,
            });
            const loggedInfo = this.props.result.toJS();
            console.log(loggedInfo);
            history.push('/');
        } catch (e) {
            if (e.response.status === 409) {
                const { key } = e.response.data;
                const message = key === 'email' ?
                    '이미 존재하는 이메일입니다.' :
                    '이미 존재하는 아이디입니다.';
                return this.setError(message);
            }
            this.setError('알 수 없는 에러가 발생했습니다.');
        }
    };

    setError = (message) => {
        const { AuthActions } = this.props;
        AuthActions.setError({
            form: 'register',
            message,
        });
    };

    checkEmailExists = async (email) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkEmailExists(email);
            if (this.props.exists.get('email')) {
                this.setError('이미 존재하는 이메일입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    checkUsernameExists = async (username) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUsernameExists(username);
            if (this.props.exists.get('username')) {
                this.setError('이미 존재하는 아이디입니다.');
            } else {
                this.setError(null);
            }
        } catch (e) {
            console.log(e);
        }
    };

    validate = {
        email: (value) => {
            if (!isEmail(value)) {
                this.setError('잘못된 이메일 형식 입니다.');
                return false;
            }
            return true;
        },
        username: (value) => {
            if (!isAlphanumeric(value) ||
                !isLength(value, { min: 4, max: 15 })) {
                this.setError('아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.');
                return false;
            }
            return true;
        },
        password: (value) => {
            if (!isLength(value, { min: 6 })) {
                this.setError('비밀번호를 6자 이상 입력하세요.');
                return false;
            }
            this.setError(null);
            return true;
        },
        passwordConfirm: (value) => {
            if (this.props.form.get('password') !== value) {
                this.setError('비밀번호확인이 일치하지 않습니다.');
                return false;
            }
            this.setError(null);
            return true;
        },
    };

    handleChange = (e) => {
        const { AuthActions } = this.props;
        const { name, value } = e.target;

        AuthActions.changeInput({
            name,
            value,
            form: 'register',
        });

        const validation = this.validate[name](value);
        if (name.indexOf('password') > -1 || !validation) return;

        const check = name === 'email' ?
            this.checkEmailExists :
            this.checkUsernameExists;
        check(value);

    };
}

export default Register;
