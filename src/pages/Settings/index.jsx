import React, {useState} from "react";
import s from "./settings.module.scss"
import imge from "../../assets/img/account-avatar-profile-human-man-user-30448.png";
import {Form, Radio, Row, Col, Image, Upload, Button, Checkbox, Space, Dropdown, Menu, Input} from 'antd';
import {Link} from "react-router-dom";
import {SearchLocationInput} from 'components';

export let refFromSettingsInfo = React.createRef();

const SettingsInfo = (props) => {

    const [userAddress, setUserAddress] = useState("");


    const callbackAddress = (childAddress) => {
        setUserAddress(childAddress);
    }

    console.log(userAddress)

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
                                    <Input/>
                                </Col>
                                <Col>
                                    <div className='checkbox'><p>Прізвище:</p></div>

                                    <Input/>
                                </Col>
                            </Row>
                        </Input.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Розкажіть про себе:</p></div>

                        <Input.TextArea/>
                    </Form.Item>

                    <Form.Item>
                        <div className="checkbox">
                            <p>Місто:</p>
                            <SearchLocationInput parentCallback={callbackAddress} onChange={() => null}/>

                        </div>
                    </Form.Item>

                    <Form.Item>
                        <div className="birthdate">
                            <p>Дата народження:</p>
                        </div>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Рід зайнятості:</p></div>

                        <Radio.Group>
                            <Row gutter={10}>
                            <Col>
                                <Radio value="student">Студент</Radio>
                            </Col>
                            <Col>
                                <Radio value="graduated">Закінчив університет/коледж</Radio>
                            </Col>
                            <Col>
                                <Radio value="work">Працюю</Radio>
                            </Col></Row>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Тваринки:</p></div>
                        <Radio.Group>
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
                        <Radio>В стосунках</Radio>
                        <Radio>Не в стосунках</Radio>
                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Погані звички:</p></div>
                        <Radio.Group>
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
                        <Input/>

                    </Form.Item>
                    <Form.Item>
                        <div className='checkbox'><p>Пошта:</p></div>
                        <Input/>

                    </Form.Item>
                </Form>
                <Form.Item>
                    <Button className={s.save}>
                        <Link >Зберегти</Link>
                    </Button>
                </Form.Item>
            </div>
        </div>

    )
}
export default SettingsInfo


