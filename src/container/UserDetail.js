import { Button, Modal, Table,message } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getUser } from "../store/action/UserListAction";
import { lockWeb } from "../store/action/webListAction";


const columns = [
  { title: "Name Of Organization", dataIndex: "name", key: "name" },
  {
    title: "Number Of Websites",
    dataIndex: "number_of_websites",
    key: "number_of_websites"
  }
];


class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      video: {},
      modal: {
        visible: false,
        id: null,
        actived: false
      }
    };
  }
  handlechange =(id, removed,userId,userActive) =>{
    debugger
    if (userActive == true){
      this.showModal(id,removed,userId);
    }else{
      this.info();
    }
  };

  info = () => {
    message.info('This owner website is disable, you can not change!!');
  };
  showModal = (webID, removed, userID) => {
    this.setState({
      modal: {
        visible: true,
        webID,
        userID,
        removed
      }
    });
  };

  handleOk = () => {
    const { modal } = this.state;
    this.handleEnableOrDisable(modal.webID, modal.removed, modal.userID);
    this.setState({
      modal: {
        visible: false,
        id: null,
        actived: false
      }
    });
  };

  handleCancel = e => {
    this.setState({
      modal: {
        visible: false,
        id: null,
        actived: false
      }
    });
  };
  
  componentDidMount() {
    const { getUserHandle } = this.props;
    getUserHandle(this.props.match.params.id);
  }

  handleEnableOrDisable = (id, removed, userId) => {
    const { lockWebHandle } = this.props;
    let tmp = !removed;
    lockWebHandle(id, tmp, userId);
  };

  expandedRowRender = record => {
    let columns = [
      {
        title: "URL",
        dataIndex: "url",
        width: "40%",
        // ...this.getColumnSearchProps('url'),
        render: (_, { webUrl }) => (
          <div>
            <a
              className="text-lg cursor-pointer hover:text-blue-600 hover:underline"
              onClick={() => window.open(webUrl, "_blank")}
            >
              {webUrl}
            </a>
          </div>
        )
      },
      {
        title: "Created",
        width: "30%",
        render: (_, { createdAt }) => (
          <div>
            <div className="font-bold">
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              }).format(createdAt * 1000)}
            </div>
          </div>
        )
      },
      {
        title: "Status",
        render: (_, { webID, removed,authorIsActived }) =>
        authorIsActived ? (
          removed ? (
            console.log(record),
            <Button
              type="danger"
              onClick={() => this.handlechange(webID, removed, record.userId,authorIsActived)}
            >
              Disable
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => this.handlechange(webID, removed, record.userId,authorIsActived)}
            >
              Enable
            </Button>
          ) 
          ) : (
            removed ? (
              console.log(record),
              <Button
                type="default"
                onClick={() => this.handlechange(webID, removed, record.userId,authorIsActived)}
              >
                Disable
              </Button>
            ) : (
              <Button
                type="default"
                onClick={() => this.handlechange(webID, removed, record.userId,authorIsActived)}
              >
                Enable
              </Button>
            ) 
          )
      }
    ];
    let data = [];
    if (!!record) {
      return (
        <Table
          columns={columns}
          dataSource={record.websites}
          pagination={false}
        />
      );
    }
  };

  render() {
    const { modal } = this.state;
    const { userData } = this.props;
    console.log(userData);
    let data = [];
    if (!!userData) {
      if (!!userData.organizations) {
        data = userData.organizations.map((i, k) => {
          return {
            key: i.organizationID,
            name: i.organizationName,
            number_of_websites: !!i.websites ? i.websites.length : 0,
            websites: i.websites,
            userId: userData.user.userID
          };
        });
      }
    }

    return (
      <div>
        <Modal
          title="Change status"
          visible={this.state.modal.visible}
          style={{alignItems:"center"}}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Please click ok to confirm this Change</p>
        </Modal>
        <div style={{backgroundColor:"steelblue", color:"white",height:"40px",textAlign:"center",fontSize:"25px"}}>       
          <b>{!!userData.user ? userData.user.fullName : ""} - {!!userData.user ? userData.user.email : ""}</b>
        </div>
        <Table
          columns={columns}
          expandedRowRender={record => this.expandedRowRender(record)}
          dataSource={data}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.imageList.userData
  };
};

let mapDispatchToProps = dispatch => {
  return {
    getUserHandle: bindActionCreators(getUser, dispatch),
    lockWebHandle: bindActionCreators(lockWeb, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
