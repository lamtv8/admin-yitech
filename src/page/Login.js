import { Button, Col, Form, Icon, Input, Row } from "antd";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { initUser } from "../store/action/userAction";



class Login extends Component {
  render() {
    var WrappedNormalLoginForm = Form.create({ name: "normal_login" })(
      NormalLoginForm
    );
    return (
      <div className="" style={{backgroundColor:"#F2F2F2"}}>
        <Row>
          <Col span={7}>
            <div className="logi-ban2" style={{backgroundRepeat:"no-repeat"}}></div>
          </Col>
          <Col span={10}>
            <row>
              <div>
                {/* <img src={LoginBackground} /> */}
              </div>
            </row>
            <row>
              <div className=" login-form-container" style={{border:"solid 1px"}}>
 <WrappedNormalLoginForm
 initUser={this.props.initUser}
 {...this.props}
/>
              </div>
            </row>
            
          </Col>
          <Col span={7}>
           <div className="logi-ban2" style={{backgroundRepeat:"no-repeat"}}></div>
          </Col>
        </Row>
      </div>
    );
  }
}

export class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isRemember: false
    };
  }
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    // this.props.history.push("/home");
    this.setState({
      loading: false
    });

    
    const { username, password, isRemember } = this.state;
    this.props.form.validateFields((err, values) => {
      var data = {
        email: username,
        password: password,
        isRemember: isRemember
      };
      this.props.initUser(
        data,
        () => {
          this.setState({
            loading: false
          });
          this.props.history.push("/home");
        },
        () => {
          this.setState({
            loading: false
          });
          alert("invalid Username or password");
        }
      );
    });
    this.setState({
      loading: false
    });


    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleInput = e => {
    var value = e.target.value;
    var name = e.target.name;
    this.setState({
      [name]: value
    });
  };

  handleCheckbox = e => {
    var value = e.target.checked;
    var name = e.target.name;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { isRemember, loading } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form ">
        <h1 style={{ textAlign: "center",fontFamily:"Verdana",fontWeight:"bold" }}>YITECH ADMINISTRATOR</h1>
        <Form.Item>
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Please input email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Email"
              name="username"
              onChange={this.handleInput}
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              name="password"
              onChange={this.handleInput}
            />
          )}
        </Form.Item>
        <Form.Item>
          {/* {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: isRemember
          })(<Checkbox name="isRemember" onChange={this.handleCheckbox}></Checkbox>)}
          */}
          <Button
            loading={loading && true}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            {loading ? "WAITTING" : "LOGIN"}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

let mapDispatchToProps = dispatch => {
  return {
    initUser: bindActionCreators(initUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
