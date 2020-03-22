import { Button, Card, Icon, List } from "antd";
import React, { Component } from "react";
import { updateImages } from "../store/action/UserListAction";
import { updateVideos } from "../store/action/webListAction";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

// const data = [
//   {
//     number: 12,
//     icon: "file-image",
//     title: "HAVE",
//     description:
//       "Customer use our system",
//     router: "/home/users",
//     keyrender: "1"
//   },
//   {
//     number: 20,
//     icon: "database",
//     title: "HAVE",
//     description:
//       "Website are tracking by our system",
//     router: "/home/websites",
//     keyrender: "2"
//   },

// ];


class LandingPage extends Component {

  componentDidMount() {
    const { updateImages, updateVideos } = this.props;
    updateImages();
    updateVideos();
  }
  navigate = router => {
    this.props.history.push(router);
  };

  render() {
    const { imageList, videosList } = this.props;
    let countUser = {
      number: !!imageList ? imageList.data.results.length : 0,
      icon: "file-image",
      title: "HAVE",
      description:
        "Customer use our system",
      router: "/home/users",
      keyrender: "1"
    }
    let data = [];
    let countWeb = {
      number: !!videosList ? videosList.data.results.length : 0,
      icon: "database",
      title: "HAVE",
      description:
        "Website are tracking by our system",
      router: "/home/websites",
      keyrender: "2"
    }
    data.push(countUser);
    data.push(countWeb);
    return (
      <div className="content-wrapper">
        {

          !!data ? <List
            className="landingpage-container"
            grid={{ gutter: 16, column: 2 }}
            dataSource={data}
            renderItem={item => (
              <List.Item >
                <Card title={item.title} className="card-landing-custom">
                  {/* <Icon type={item.icon} /> */}
                  <div style={{ color: "red", fontSize: "50px", textAlign: "center", fontWeight: "bold", }}>{item.number}</div>
                  <p>{item.description}</p>
                  <Button type="primary" onClick={() => this.navigate(item.router)}>
                    View
                </Button>
                </Card>
              </List.Item>
            )}
          /> :
            ""
        }

      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    imageList: state.imageList,
    videosList: state.videoList
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateImages: bindActionCreators(updateImages, dispatch),
    updateVideos: bindActionCreators(updateVideos, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
