//import { Button, DatePicker, Icon, Input, InputNumber, Modal, Pagination, Tag } from "antd";
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateImages } from "../store/action/UserListAction";
import { updatePagination } from "../store/action/pagiAction";
import { lockUser } from "../store/action/UserListAction";
import { Users } from ".";

import { useState, useEffect, useRef } from "react";
import { Table, Button, Input, Menu, Popover, Modal } from "antd";
//import { SearchOutlined  , MoreOutlined  } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

import history from "../store/action/history";

const UsersComponent = props => {
  // const { setting } = useAccountContext();
  // const router = useRouter();
  const searchInput = useRef();
  const [modal, setModal] = useState({
    visible: false,
    id: null,
    actived: false
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState("primary");
  useEffect(() => {
    props.updateImages();
  }, []);

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
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          //icon={<SearchOutlined />}
          size="small"
          className="mr-8"
          style={{ width: 85 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 85 }}
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

  const handleEnableOrDisable = (id, actived) => {
    const { lockUserHandle } = props;
    let tmp = !actived;
    lockUserHandle(id, tmp);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (_, { id, name }) => (
        <div>
          <h5
            className="text-lg cursor-pointer hover:text-blue-600 hover:underline"
            style={{ cursor: "pointer" }}
            onClick={() => history.push(`/home/users/${id}`)}
          >
            <div className="hover:text-blue-600" hover="click to view detail">{name}</div>
          </h5>
          {/* <a
            className="text-sm text-gray-500 cursor-pointer hover:text-blue-600 hover:underline"
            href={email}
          >
            {email}
          </a> */}
        </div>
      )
    },
    {
      title: "Email",
      width: "30%",
      render: (_, { email }) => (
        <a
          className="text-sm text-gray-500"
          // href={email}
        >
          {email}
        </a>
      )
    },
    {
      title: "Status",
      render: (_, { id, buttonType, buttonTitle, actived }) => (
        <div>
          {/* <Button type={buttonType} onClick={() => handleEnableOrDisable(id, actived)}>
          {buttonTitle}
        </Button> */}
          <Button type={buttonType} onClick={() => showModal(id, actived)}>
            {buttonTitle}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      <Modal
        title="Change status"
        visible={modal.visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Please click ok to confirm this Change</p>
      </Modal>
      <div style={{backgroundColor:"steelblue", color:"white",height:"40px",textAlign:"center",fontSize:"25px"}}>       
          <b>USER LIST</b>
        </div>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={props.imageList.data.results}
        loading={loading}
        pagination={{ position: "both" }}
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    imageList: state.imageList,
    filterDate: state.filterDate,
    filterRange: state.filterRange,
    pagi: state.pagi
  };
};

let mapDispatchToProps = dispatch => {
  return {
    updateImages: bindActionCreators(updateImages, dispatch),
    updatePagination: bindActionCreators(updatePagination, dispatch),
    lockUserHandle: bindActionCreators(lockUser, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);
