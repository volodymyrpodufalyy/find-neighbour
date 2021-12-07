import React, {useEffect, useState} from "react";
import { Form, Button, Checkbox, Space, Dropdown, Menu, Input,Radio,Col,Row } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Block, SearchLocationInput } from "../../../components";
import { Link } from "react-router-dom";
import "./AddInfoForm.scss";
import { validateField, convertDate, getAge } from "../../../utils/helpers";

const AddInfoForm = (props) => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
    } = props;


    const [userAddress, setUserAddress] = useState("");
    const [day, setDay] = useState("День");
    const [month, setMonth] = useState("Місяць");
    const [monthKey, setMonthKey] = useState("");
    const [year, setYear] = useState("Рік");
    const [sex, setSex] = useState()
    const [student, setStudent] = useState()
    const [job, setJob] = useState()
    const [married, setMarried] = useState()
    const [badHabits, setBadHabits] = useState()
    const [hasPets, setPets] = useState()

    const dayRange = [...Array(33).keys()].slice(1, 32);
    const monthRange = [
        "Січень",
        "Лютий",
        "Березень",
        "Квітень",
        "Травень",
        "Червень",
        "Липень",
        "Серпень",
        "Вересень",
        "Жовтень",
        "Листопад",
        "Грудень",
    ];
    const yearRange = [...Array(2020).keys()].slice(1970, 2020);

    const selectedDate = convertDate(day, monthKey, year);
    const onChangeAddress = (value) => {
        setUserAddress(value);
    };


    values.address = userAddress;
    values.age = getAge(selectedDate);

    const DropdownMenu = (dateType) => {
        if (dateType === "day") {
            return (
                <Menu className="dropdown_menu">
                    {dayRange.map((num) => {
                        return (
                            <Menu.Item key={num} onClick={(e) => setDay(e.key)}>
                                {num}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            );
        } else if (dateType === "month") {
            return (
                <Menu className="dropdown_menu">
                    {monthRange.map((month, index) => {
                        return (
                            <Menu.Item
                                key={index}
                                onClick={(e) => {
                                    setMonth(e.domEvent.target.innerText);
                                    setMonthKey(e.key);
                                }}
                            >
                                {month}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            );
        } else if (dateType === "year") {
            return (
                <Menu className="dropdown_menu">
                    {yearRange.map((year) => {
                        return (
                            <Menu.Item key={year} onClick={(e) => setYear(e.key)}>
                                {year}
                            </Menu.Item>
                        );
                    })}
                </Menu>
            );
        }
    };

    console.log(isSubmitting)

    // console.log(values.kindOfActivity,
    //     values.sex ,values.haveJobOrJobless,
    //     values.maritalStatus, values.badHabits, values.pets)
    //

    return (
        <div className='add_info_main'>
            <div className="auth__top">
                <h2>Роскажіть про себе більше</h2>
                <p>Щоб ми підібрали для вас найкращі варіанти</p>
            </div>
            <Block className="addinfo-block">
                <Form
                    className="login-form"
                    initialValues={{ remember: true }}
                    onSubmit={handleSubmit}
                >
                    <Form.Item
                        validateStatus={validateField("age", touched, errors)}
                        help={!touched.age ? "" : errors.age}
                        hasFeedback
                    >
                        <div className="birthdate" >
                            <p>Дата народження:</p>
                        </div>
                        <Space direction="vertical">
                            <Space wrap >

                                <Dropdown
                                    className="dropdown"
                                    overlay={DropdownMenu("day")}
                                    placement="bottomLeft"
                                    trigger={["click"]}
                                >

                                    <Button size="large" >
                                        {" "}
                                        {day} <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Dropdown
                                    className="dropdown"
                                    overlay={DropdownMenu("month")}
                                    placement="bottomCenter"
                                    trigger={["click"]}
                                >
                                    <Button size="large">
                                        {" "}
                                        {month} <DownOutlined />
                                    </Button>
                                </Dropdown>
                                <Dropdown
                                    className="dropdown"
                                    overlay={DropdownMenu("year")}
                                    placement="bottomRight"
                                    trigger={["click"]}
                                >
                                    <Button size="large">
                                        {" "}
                                        {year} <DownOutlined />
                                    </Button>
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
                            <p className='text_question'>Стать:</p>

                            <Radio.Group className="radio" onChange={(e) =>{
                                setSex(e.target.value)
                                values.sex = e.target.value
                            }} value={sex}>
                                <Radio value="Male">Чоловік</Radio>
                                <Radio value="Female">Жінка</Radio>
                                {/*<Radio value="">Інше</Radio>*/}
                            </Radio.Group>

                        </div>
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("phoneNumber", touched, errors)}
                        help={!touched.phoneNumber ? "" : errors.phoneNumber}
                        rules={[{ required: true, message: "Номер телефону" }]}
                        hasFeedback
                    >
                        <div className="birthdate">
                            <p>Номер телефону:</p>
                        </div>
                        <Input
                            id="phoneNumber"
                            size="large"
                            addonBefore="+380"
                            style={{ width: "100%" }}
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("address", touched, errors)}
                        help={!touched.address ? "" : errors.address}
                        hasFeedback
                    >
                        <div className="birthdate">
                            <p>Місто:</p>
                        </div>
                        <SearchLocationInput onChange={onChangeAddress} />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("kindOfActivity", touched, errors)}
                        help={!touched.kindOfActivity ? "" : errors.kindOfActivity}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Рід зайнятості:</p>
                        </div>
                        <Radio.Group className="radio"  onChange={(e) =>{
                            setStudent(e.target.value)
                            values.kindOfActivity = e.target.value
                        }} value={student}>
                            <Radio value={true}>Студент</Radio>
                            <Radio value={false}>Закінчив</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("haveJobOrJobless", touched, errors)}
                        help={!touched.haveJobOrJobless ? "" : errors.haveJobOrJobless}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Ви працюєте?</p>
                        </div>
                        <Radio.Group className="radio"  onChange={(e) =>{
                            setJob(e.target.value)
                            values.haveJobOrJobless = e.target.value
                        }} value={job}>
                            <Radio value={true}>Так</Radio>
                            <Radio  value={false}>Ні</Radio>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("maritalStatus", touched, errors)}
                        help={!touched.maritalStatus ? "" : errors.maritalStatus}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Cтатус</p>
                        </div>

                        <Radio.Group className="radio"  onChange={(e) =>{
                            setMarried(e.target.value)
                            values.maritalStatus = e.target.value
                        }} value={married}>

                            <Radio value={true}>В стосунках</Radio>

                            <Radio value={false}>Не в стосунках</Radio>

                        </Radio.Group>

                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("badHabits", touched, errors)}
                        help={!touched.badHabits ? "" : errors.badHabits}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Шкідливі звички?</p>
                        </div>

                        <Radio.Group onChange={(e) =>{
                            setBadHabits(e.target.value)
                            values.badHabits = e.target.value
                        }} value={badHabits}>
                            <Radio value={true}>Так, є</Radio>
                            <Radio value={false}>Ні, немає</Radio>
                            <Radio value={null}>Не хочу відповідати</Radio>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("pets", touched, errors)}
                        help={!touched.pets ? "" : errors.pets}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Домашні тварини?</p>
                        </div>
                        <Radio.Group onChange={(e) =>{
                            setPets(e.target.value)
                            values.pets = e.target.value

                        }} value={hasPets}>
                            <Radio value={true}>Так, є</Radio>
                            <Radio value={false}>Ні, немає</Radio>
                            <Radio value={null}>Не хочу відповідати</Radio>
                        </Radio.Group>


                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("moreAboutUser", touched, errors)}
                        help={!touched.moreAboutUser ? "" : errors.moreAboutUser}
                        hasFeedback
                    >
                        <div className="birthdate">
                            <p>Особисті вподобання(*необов'язково):</p>
                        </div>
                        <Input
                            value={values.moreAboutUser}
                            onChange={handleChange("moreAboutUser")}
                            onBlur={handleBlur("moreAboutUser")}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item>
                        {isSubmitting && !isValid && <span>Помилка</span>}
                        <Button
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Далі
                        </Button>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    );
};

export default AddInfoForm;
