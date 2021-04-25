import React from 'react';
import { Form, Button } from 'antd';
import { UserOutlined, LockOutlined, ExclamationCircleTwoTone, MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Block, FormField } from 'components';

const success = false;

const RegisterForm  = props =>  {
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
      <h2>Реєстрація</h2>
      <p>Для входу зареєструйтесь</p>
    </div>
    <Block>
      {!success ? (
      <Form onSubmit={handleSubmit} name="normal_login" 
      className="login-form" initialValues={{ remember: true, }} 
      >

      <FormField name="email" handleChange={handleChange} handleBlur={handleBlur} placeholder="E-Mail"
       touched={touched} errors={errors} values={values} icon={<MailOutlined  className="site-form-item-icon" />} />    
       
      <FormField name="fullname" handleChange={handleChange} handleBlur={handleBlur} placeholder="Your name"
        touched={touched} errors={errors} values={values} icon={<UserOutlined className="site-form-item-icon" />} />

      <FormField name="password" handleChange={handleChange} handleBlur={handleBlur} placeholder="Password" type="password"
        touched={touched} errors={errors} values={values} icon={<LockOutlined className="site-form-item-icon" />} />

          <Form.Item>
            {isSubmitting && !isValid && <span>Ошибка!</span>}
            <Button onClick={handleSubmit} size="large" type="primary" htmlType="submit" className="login-form-button">
              Зареєструватись
            </Button>
          </Form.Item>
          <Button className="auth__register-link">
            <Link to="/signin">
            Увійти в акаунт
            </Link>
          </Button>
        </Form>
      ) : (
        <div className="auth__success-block">
          <div>
          <Form.Item><ExclamationCircleTwoTone style={{ fontSize: '40px' }} /></Form.Item>
          </div>
          <h2>Підтвердіть свій акаунт</h2>
          <p>
            На Вашу пошту відправлено лист з посиланням на підтвердження акаунта
          </p>
        </div>
      )}
    </Block>
     
        </div>
    );
};

export default RegisterForm;