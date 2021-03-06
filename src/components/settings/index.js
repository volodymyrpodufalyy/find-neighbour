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
                                    <div className='checkbox'><p>????'??:</p></div>
                                    <Input value={fullname[0]} disabled={true}/>
                                </Col>
                                <Col>
                                    <div className='checkbox'><p>????????????????:</p></div>

                                    <Input value={lastName} disabled={true}/>
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <div className='checkbox'><p>?????????????????? ?????? ????????:</p></div>

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
                            <p>??????????:</p>
                            {changeAddress ? <Input value={userAddress}/> :
                                <SearchLocationInput
                                    parentCallback={callbackAddress}
                                    onChange={() => null}/>}
                            <Button
                                className={s.save}
                                onClick={onChangeAddress}>{changeAddress ? "Change" : "Save"}
                            </Button>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <div className="birthdate">
                            <p>???????? ????????????????????:</p>
                        </div>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>?????? ????????????????????:</p></div>
                        <Radio.Group onChange={e => setStudent(e.target.value)}
                                     value={Student}
                        >
                            <Row gutter={17}>
                                <Col>
                                    <Radio value={true}>??????????????</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>???????????????? ??????????????????????/????????????</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Radio.Group onChange={e => setJob(e.target.value)} value={Job}>
                            <Row gutter={10}>
                                <Col>
                                    <Radio value={true}>????????????</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>???? ????????????</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <div className='checkbox'><p>????????????????:</p></div>
                        <Radio.Group value={Pets} onChange={e => setPets(e.target.value)}>
                            <Row gutter={55}>
                                <Col>
                                    <Radio value={true}>??????????</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>???? ??????????</Radio>
                                </Col>
                                <Col>
                                    <Radio value="">?????? ??????????????</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className="checkbox">
                            <p>C??????????</p>
                        </div>
                        <Radio.Group value={Married} onChange={e => setMarried(e.target.value)}>
                            <Radio value={true}>?? ??????????????????</Radio>
                            <Radio value={false}>???? ?? ??????????????????</Radio>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>???????????? ????????????:</p></div>
                        <Radio.Group value={BadHabits} onChange={e => setBadHabits(e.target.value)}>
                            <Row gutter={45}>
                                <Col>
                                    <Radio value={true}>????????????????</Radio>
                                </Col>
                                <Col>
                                    <Radio value={false}>??????????</Radio>
                                </Col>
                                <Col>
                                    <Radio value="">???? ???????? ??????????????????????</Radio>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>?????????? ????????????????:</p></div>
                        <Input disabled={true} value={Number}/>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>??????????:</p></div>
                        <Input disabled={true} value={Email}/>

                    </Form.Item>
                </Form>
                <Form.Item>
                    <Button className={s.save} onClick={confirmChanges}>
                        <Link>????????????????</Link>
                    </Button>
                </Form.Item>
            </div>
        </div>

    )
}
export default SettingsInfo


