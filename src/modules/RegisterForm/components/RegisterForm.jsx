import React from 'react';
import {Form, Button} from 'antd';
import {UserOutlined, LockOutlined, ExclamationCircleTwoTone, MailOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {Block, FormField} from 'components';
import s from "./register.module.scss";

const success = false;

const RegisterForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isValid,
        isSubmitting
    } = props;

    return (
        <div>
            <div className="auth__top">
                <h2>Registration</h2>
                <p>Register For Enter</p>
            </div>
            <Block>
                {!success ? (
                    <Form onSubmit={handleSubmit} name="normal_login"
                          className="login-form" initialValues={{remember: true,}}
                    >

                            <FormField name="email" handleChange={handleChange} handleBlur={handleBlur}
                                       placeholder="E-Mail"
                                       touched={touched} errors={errors} values={values}
                                       icon={<MailOutlined className="site-form-item-icon"/>}/>

                        <label className={s.form_item}>
                            <FormField name="fullname" handleChange={handleChange} handleBlur={handleBlur}
                                       placeholder="Full name"
                                       touched={touched} errors={errors} values={values}
                                       icon={<UserOutlined className="site-form-item-icon"/>}/>
                            <div className={s.hint}>
                                Enter your first name and last name
                            </div>

                        </label>
                        <label className={s.form_item}>
                            <FormField name="password" handleChange={handleChange} handleBlur={handleBlur}
                                       placeholder="Password" type="password"
                                       touched={touched} errors={errors} values={values}
                                       icon={<LockOutlined className="site-form-item-icon"/>}/>
                            <div className={s.hint}>
                                Minimum eight characters, Uppercase letter, Special character:
                                A-Za-z @$!%*#?&"
                            </div>

                        </label>
                        <Form.Item>
                            {isSubmitting && !isValid && <span>Error!</span>}
                            <Button onClick={handleSubmit} size="large" type="primary" htmlType="submit"
                                    className="login-form-button">
                                Register
                            </Button>

                            <Button className="auth__register-link">
                                <Link to="/signin">
                                    Enter Account
                                </Link>
                            </Button>
                        </Form.Item>
                    </Form>
                ) : (
                    <div className="auth__success-block">
                        <div>
                            <Form.Item><ExclamationCircleTwoTone style={{fontSize: '40px'}}/></Form.Item>
                        </div>
                        <h2>Confirm your account</h2>
                        <p>
                            An email has been sent to your email with a link to confirm your account
                        </p>
                    </div>
                )}
            </Block>

        </div>
    );
};

export default RegisterForm;
