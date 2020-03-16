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
      render: () => (
        <Popover
          content={
            <Menu mode="inline" className="border-r-0">
              <Menu.Item>Edit</Menu.Item>
              <Menu.Item>Delete</Menu.Item>
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

  
  // componentDidMount() {
  //   const { filterDate, filterRange } = this.props;

  //   this.handleUpdateVideoList(
  //     filterDate,
  //     1,
  //     filterRange.min,
  //     filterRange.max,
  //     undefined,
  //     undefined
  //   );
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (this.props.filterDate !== nextProps.filterDate) {
  //     this.handleUpdateVideoList(
  //       nextProps.filterDate,
  //       nextProps.pagi.page,
  //       nextProps.filterRange.min,
  //       nextProps.filterRange.max
  //     );
  //   } else if (this.props.pagi.page !== nextProps.pagi.page) {
  //     this.handleUpdateVideoList(
  //       nextProps.filterDate,
  //       nextProps.pagi.page,
  //       nextProps.filterRange.min,
  //       nextProps.filterRange.max
  //     );
  //   }
  // }
  // handleUpdateVideoList = (
  //   filterDate = this.props.filterDate,

  //   pagination = this.props.pagi.page,
  //   min = this.props.filterRange.min,
  //   max = this.props.filterRange.max
  // ) => {
  //   this.props.updateVideos(
  //     filterDate.from,
  //     filterDate.to,
  //     pagination,

  //     undefined,
  //     undefined
  //   );
  // };

  // render() {
    
  //   return (
  //     <Table
  //       columns={columns}
  //       rowKey={record => record.id}
  //       dataSource={data}
  //       loading={loading}
  //       pagination={{ position: "both" }}
  //     />
  //   );
  // }
}



//=========================================================================================

// class DateRange extends React.Component {
//     state = {
//       startValue: null,
//       endValue: null,
//       endOpen: false,
//     };

//     disabledStartDate = startValue => {
//       const { endValue } = this.state;
//       if (!startValue || !endValue) {
//         return false;
//       }
//       return startValue.valueOf() > endValue.valueOf();
//     };

//     disabledEndDate = endValue => {
//       const { startValue } = this.state;
//       if (!endValue || !startValue) {
//         return false;
//       }
//       return endValue.valueOf() <= startValue.valueOf();
//     };

//     onChange = (field, value) => {
//       this.setState({
//         [field]: value
//       });
//     };

//     onStartChange = value => {
//       this.onChange("startValue", value);
//     };

//     onEndChange = value => {
//       this.onChange("endValue", value);
//     };

//     handleStartOpenChange = open => {
//       if (!open) {
//         this.setState({ endOpen: true });
//       }
//     };

//     handleEndOpenChange = open => {
//       this.setState({ endOpen: open });
//     };

//     onFilterDate = () => {
//       var { startValue, endValue, min, max } = this.state;
//       if (startValue !== null && endValue !== null)
//         this.props.updateFiltersDate(startValue, endValue);

//       this.props.updateFiltersRange(min, max);
//     };
//     onResetFilterDate = () => {
//       this.setState({
//         startValue: null,
//         endValue: null,
//         endOpen: false,
//       })
//       this.props.resetFiltersDate();
//     };

//     render() {
//       const { startValue, endValue, endOpen } = this.state;
//       return (
//         <div>
//           <DatePicker
//             disabledDate={this.disabledStartDate}
//             showTime
//             format="YYYY-MM-DD HH:mm:ss"
//             value={startValue}
//             placeholder="Từ ngày"
//             onChange={this.onStartChange}
//             onOpenChange={this.handleStartOpenChange}
//             className="mr-1"
//           />
//           <DatePicker
//             disabledDate={this.disabledEndDate}
//             showTime
//             format="YYYY-MM-DD HH:mm:ss"
//             value={endValue}
//             placeholder="Đến ngày"
//             onChange={this.onEndChange}
//             open={endOpen}
//             onOpenChange={this.handleEndOpenChange}
//             className="mr-1"
//           />

//           <Button className="mr-1" onClick={this.onResetFilterDate}>
//             Bỏ lọc
//           </Button>

//           <Button onClick={this.onFilterDate}>Lọc</Button>
//         </div>
//       );
//     }
//   }
// export const VideoListOption = props => {
//     const onChangePageNumber = (page, pageSize) => {
//       props.updatePagination(page, pageSize);
//     };
//     return (
//       <ul className="opt">
//         <li>
//           <Pagination
//             pageSize={100}
//             defaultCurrent={1}
//             total={props.count}
//             onChange={onChangePageNumber}
//           />
//         </li>
//         <li>
//           <ul className="opt">
//             <li>
//               <DateRange {...props} />
//             </li>
//           </ul>
//         </li>
//       </ul>
//     );
//   };
// export class VideoTable extends Component {
//     state = { visible: false, currentPage: 1, row: {} };
//     goVideoDetail = (id)=>{
//       this.props.history.push(`${this.props.match.url}/${id}`)
//     }
//     getRows = () => {

//       return this.props.videos.map((row, index) => {

//         var time =  toStringDate(row.createdTime);
//         return (

//               <Col   key={`${index}-videoList-${row.videoId}`} span={6} style={{padding: ".5rem 1rem"}}>
//               <Card style={{ cursor: "pointer" }}  title={`STT: ${index+1}`} onClick={()=>this.goVideoDetail(row.videoId)}><div className="btnPlay-container"><Icon type="play-square"  /></div><br/>{time} </Card>
//               </Col>

//         );
//       });
//     };

//     handleOk = e => {
//       this.setState({
//         visible: false
//       });
//     };

//     handleCancel = e => {
//       this.setState({
//         visible: false
//       });
//     };

//     render() {
//       var { videoLink, createdTime } = this.state.row;
//       return (
//         <div>
//          <table>
//          <tbody>
//             <tr>
//               <th>
//                 <div>ID</div>
//               </th>
//               <th>
//                 <div>URL</div>
//               </th>
//               <th>
//                 <div>Author</div>
//               </th>
//               <th>
//                 Organization
//               </th>
//               <th>
//                 <div>Active/Deactive</div>
//               </th>
//             </tr>
//             {this.getRows()}
//           </tbody>
//         </table>
//         </div>
//       );
//     }
//   }

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
