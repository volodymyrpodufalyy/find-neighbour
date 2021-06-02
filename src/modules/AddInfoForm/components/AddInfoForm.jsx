import React, { useState } from 'react';
import { Form, Button, Checkbox, Space, Dropdown, Menu, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Block, SearchLocationInput } from 'components';
import { Link } from "react-router-dom";
import "./AddInfoForm.scss";
import { validateField, convertDate, getAge } from 'utils/helpers';

const AddInfoForm = props => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit, isSubmitting, isValid } = props;  

    const [userAdress, setUserAdress] = useState("");
    const [day, setDay] = useState("День");
    const [month, setMonth] = useState("Місяць");
    const [monthKey, setMonthKey] = useState("");
    const [year, setYear] = useState("Рік");
    
    const dayRange = [...Array(33).keys()].slice(1, 32);
    const monthRange = ["Січень", "Лютий", "Березень", "Квітень", "Травень", 
    "Червень", "Липень", "Серпень", "Вересень","Жовтень", "Листопад", "Грудень"];
    const yearRange = [...Array(2020).keys()].slice(1970,2020);

    const selectedDate = convertDate(day, monthKey, year);
    const callbackAdress = (childAdress) => {
      setUserAdress(childAdress);
    }

    values.adress = userAdress;
    values.age = getAge(selectedDate);

    const DropdownMenu = (dateType) => {
        if(dateType === "day"){
            return (
                <Menu className="dropdown-menu" >
                  {dayRange.map((num) => {return <Menu.Item key={num} onClick={e => setDay(e.key)}>{num}</Menu.Item>})}
              </Menu>
            );
        } else if(dateType === "month") {
            return (
              <Menu className="dropdown-menu" >
                {monthRange.map((month, index) => {return <Menu.Item key={index} onClick={e => {
                  setMonth(e.domEvent.target.innerText);
                  setMonthKey(e.key);
                }}>
                  {month}
                </Menu.Item>})}
              </Menu>
            );
        } else if(dateType === "year") {
            return (
              <Menu className="dropdown-menu" >
                {yearRange.map((year) => {return <Menu.Item key={year} onClick={e => setYear(e.key)}>{year}</Menu.Item>})}
              </Menu>
            );
        }
    };
     
    return (
        <div>
        <div className="auth__top">
         <h2>Роскажіть про себе більше</h2>
         <p>Щоб ми підібрали для вас найкращі варіанти</p>
       </div>
    <Block className="addinfo-block">
     <Form className="login-form" initialValues={{ remember: true, }} onSubmit={handleSubmit} >
     <Form.Item
      validateStatus={validateField("age", touched, errors)}
      help={!touched.age ? "" : errors.age}
      hasFeedback  
     >
       <div className="birthdate">
       <p>Дата народження:</p>
       </div>
          <Space direction="vertical">
            <Space wrap>
              <Dropdown  className="dropdown" overlay={DropdownMenu("day")} placement="bottomLeft" trigger={['click']}>
                <Button size="large"> {day} <DownOutlined/></Button>
              </Dropdown>
              <Dropdown className="dropdown" overlay={DropdownMenu("month")} placement="bottomCenter" trigger={['click']}>
                <Button size="large">  {month} <DownOutlined/></Button>
              </Dropdown>
              <Dropdown className="dropdown" overlay={DropdownMenu("year")} placement="bottomRight" trigger={['click']}>
                <Button size="large">  {year}  <DownOutlined/></Button>
              </Dropdown>
            </Space>
          </Space>
          </Form.Item>
        <Form.Item
            validateStatus={validateField("sex", touched, errors)}
            help={!touched.sex ? "" : errors.sex}            
            hasFeedback 
            >
            <div className="checkbox">
                <p>Стать:</p>              
              <Checkbox onChange={e => values.sex = e.target.checked} className="checkbox-item checkbox-item--male">Чоловік</Checkbox>
              <Checkbox onChange={e => values.sex = !e.target.checked} className="checkbox-item">Жінка</Checkbox>
              </div>
          </Form.Item>
          <Form.Item 
            validateStatus={validateField("phoneNumber", touched, errors)}
            help={!touched.phoneNumber ? "" : errors.phoneNumber}              
            rules={[ { required: true, message: 'Номер телефону', }, ]} 
            hasFeedback >
          <div className="birthdate">
            <p>Номер телефону:</p>
          </div>
            <Input
             id="phoneNumber"
             size="large"
             addonBefore="+380" 
             style={{ width: '100%' }}
             value={values.phoneNumber}
             onChange={handleChange}
             onBlur={handleBlur}
            />
         </Form.Item>
          <Form.Item
            validateStatus={validateField("adress", touched, errors)}
            help={!touched.adress ? "" : errors.adress}              
            hasFeedback 
            >
          <div className="birthdate">
            <p>Місто:</p>
          </div>
          <SearchLocationInput parentCallback={callbackAdress} onChange={() => null} />
         </Form.Item>
         <Form.Item
            validateStatus={validateField("kindOfActivity", touched, errors)}
            help={!touched.kindOfActivity ? "" : errors.kindOfActivity}               
            hasFeedback >
          <div className="checkbox">
            <p>Рід зайнятості:</p>
          </div>
          <Checkbox onChange={e => values.kindOfActivity = e.target.checked} className="checkbox-item">Студент</Checkbox>
          <Checkbox onChange={e => values.kindOfActivity = !e.target.checked}className="checkbox-item">Закінчив університет/коледж</Checkbox>
         </Form.Item>
         <Form.Item
            validateStatus={validateField("haveJobOrJobless", touched, errors)}
            help={!touched.haveJobOrJobless ? "" : errors.haveJobOrJobless}               
            hasFeedback >
          <div className="checkbox">
            <p>Ви працюєте?</p>
          </div>
          <Checkbox onChange={e => values.haveJobOrJobless = e.target.checked} className="checkbox-item checkbox-item--male">Так</Checkbox>
          <Checkbox onChange={e => values.haveJobOrJobless = !e.target.checked}  className="checkbox-item">Ні</Checkbox>
         </Form.Item>
         <Form.Item
            validateStatus={validateField("maritalStatus", touched, errors)}
            help={!touched.maritalStatus ? "" : errors.maritalStatus}         
            hasFeedback >
          <div className="checkbox">
            <p>Cтатус</p>
          </div>
          <Checkbox onChange={e => values.maritalStatus = e.target.checked}  className="checkbox-item">В стосунках</Checkbox>
          <Checkbox onChange={e => values.maritalStatus = !e.target.checked} className="checkbox-item">Не в стосунках</Checkbox>
         </Form.Item>
         <Form.Item 
            validateStatus={validateField("badHabits", touched, errors)}
            help={!touched.badHabits ? "" : errors.badHabits}         
            hasFeedback 
          >
          <div className="checkbox">
            <p>Шкідливі звички?</p>
          </div>
          <Checkbox onChange={e => values.badHabits = e.target.checked} className="checkbox-item checkbox-item--male">Так, є</Checkbox>
          <Checkbox onChange={e => values.badHabits = !e.target.checked} className="checkbox-item">Ні, немає</Checkbox>
         </Form.Item>
         <Form.Item
          validateStatus={validateField("pets", touched, errors)}
          help={!touched.pets ? "" : errors.pets}
          hasFeedback >
          <div className="checkbox">
            <p>Домашні тваринки?</p>
          </div>
          <Checkbox onChange={e => values.pets = e.target.checked} className="checkbox-item checkbox-item--male">Так, є</Checkbox>
          <Checkbox onChange={e => values.pets = !e.target.checked} className="checkbox-item">Ні, немає</Checkbox>
         </Form.Item>
         <Form.Item 
         validateStatus={validateField("moreAboutUser", touched, errors)}
         help={!touched.moreAboutUser ? "" : errors.moreAboutUser}
         hasFeedback >
          <div className="birthdate">
            <p>Особисті вподобання(*необов'язково):</p>
          </div>
            <Input 
            value={values.moreAboutUser}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{ width: '100%' }} />
         </Form.Item>
        <Form.Item>
        {isSubmitting && !isValid && <span>Помилка</span>}
        <Button 
        disabled={isSubmitting}
        onClick={handleSubmit} size="large" type="primary" htmlType="submit" className="login-form-button">
          <Link to="/signup/verify">Далі</Link>
        </Button>
      </Form.Item>
    </Form>
    </Block>
  </div>
  );
}       

export default AddInfoForm;
