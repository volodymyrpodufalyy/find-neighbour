import React, {useEffect, useState} from "react";
import s from "./settings.module.scss"
//import imge from "../../assets/img/account-avatar-profile-human-man-user-30448.png";
import {Form, Radio, Row, Col, Image, Upload, Button, Checkbox, Space, Dropdown, Menu, Input} from 'antd';
import {Link} from "react-router-dom";
import {SearchLocationInput} from 'components';

export let refFromSettingsInfo = React.createRef();

const SettingsInfo = (props) => {


    const {
        moreAbout, age, phoneNumber, hasBadHabits, isMarried, hasJob,
        isStudent, hasPets, address, user, avatarUrl, contactWithMeUrl
    } = props.data

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
    const [socUrl, setSocUrl] = useState(contactWithMeUrl)

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
        setSocUrl(contactWithMeUrl)

    }, [address, contactWithMeUrl, user.email, moreAbout, isStudent, hasJob, hasPets, isMarried, hasBadHabits, phoneNumber])


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
    const confirmChanges = () => {
        props.saveChanges(Pets, BadHabits, Student, Job, Married, AboutUser, socUrl, Number)
    }

    let fullname = user.fullname.replace(/(^\s+)|(\s+$)/g, '').split(' ')
    let lastName = fullname[1] ? fullname[1] : ''


    return (
        <div className={s.container}>
            <div className={s.settings_div}>
                <Form className={s.form}>
                    <Form.Item>
                        <div className={s.img}>
                            <Image src={props.fileUrl === '' ? avatarUrl ==='': props.fileUrl} className={s.image}/>
                            <input type="file" onChange={props.uploadOnChange} accept="image/png, image/jpeg"/>
                            <Button onClick={props.uploadBtn} className={s.upload}
                                    disabled={props.disableUpload}>Upload</Button>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Input.Group>
                            <Row gutter={50}>
                                <Col>
                                    <div className='checkbox'><p>First Name:</p></div>
                                    <Input value={fullname[0]} disabled={true}/>
                                </Col>
                                <Col>
                                    <div className='checkbox'><p>Second Name:</p></div>

                                    <Input value={lastName} disabled={true}/>

                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>

                    <Form.Item>
                        <div className='checkbox'><p>Tell something about yourself:</p></div>

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
                            <p>City:</p>
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

                    {/*<Form.Item>*/}
                    {/*    /!*<div className="birthdate">*!/*/}
                    {/*    /!*    <p>Дата народження:</p>*!/*/}
                    {/*    /!*</div>*!/*/}

                    {/*</Form.Item>*/}

                    <Form.Item>

                        <div className='checkbox'><p>Kind of Activity:</p></div>
                        <Radio.Group className={s.radio} onChange={e => setStudent(e.target.value)}
                                     value={Student}
                        >
                            <Radio value={true}>Student</Radio>
                            <Radio value={false}>Graduated</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <Radio.Group className={s.radio} onChange={e => setJob(e.target.value)} value={Job}>
                            <Radio value={true}>Have job</Radio>
                            <Radio value={false}>Unemployed</Radio>
                        </Radio.Group>
                    </Form.Item>


                    <Form.Item>
                        <div className="checkbox">
                            <p>Marital Status:</p>
                        </div>
                        <Radio.Group className={s.radio} value={Married} onChange={e => setMarried(e.target.value)}>
                            <Radio value={true}>In a relationship</Radio>
                            <Radio value={false}>Single</Radio>
                        </Radio.Group>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Pets:</p></div>
                        <Radio.Group value={Pets} className={s.radio3} onChange={e => setPets(e.target.value)}>

                            <Radio value={true}>Yes</Radio>

                            <Radio value={false}>No</Radio>

                            <Radio value={null}>I don't know</Radio>

                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Bad habits:</p></div>
                        <Radio.Group className={s.radio3} value={BadHabits}
                                     onChange={e => setBadHabits(e.target.value)}>

                            <Radio value={true}>Yes</Radio>

                            <Radio value={false}>No</Radio>

                            <Radio value={null}>Unanswered</Radio>

                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <div className='checkbox'>
                            <p>Links on social networks to contact you ^.^</p></div>
                        <label className={s.form_item}>
                            <Input disabled={false} value={socUrl} onChange={event => {
                                setSocUrl(event.target.value)
                            }}/>
                            <div className={s.hint}>The link will help other people contact you</div>
                        </label>
                    </Form.Item>

                    <Form.Item>
                        <div className='checkbox'><p>Phone number:</p></div>
                        <label className={s.form_item}>
                            <Input type={"number"} disabled={false} value={Number} maxLength={12}
                                   onChange={event => setNumber(event.target.value)}/>
                            <div className={s.hint}>Enter your phone number like this: 380...</div>
                        </label>
                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Email:</p></div>
                        <Input disabled={true} value={Email}/>
                    </Form.Item>
                </Form>
                <Form.Item>
                    <Button className={s.save} onClick={confirmChanges}>
                        <Link to="/profile">Save</Link>
                    </Button>
                </Form.Item>
            </div>
        </div>

    )
}
export default SettingsInfo


