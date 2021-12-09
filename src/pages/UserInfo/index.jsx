import React, {useEffect, useState} from "react";
import {CardItem} from "components";
import {useLocation} from "react-router";
import s from "./UserInfo.module.scss";
import {connect} from "react-redux";
import {addinfoActions} from "redux/actions";
import {Spin} from "antd";
import img from "../../assets/img/account-avatar-profile-human-man-user-30448.png";
import FooterSearch from "../../components/Search/FooterSearch/FooterSearch";


const UserInfo = (props) => {
    const {fetchUserAddInfos, results, isLoading} = props;
    const {state} = useLocation();

    const {user} = state.info;

    const [showMore, setShowMore] = useState(false)

    const ShowMoreHandler = () => {
        showMore ? setShowMore(false) : setShowMore(true)
    }

    useEffect(() => {
        fetchUserAddInfos(1, 6);
    }, []);

    if (isLoading) {
        return (
            <div className="spin-load">
                <Spin size="large" tip="Завантаження..."/>
            </div>
        );
    }

    let addressDetail = state.info?.address.replace(/(^\s+)|(\s+$)/g, '').split(',')


    return (
        <div className={s.container}>
            <div className={s.main}>
                <div className={s.main_info_container}>

                    <div className={s.user_img}>
                        {
                            state.info?.avatarUrl === "" || state.info?.avatarUrl === null || state.info?.avatarUrl === undefined ? <img src={img} alt="User_img"/> :
                                <img src={state.info?.avatarUrl} alt="User_img"/>
                        }
                    </div>
                    <div className={s.user_title}>
                        <h3>{user?.fullname}</h3>

                        <h5>{state.info?.moreAbout}</h5>
                    </div>
                    <div className={s.additional_info}>
                        <div className={s.age}>
                            <h5>Age</h5>
                            <p>{state.info?.age} Year</p>
                        </div>
                        <div className={s.kind_of}>
                            <h5>Status</h5>
                            <p>{state.info?.user.isOnline ? "Online" : "Offline"}</p>

                        </div>
                        <div className={s.city}>
                            <h5>City</h5>
                            <p>{addressDetail[0]}</p>
                        </div>
                    </div>
                    {!showMore ?
                        <div className={s.btn_cont}>
                            <button className={s.btn} onClick={ShowMoreHandler}>More info</button>
                        </div> : null
                    }
                    {showMore ?
                        <div className={s.modal_window}>
                            <div className={s.modal_info}>

                                <div className={s.age}>
                                    <h5>Bad habits</h5>
                                    <p>{state.info?.badHabits === true ? 'Yes' : (state.info?.badHabits === false) ? "No" : "Undefined"}</p>
                                </div>
                                <div className={s.kind_of}>
                                    <h5>Стосунки</h5>
                                    <p>{state.info?.isMarried === true ? 'Так' : (state.info?.isMarried === false) ? "Немає" : "Невідомо"}</p>
                                </div>


                                <div className={s.city}>
                                    <h5>Студент</h5>
                                    <p>{state.info?.isStudent === true ? 'Так' : (state.info?.isStudent === false) ? "Немає" : "Невідомо"}</p>
                                </div>
                                <div className={s.city}>
                                    <h5>Тваринки</h5>
                                    <p>{state.info?.hasPets === true ? 'Так' : (state.info?.hasPets === false) ? "Немає" : "Невідомо"}</p>
                                </div>

                            </div>

                            <div className={s.btn_cont}>
                                <a className={s.abtn} href={state.info?.contactWithMeUrl}>
                                    <div className={s.btn_cont}>
                                        <button className={s.btn}>Contact with me</button>
                                    </div>
                                </a>
                            </div>

                            <div className={s.btn_cont}>
                                <button className="btn btn-outline-secondary" onClick={ShowMoreHandler}>Less info</button>
                            </div>
                        </div> : null}
                </div>

                <div>
                    <h2 className={s.card_title}>Ваші рекомендації</h2>
                    <ul className={s.examples_list}>
                        {results.map((userInfo) => (
                            <li key={userInfo.id}>
                                <CardItem card={userInfo}/>
                            </li>
                        ))}
                    </ul>

                </div>

            </div>
            <FooterSearch/></div>
    );
};

export default connect(
    ({addinfo}) => ({
        items: addinfo.items,
        results: addinfo.results,
        pageSize: addinfo.pageSize,
        totalCount: addinfo.totalCount,
        isLoading: addinfo.isLoading,
    }),
    addinfoActions
)(UserInfo);


// <div className="user-page__header">
//     <div className="header-content">
//         <Card
//             bordered
//             style={{
//                 width: 240,
//                 height: 240,
//                 borderRadius: 20,
//                 boxShadow: "5px 15px 15px rgb(196, 196, 196)",
//             }}
//         >
//             <div className="card-image">
//                 <div className="card-image__avatar">
//                     <Avatar user={user}/>
//                 </div>
//             </div>
//             <h2 className="card-title centered">{user?.fullname}</h2>
//             <h2 className="card-subtitle centered">{user?.email}</h2>
//         </Card>
//         <Card
//             bordered
//             style={{
//                 width: "80%",
//                 height: 240,
//                 borderRadius: 20,
//                 boxShadow: "5px 15px 15px rgb(196, 196, 196)",
//                 padding: "20px 30px",
//             }}
//         >
//             <h2 className="card-title">Informatison</h2>
//             <p className="card-article">{state.info?.moreAbout}</p>
//             <hr/>
//             <div className="card-details">
//                 {details.map((item) => (
//                     <div className="card-details__item">
//                         <h3 className="card-title centered">{item.label}</h3>
//                         <h3 className="card-subtitle centered">{item.value}</h3>
//                     </div>
//                 ))}
//             </div>
//         </Card>
//     </div>
// </div>
