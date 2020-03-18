//import { Button, Card, Col, DatePicker, Icon, Pagination, Row } from "antd";
import React, { Component } from "react";
import {
  resetFiltersDate,
  updateFiltersDate
} from "../store/action/filterDateAction";
import {
  resetFiltersRange,
  updateFiltersRange
} from "../store/action/filterRangeAction";

import { useState, useEffect, useRef } from "react";
import { Table, Button, Input, Menu, Popover } from "antd";
//import { SearchOutlined  , MoreOutlined  } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

// import { LineLoading } from "../common/LineLoading";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toStringDate } from "../common/utilities";
import { updatePagination } from "../store/action/pagiAction";
import { updateVideos } from "../store/action/videoAction";

export const WebsitesComponent = () => {

  //const { setting } = useAccountContext();
  //const router = useRouter();
  const searchInput = useRef();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  //const activeWebsite = setting ? setting.activeWebsite : undefined;
  //const webID = activeWebsite ? activeWebsite.webID : undefined;

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
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
          style={{ width: 188 }}
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const handleEnable = (id) => {
    var item = data.find( s => s.id == id);
    item.buttonType = "danger";
    item.buttonTitle = "Disable"
    setData([...data])
  }

  const handleDisable = (id) => {
    var item = data.find( s => s.id == id);
    item.buttonType = "primary";
    item.buttonTitle = "Enable"
    setData([...data])
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      render: (_, { id: trackID, name, url }) => (
        <div>
          <h5
            className="text-lg cursor-pointer hover:text-blue-600 hover:underline"
            // onClick={
            //   () =>
            //   router.push(
            //     '/sites/[id]/heatmaps/[trackID]',
            //     `/sites/${webID}/heatmaps/${trackID}`,
            //   )
            // }
          >
            {name}
          </h5>
          <a
            className="text-sm text-gray-500 cursor-pointer hover:text-blue-600 hover:underline"
            href={url}
          >
            {url}
          </a>
        </div>
      ),
    },
    {
      title: 'Created',
      sorter: true,
      width: '20%',
      sorter: (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (_, { createdBy, createdAt }) => (
        <div>
          <div className="font-bold">{createdAt}</div>
          <div className="text-sm text-gray-600">{createdBy}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      render: (_, {buttonType, buttonTitle}) => (
        <Button type={buttonType} danger>
      {buttonTitle}
    </Button>
      )
    },
    ,{
      title: 'Change status',
      render: (_, {id}) => (
        <Popover
          content={
            <Menu mode="inline" className="border-r-0">
              <Menu.Item onClick = {() => handleEnable(id)}> Lock</Menu.Item>
              <Menu.Item onClick = {() => handleDisable(id)}> Unlock</Menu.Item>
              </Menu>
          }
        >
          <Button
            onClick={event => event.stopPropagation()}
            type="normal"
            shape="circle"
            className="border-0"
            //icon={<MoreOutlined style={{ display: 'block' }} />}
          />
        </Popover>
      ),
    },
  ];

  const fetch = () => {
    setLoading(true);
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i,
        name: `Website ${i}`,
        url: 'https://www.google.com/'+ i,
        description:
          'Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes along Description is the pattern of narrative development that aims to make vivid a place, object, character, or group. Description is one of four rhetorical modes along ...',
        createdBy: 'Van Lam',
        createdAt: new Date(
          new Date().getTime() - Math.round(Math.random() * 1000000000000),
        ).toLocaleDateString(),
        views: Math.round(Math.random() * 10000),
        buttonType: "primary",
        buttonTitle: "Enable"
      });
      
    }

    setData(data);
    setLoading(false);
  };

  useEffect(() => fetch(), []);
  // const addTracking = row => {
  //   setData([parseResponseData(row), ...data]);
  // };

  return (
    <>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading}
        pagination={{ position: 'both' }}
      />
    </>
  );

}





const mapStateToProps = state => {
  return {
    // videoList: state.videoList,
    // filterDate: state.filterDate,
    // filterRange: state.filterRange,
    // pagi: state.pagi
  };
};

let mapDispatchToProps = dispatch => {
  return {
    // updateVideos: bindActionCreators(updateVideos, dispatch),
    // updateFiltersDate: bindActionCreators(updateFiltersDate, dispatch),
    // updatePagination: bindActionCreators(updatePagination, dispatch),
    // resetFiltersDate: bindActionCreators(resetFiltersDate, dispatch),
    // updateFiltersRange: bindActionCreators(updateFiltersRange, dispatch),
    // resetFiltersRange: bindActionCreators(resetFiltersRange, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WebsitesComponent);
