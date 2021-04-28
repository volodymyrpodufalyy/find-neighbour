import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import Profile from "../pages/MyProfile/MyProfile";
import userProfile, {getUserProfileThunkCreator} from "../redux/reducers/Profile";




class ProfileContainer extends React.Component{


    componentDidMount() {

        let userId = this.props.match.params.userId

        if (!userId){userId = 2}

        this.props.getUserProfileThunkCreator(userId)
    }

    render() {
        return <Profile {...this.props} profile = {this.props.profile}/>
    }


}
debugger
let mapSetToProps = (state) =>({

    profile: {
        "name": "Vovanddos",
        "id": 16811,
        "uniqueUrlName": null,
        "photos": {
            "small": null,
            "large": null
        },
        "status": null,
        "followed": false
    }

})



let withUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapSetToProps, {getUserProfileThunkCreator})(withUrlDataContainerComponent)
