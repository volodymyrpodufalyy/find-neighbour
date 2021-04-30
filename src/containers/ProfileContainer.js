import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Profile from "../pages/MyProfile/MyProfile";
import userProfile, {getUserProfileThunkCreator} from "../redux/reducers/profileReducer";




class ProfileContainer extends React.Component{


    componentDidMount() {

        let userId = this.props.match.params.userId

        if (!userId){userId = 0}

        this.props.getUserProfileThunkCreator(userId)
    }

    render() {
        return <Profile {...this.props} profile = {this.props.profile}/>
    }


}

let mapSetToProps = (state) =>({

    profile: state.profileReducer.profile

})



let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapSetToProps, {getUserProfileThunkCreator})(withUrlDataContainerComponent)
