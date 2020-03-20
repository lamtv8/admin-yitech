import React, { Component } from "react";

import { API } from "../static/constant";
import { LineLoading } from "../common/LineLoading";
import { Player } from "video-react";
import { httpService } from "../common/httpService";
import { toStringDate } from "../common/utilities";
import { getUser } from "../store/action/imageAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";


 class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      video: {}
    };
  }
  componentDidMount() {
   const {getUserHandle} = this.props;
   getUserHandle(this.props.match.params.id);
  }
  render() {
      const {userData} = this.props;
      console.log(userData)
    return (
      <div>
       
        <div>
  <h1>Video được ghi lại từ </h1>
            <Player>
          {/* <source src={videoLink} /> */}
        </Player>
        </div>
        
        
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    userData: state.imageList.userData,
  };
};

let mapDispatchToProps = dispatch => {
  return {
    getUserHandle: bindActionCreators(getUser, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);