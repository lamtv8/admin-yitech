import { Button, Card, Icon, List } from "antd";
import React, { Component } from "react";

const data = [
  {
    number: 12,
    icon: "file-image",
    title: "HAVE",
    description:
      "Customer use our system",
    router: "/home/users",
    keyrender: "1"
  },
  {
    number: 20,
    icon: "database",
    title: "HAVE",
    description:
      "Website are tracking by our system",
    router: "/home/websites",
    keyrender: "2"
  },

];

export default class LandingPage extends Component {
  navigate = router => {
    this.props.history.push(router);
  };
  render() {
    return (
      <div className="content-wrapper">
        <List
        className="landingpage-container"
          grid={{ gutter: 16, column: 2 }}
          dataSource={data}
          renderItem={item => (
            <List.Item >
              <Card title={item.title} className="card-landing-custom"> 
              {/* <Icon type={item.icon} /> */}
              <div style={{ color: "red",fontSize: "50px",textAlign:"center",fontWeight:"bold",}}>{item.number}</div>
                <p>{item.description}</p>
                <Button type="primary" onClick={()=>this.navigate(item.router)}>
                  View
                </Button>
              </Card>
            </List.Item>
          )}
        />
        ,
      </div>
    );
  }
}
