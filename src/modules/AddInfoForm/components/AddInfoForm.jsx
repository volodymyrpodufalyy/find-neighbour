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
    const [day, setDay] = useState("Day");
    const [month, setMonth] = useState("Month");
    const [monthKey, setMonthKey] = useState("");
    const [year, setYear] = useState("Year");
    const [sex, setSex] = useState()
    const [student, setStudent] = useState()
    const [job, setJob] = useState()
    const [married, setMarried] = useState()
    const [badHabits, setBadHabits] = useState()
    const [hasPets, setPets] = useState()

    const dayRange = [...Array(33).keys()].slice(1, 32);
    const monthRange = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
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
                <h2>Tell us more about yourself</h2>
                <p>So that we can choose the best options for you</p>
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
                            <p>Date of birth:</p>
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
                                <Radio value="Male">Male</Radio>
                                <Radio value="Female">Female</Radio>
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
                            <p>Phone number:</p>
                        </div>
                        <Input
                            id="phoneNumber"
                            size="large"
                            addonBefore="+380"
                            style={{ width: "100%" }}
                            value={values.phoneNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            maxLength={9}
                        />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("address", touched, errors)}
                        help={!touched.address ? "" : errors.address}
                        hasFeedback
                    >
                        <div className="birthdate">
                            <p>City:</p>
                        </div>
                        <SearchLocationInput onChange={onChangeAddress} />
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("kindOfActivity", touched, errors)}
                        help={!touched.kindOfActivity ? "" : errors.kindOfActivity}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Kind of Activity:</p>
                        </div>
                        <Radio.Group className="radio"  onChange={(e) =>{
                            setStudent(e.target.value)
                            values.kindOfActivity = e.target.value
                        }} value={student}>
                            <Radio value={true}>Student</Radio>
                            <Radio value={false}>Graduated</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("haveJobOrJobless", touched, errors)}
                        help={!touched.haveJobOrJobless ? "" : errors.haveJobOrJobless}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Do you have job?</p>
                        </div>
                        <Radio.Group className="radio"  onChange={(e) =>{
                            setJob(e.target.value)
                            values.haveJobOrJobless = e.target.value
                        }} value={job}>
                            <Radio value={true}>Have job</Radio>
                            <Radio  value={false}>Unemployed</Radio>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("maritalStatus", touched, errors)}
                        help={!touched.maritalStatus ? "" : errors.maritalStatus}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Marital Status:</p>
                        </div>

                        <Radio.Group className="radio"  onChange={(e) =>{
                            setMarried(e.target.value)
                            values.maritalStatus = e.target.value
                        }} value={married}>

                            <Radio value={true}>In a relationship</Radio>

                            <Radio value={false}>Single</Radio>

                        </Radio.Group>

                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("badHabits", touched, errors)}
                        help={!touched.badHabits ? "" : errors.badHabits}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Bad Habits:</p>
                        </div>

                        <Radio.Group onChange={(e) =>{
                            setBadHabits(e.target.value)
                            values.badHabits = e.target.value
                        }} value={badHabits}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                            <Radio value={null}>I don't know</Radio>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("pets", touched, errors)}
                        help={!touched.pets ? "" : errors.pets}
                        hasFeedback
                    >
                        <div className="checkbox">
                            <p>Pets</p>
                        </div>
                        <Radio.Group onChange={(e) =>{
                            setPets(e.target.value)
                            values.pets = e.target.value

                        }} value={hasPets}>
                            <Radio value={true}>Yes</Radio>
                            <Radio value={false}>No</Radio>
                            <Radio value={null}>I don't know</Radio>
                        </Radio.Group>


                    </Form.Item>
                    <Form.Item
                        validateStatus={validateField("moreAboutUser", touched, errors)}
                        help={!touched.moreAboutUser ? "" : errors.moreAboutUser}
                        hasFeedback
                    >
                        <div className="birthdate">
                            <p>Tell something about yourself(*not necessarily):</p>
                        </div>
                        <Input
                            value={values.moreAboutUser}
                            onChange={handleChange("moreAboutUser")}
                            onBlur={handleBlur("moreAboutUser")}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                    <Form.Item>
                        {isSubmitting && !isValid && <span>Error</span>}
                        <Button
                            disabled={isSubmitting}
                            onClick={handleSubmit}
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Block>
        </div>
    );
};

export default AddInfoForm;
