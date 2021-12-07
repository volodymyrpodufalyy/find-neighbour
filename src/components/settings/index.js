import React, {useEffect, useState} from "react";
import s from "./settings.module.scss"
import imge from "../../assets/img/account-avatar-profile-human-man-user-30448.png";
import {Form, Radio, Row, Col, Image, Upload, Button, Checkbox, Space, Dropdown, Menu, Input} from 'antd';
import {Link} from "react-router-dom";
import {SearchLocationInput} from 'components';

export let refFromSettingsInfo = React.createRef();

const SettingsInfo = (props) => {


    const {moreAbout, age, phoneNumber, hasBadHabits, isMarried, hasJob, isStudent, hasPets, address, user} = props.data

    const [userAddress, setUserAddress] = useState(address);
    const [AboutUser, setAboutUser] = useState(moreAbout);
    const [changeAddress, setChangeAddress] = useState(true)
    const [Student, setStudent] = useState(isStudent)
    const [Job, setJob] = useState(hasJob)
    const [Pets, setPets] = useState(hasPets)
    const [Married, setMarried] = useState(isMarried)
    const [BadHabits, setBadHabits] = useState(hasBadHabits)
    const [Number, setNumber] = useState(phoneNumber)
    const [Email, setEmail] = useState(user.email)

    useEffect(() => {
        setUserAddress(address)
        setAboutUser(moreAbout)
        setStudent(isStudent)
        setJob(hasJob)
        setPets(hasPets)
        setMarried(isMarried)
        setBadHabits(hasBadHabits)
        setNumber(phoneNumber)
        setEmail(user.email)

    }, [address, user.email, moreAbout, isStudent, hasJob, hasPets, isMarried, hasBadHabits, phoneNumber])


    const callbackAddress = (childAddress) => {
        console.log(childAddress)
        setUserAddress(childAddress);
    }

    const onChangeAddress = () => {
        if (changeAddress) {
            setChangeAddress(false)
        } else {
            setChangeAddress(true)
            props.updateAddress(userAddress)
        }
    }
    const confirmChanges = ()=>{
        console.log(Pets,BadHabits,Student,Job,Married,AboutUser)
        props.saveChanges(Pets,BadHabits,Student,Job,Married,AboutUser)
    }

    let fullname = user.fullname.replace(/(^\s+)|(\s+$)/g, '').split(' ')
    let lastName = fullname[1] ? fullname[1] : ''

    return (
        <div className={s.container}>
            <div className={s.settings_div}>
                <Form className={s.form}>
                    <Form.Item>
                        <div className={s.img}>
                            <Image src={imge} width={150}/>
                            <Upload className={s.uploadBtn}>
                                <Button>
                                    Click to Upload
                                </Button>
                            </Upload>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Input.Group>
                            <Row gutter={50}>
                                <Col>
                                    <div className='checkbox'><p>Ім'я:</p></div>
                                    <Input value={fullname[0]} disabled={true}/>
                                </Col>
                                <Col>
                                    <div className='checkbox'><p>Прізвище:</p></div>

                                    <Input value={lastName} disabled={true}/>
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <div className='checkbox'><p>Розкажіть про себе:</p></div>

                        <Input.TextArea value={AboutUser}
                                        rows={3}
                                        className={s.aboutUser}
                                        maxLength={140}
                                        onChange={event => {
                                            setAboutUser(event.target.value)
                                        }}/>
                    </Form.Item>

                    <Form.Item>
                        <div className="checkbox">
                            <p>Місто:</p>
                            {changeAddress ? <Input value={userAddress}/> :
                                <SearchLocationInput
                                    onChange={callbackAddress}
                                   />}
                            <Button
                                className={s.save}
                                onClick={onChangeAddress}>{changeAddress ? "Change" : "Save"}
                            </Button>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        {/*<div className="birthdate">*/}
                        {/*    <p>Дата народження:</p>*/}
                        {/*</div>*/}

                    </Form.Item>

                    <Form.Item>

                        <div className='checkbox'><p>Рід зайнятості:</p></div>
                        <Radio.Group onChange={e => setStudent(e.target.value)}
                                     value={Student}
                        >
                            <Row gutter={17}>
                                <Col>
                                    <Radio value={true}>Студент</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>Закінчив університет/коледж</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Radio.Group onChange={e => setJob(e.target.value)} value={Job}>
                            <Row gutter={10}>
                                <Col>
                                    <Radio value={true}>Працюю</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>Не працюю</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <div className='checkbox'><p>Тваринки:</p></div>
                        <Radio.Group value={Pets} onChange={e => setPets(e.target.value)}>
                            <Row gutter={55}>
                                <Col>
                                    <Radio value={true}>Люблю</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>Не Люблю</Radio>
                                </Col>
                                <Col>
                                    <Radio value="">Без різниці</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className="checkbox">
                            <p>Cтатус</p>
                        </div>
                        <Radio.Group value={Married} onChange={e => setMarried(e.target.value)}>
                            <Radio value={true}>В стосунках</Radio>
                            <Radio value={false}>Не в стосунках</Radio>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Погані звички:</p></div>
                        <Radio.Group value={BadHabits} onChange={e => setBadHabits(e.target.value)}>
                            <Row gutter={45}>
                                <Col>
                                    <Radio value={true}>Присутні</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>Немає</Radio>
                                </Col>
                                <Col>
                                    <Radio value="">Не хочу відповідати</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Номер телефону:</p></div>
                        <Input disabled={true} value={Number}/>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Пошта:</p></div>
                        <Input disabled={true} value={Email}/>

                    </Form.Item>
                </Form>
                <Form.Item>
                    <Button className={s.save} onClick={confirmChanges}>
                        <Link>Зберегти</Link>
                    </Button>
                </Form.Item>
            </div>
        </div>

    )
}
export default SettingsInfo


