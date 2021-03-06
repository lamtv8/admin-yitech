//import { Button, Card, Col, DatePicker, Icon, Pagination, Row } from "antd";
import React, { Component } from "react";

import { useState, useEffect, useRef } from "react";
import { Table, Button, Input, message, Popover, Modal, notification } from "antd";
//import { SearchOutlined  , MoreOutlined  } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updatePagination } from "../store/action/pagiAction";
import { updateVideos, lockWeb } from "../store/action/webListAction";
import history from "../store/action/history";

export const WebsitesComponent = props => {
  //const { setting } = useAccountContext();
  //const router = useRouter();
  const searchInput = useRef();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = useState({
    visible: false,
    id: null,
    actived: false
  });

  const showModal = (id, actived) => {
    setModal({
      visible: true,
      id,
      actived
    });
  };

  const handleOk = () => {
    handleEnableOrDisable(modal.id, modal.actived);
    setModal({
      visible: false,
      id: null,
      actived: false
    });
  };

  const handleCancel = e => {
    setModal({
      visible: false,
      id: null,
      actived: false
    });
  };
  //const activeWebsite = setting ? setting.activeWebsite : undefined;
  //const webID = activeWebsite ? activeWebsite.webID : undefined;

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div className="p-8">
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-8 block"
          style={{ width: 260 }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          //icon={<SearchOutlined />}
          size="small"
          className="mr-8"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    // filterIcon: filtered => (
    //   <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    // ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible && searchInput) {
        setTimeout(() => searchInput.current.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };
  const handlechange =(id, removed,userActive) =>{
    if (userActive == true){
      showModal(id,removed);
    }else{
      info();
    }
  }
  const info = () => {
    message.info('This owner website is disable, you can not change!!');
  };
  const handleEnableOrDisable = (id, removed,) => {
    const { lockWebHandle } = props;
    let tmp = !removed;
    lockWebHandle(id, tmp);
  };

  const columns = [
    {
      title: "URL",
      dataIndex: "url",

      width: "40%",
      ...getColumnSearchProps("url"),
      render: (_, { url }) => (
        <div>
          <a
            className="text-lg cursor-pointer hover:text-blue-600 hover:underline"
            onClick={() => window.open(url, "_blank")}
          >
            {url}
          </a>
        </div>
      )
    },
    {
      title: "Created",
      width: "30%",
      render: (_, { author, createdAt, userId }) => (
        <div>
          <div className="font-bold">{createdAt}</div>
          <div className="text-sm text-gray-600">
            By{" "}
            <b
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/home/users/${userId}`)}
            >
              {author}
            </b>
          </div>
        </div>
      )
    },
    {
      title: "Status",
      render: (_, { id, buttonType, buttonTitle, removed,userActive }) =>  userActive?
      (
        <Button onClick={() => handlechange(id, removed, userActive)} type={buttonType}>
          {buttonTitle}
        </Button>
      ) :(
        <Button onClick={() => handlechange(id, removed, userActive)} type="default">
          {buttonTitle}
        </Button>
      )
    }
  ];

  useEffect(() => {
    props.updateVideos();
  }, []);

  return (
    <>
      <Modal
        title="Change status"
        visible={modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Please click ok to confirm this Change</p>
      </Modal>
      <div style={{backgroundColor:"steelblue", color:"white",height:"40px",textAlign:"center",fontSize:"25px"}}>       
          <b>WEBSITE LIST</b>
        </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={props.videoList.data.results}
        loading={loading}
        pagination={{ position: "both" }}
      />
    </>
  );
};

const mapStateToProps = state => {
  return {
    videoList: state.videoList
    // filterDate: state.filterDate,
    // filterRange: state.filterRange,
    // pagi: state.pagi
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateVideos: bindActionCreators(updateVideos, dispatch),
    // updatePagination: bindActionCreators(updatePagination, dispatch),
    lockWebHandle: bindActionCreators(lockWeb, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsitesComponent);
