import { Button, Icon, Layout, Menu, Tag } from "antd";
import {  LandingPage, Stream,UsersComponent,WebsitesComponent } from "../container";
import { NavLink, Route, Switch } from "react-router-dom";
import React, { Component } from "react";
import { checkToken, userLogout } from "../store/action/userAction";

import PlayVideo from "../container/PlayVideo";
import Tutorial from "../container/Tutorial";
import VideoList from "../container/VideoList";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

const { SubMenu } = Menu;
const { Sider, Header, Footer, Content } = Layout;
const routes = [
  {
    name: "DashBoard",
    address: "/home",
    iconType: "home"
  },
  {
    name: "Manage Users",
    address: "/home/users",
    iconType: "user"
  },
  {
    name: "Manage Websites",
    address: "/home/websites",
    iconType: "unordered-list"
  }
];

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageLoading: true
    };
  }
  componen;
  componentWillMount() {
    this.setState({
      pageLoading: false
    });
    // this.props.checkToken(
    //   {},
    //   () => {
        
    //   },
    //   () => {
    //     //this.props.history.push("/");
    //     this.setState({
    //       pageLoading: false
    //     });
    //   }
    // );
  }

  componentWillUnmount() {}


  render() {
    return (
      <div>
        {!this.state.pageLoading && (
          <div>
            <Layout className="ant-layout-container">
              <HeaderMenu {...this.props} />
              <Layout className="layout">
                <Sider className="ant-sider">
                  <SideMenu />
                </Sider>

                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                  }}
                >
                  <Switch>
                    <Route
                      key="route-1"
                      path={`${this.props.match.path}/`}
                      exact
                      component={LandingPage}
                    />
                    <Route
                      key="route-2"
                      path={`${this.props.match.path}/users`}
                      exact
                      component={UsersComponent}
                    />
                     <Route
                     exact
                      key="route-4"
                      path={`${this.props.match.path}/websites`}
                      component={WebsitesComponent}
                    />
                  </Switch>
                </Content>
              </Layout>
              <Footer style={{textAlign: "center", borderTop: "1px solid rgba(0, 0, 0, .1)"}}><strong>UT</strong> ©2020 Developed by <strong><a href="#">team Capstone-8</a></strong></Footer>
            </Layout>
          </div>
        )}
      </div>
    );
  }
}

export class HeaderMenu extends React.Component {
  logOut = () => {
    this.props.userLogout(() => {
      this.props.history.push("/login");
    });
  };
  render() {
    return (
      <div className="dl">
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px", width: "70%" }}
        >
          <Menu.Item style={{ padding: "0"  }}>
            <div
              className=" flex-center"
              style={{
                width: "200px",
                height: "64px",
                background: "rgba(300, 255, 255, 0.2)",
                border: "10px solid", 
              }}
            >
              <NavLink
                exact
                // activeClassName="ant-menu-item-active ant-menu-item-selected"
                to="/home"
              >
                <img
                  style={{ width: "30px", height: "30px",}}
                  alt="logo"
                  src={require("../static/imgs/icon1111.png")}
                />
              </NavLink>
            </div>
          </Menu.Item>
          {/* {routes.map((route, index) => {
            return (
              <Menu.Item key={`header-menu-${index}-nv`} className="custom-menu-item">
              
                  <NavLink
                    exact
                    activeClassName="item-active-custom"
                    to={route.address}
                  >
                    {route.name}
                  </NavLink>
              </Menu.Item>
            );
          })} */}
        </Menu>
        <div
          className="right-header"
          style={{ width: "90%" }}
          key="user-logout"
        >
          <Tag color="blue">
            <strong>Manage system for Yitech Administrator</strong>
          </Tag>
          <Button type="primary" style={{marginLeft:"400px"}}  size="small" onClick={this.logOut}>
            Logout <Icon type="logout" />
          </Button>
        </div>
      </div>
    );
  }
}
class SideMenu extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Menu
        key="side-menu"
        onClick={this.handleClick}
        // mode="inline"
        theme="dark"
        style={{ height: "100%", borderRight: 0 }}
      >
        {routes.map((route, index) => {
          return (
            <Menu.Item key={`sidemenu-${index}`} className="custom-menu-item">
              <NavLink
                exact
                activeClassName="item-active-custom"
                to={`${route.address}`}
              >
                <Icon type={route.iconType} /> {route.name}
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

let mapDispatchToProps = dispatch => {
  return {
    checkToken: bindActionCreators(checkToken, dispatch),
    userLogout: bindActionCreators(userLogout, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
