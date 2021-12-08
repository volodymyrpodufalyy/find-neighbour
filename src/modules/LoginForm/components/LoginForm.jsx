import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Block } from 'components';
import { validateField } from 'utils/helpers';

const LoginForm = props => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    isValid,
    status
  } = props;

    return (
        
        <div>
        <div className="auth__top">
         <h2>Enter Your Account</h2>
         <p>Please enter your account</p>
       </div>
       <Block>
     <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onSubmit={handleSubmit}
    >
     <Form.Item 
            validateStatus={validateField("email", touched, errors)}
            help={!touched.email ? "" : errors.email}
            hasFeedback
          >
            <Input
              id="email"
              prefix={<MailOutlined className="site-form-item-icon" />}
              size="large"
              placeholder="E-Mail"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
          <Form.Item
            validateStatus={validateField("password", touched, errors)}
            help={!touched.password ? "" : errors.password}
            hasFeedback
          >
            <Input
              id="password"
              prefix={<LockOutlined className="site-form-item-icon" />}
              size="large"
              type="password"
              placeholder="Пароль"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

      <Form.Item>
        {isSubmitting && !isValid && <span>Error</span>}
        <Button 
        disabled={isSubmitting}
        onClick={handleSubmit} size="large" type="primary" htmlType="submit" className="login-form-button">
          Enter Account
        </Button>
          <Button className="auth__register-link">
              <Link to="/signup">
                Register
              </Link>
          </Button>
      </Form.Item>
    </Form>
    </Block>
  </div>
  );
};

export default LoginForm;