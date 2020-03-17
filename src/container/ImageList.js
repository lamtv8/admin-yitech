//import { Button, DatePicker, Icon, Input, InputNumber, Modal, Pagination, Tag } from "antd";
import React, { Component } from "react";
import { getDetectDescription, toStringDate } from "../common/utilities";
import { resetFiltersDate, updateFiltersDate } from "../store/action/filterDateAction";
import { resetFiltersRange, updateFiltersRange } from "../store/action/filterRangeAction";

//import { LineLoading } from "../common/LineLoading";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { updateImages } from "../store/action/imageAction";
import { updatePagination } from "../store/action/pagiAction";
import { Users } from ".";


import { useState, useEffect, useRef } from "react";
import { Table, Button, Input, Menu, Popover } from "antd";
//import { SearchOutlined  , MoreOutlined  } from "@ant-design/icons";
import Highlighter from "react-highlight-words";



const UsersComponent = () => {
  //const { setting } = useAccountContext();
  //const router = useRouter();
  const searchInput = useRef();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buttonState, setButtonState] = useState("primary");

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
      render: (_, { id: trackID, name }) => (
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
          {/* <a
            className="text-sm text-gray-500 cursor-pointer hover:text-blue-600 hover:underline"
            href={email}
          >
            {email}
          </a> */}
        </div>
      ),
    },
    {
      title: 'Email',
      sorter: true,
      width: '20%',
      render: (_, {email}) => (
        <a
            className="text-sm text-gray-500 cursor-pointer hover:text-blue-600 hover:underline"
            href={email}
          >
            {email}
          </a>
      ),
    },
    {
      title: 'Status',
      render: (_, {buttonType, buttonTitle}) => (
        <Button type={buttonType} danger>
      {buttonTitle}
    </Button>
      )
    }
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
        name: `nguyen van a`,
        email: 'VanANguyen@gmail.com',
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
// class DateRange extends React.Component {
//   state = {
//     startValue: null,
//     endValue: null,
//     endOpen: false,
//     min: undefined,
//     max: undefined
//   };

//   disabledStartDate = startValue => {
//     const { endValue } = this.state;
//     if (!startValue || !endValue) {
//       return false;
//     }
//     return startValue.valueOf() > endValue.valueOf();
//   };

//   disabledEndDate = endValue => {
//     const { startValue } = this.state;
//     if (!endValue || !startValue) {
//       return false;
//     }
//     return endValue.valueOf() <= startValue.valueOf();
//   };

//   onChange = (field, value) => {
//     this.setState({
//       [field]: value
//     });
//   };
//   onChangeMin = value => {
//     value = value === null ? undefined : value;
//     this.setState({
//       ...this.state,
//       min: value
//     });
//   };
//   onChangeMax = value => {
//     value = value === null ? undefined : value;
//     this.setState({
//       ...this.state,
//       max: value
//     });
//   };
//   onStartChange = value => {
//     this.onChange("startValue", value);
//   };

//   onEndChange = value => {
//     this.onChange("endValue", value);
//   };

//   handleStartOpenChange = open => {
//     if (!open) {
//       this.setState({ endOpen: true });
//     }
//   };

//   handleEndOpenChange = open => {
//     this.setState({ endOpen: open });
//   };

//   onFilterDate = () => {
//     var { startValue, endValue, min, max } = this.state;
//     if (startValue !== null && endValue !== null)
//       this.props.updateFiltersDate(startValue, endValue);

//     this.props.updateFiltersRange(min, max);
//   };
//   onResetFilterDate = () => {
//     this.setState({
//       startValue: null,
//       endValue: null,
//       endOpen: false,
//       min: undefined,
//       max: undefined
//     }, ()=>{
//       this.props.resetFiltersDate();
//     })
  
//   };

//   render() {
//     const { startValue, endValue, endOpen, min, max } = this.state;
//     return (
//       <div>
//         <DatePicker
//           disabledDate={this.disabledStartDate}
//           showTime
//           format="YYYY-MM-DD HH:mm:ss"
//           value={startValue}
//           placeholder="Từ ngày"
//           onChange={this.onStartChange}
//           onOpenChange={this.handleStartOpenChange}
//           className="mr-1"
//         />
//         <DatePicker
//           disabledDate={this.disabledEndDate}
//           showTime
//           format="YYYY-MM-DD HH:mm:ss"
//           value={endValue}
//           placeholder="Đến ngày"
//           onChange={this.onEndChange}
//           open={endOpen}
//           onOpenChange={this.handleEndOpenChange}
//           className="mr-1"
//         />
//         <InputNumber
//           className="mr-1"
//           min={11}
//           max={70}
//           onChange={this.onChangeMin}
//           placeholder="tuổi thấp nhất"
//           value={min}
//         />
//         <InputNumber
//           className="mr-1"
//           min={11}
//           max={70}
//           onChange={this.onChangeMax}
//           placeholder="tuổi cao nhất"
//           value={max}
//         />
//         <Button className="mr-1" onClick={this.onResetFilterDate}>
//           Bỏ lọc
//         </Button>

//         <Button onClick={this.onFilterDate}>Lọc</Button>
//       </div>
//     );
//   }
// }

// export const ImageListOption = props => {
//   const onChangePageNumber = (page, pageSize) => {
//     props.updatePagination(page, pageSize);
//   };
//   return (
//     <ul className="opt">
//       <li>
//         <Pagination
//           pageSize={100}
//           defaultCurrent={1}
//           total={props.count}
//           onChange={onChangePageNumber}
//         />
//       </li>
//       <li>
//         <ul className="opt">
//           <li>
//             <DateRange {...props} />
//           </li>
//         </ul>
//       </li>
//     </ul>
//   );
// };

// export class ImageTable extends Component {
//   state = {
//     visible: false,
//     currentPage: 1,
//     row: {},
//     currentRow: {},
//     nexRow: {},
//     preRow: {}
//   };
//   getRows = () => {
//     return this.props.images.map((row, index) => {
//       var ages = Object.assign([], row.agePredictions);
//       var agePredicted = row.agePredictions.map((age, index) => {
//         return (
//           <div key={`${index}-age-${row.imageId}`}>
//             {age.age}:<Tag color="red">{age.levelWarning.levelWarningName}</Tag>
//           </div>
//         );
//       });
//       var detectDate = toStringDate(row.createdTime);
//       return (
//         <tr key={`${index}-imageList-${row.imageId}`}>
//           <td>{index}</td>
//           <td>
//             <img
//               style={{ cursor: "pointer" }}
//               alt="face detected"
//               src={row.imageLink}
//               onClick={() => {
//                 var nexRow = index + 1;
//                 var preRow = index - 1;
//                 if (index + 1 >= this.props.images.length) {
//                   nexRow = undefined;
//                 }
//                 if (index - 1 < 0) {
//                   preRow = undefined;
//                 }
//                 this.setState(
//                   { currentRow: index, nexRow: nexRow, preRow: preRow },
//                   () => {
//                     this.showModal(row, ages);
//                   }
//                 );
//               }}
//             />
//           </td>
//           <td>{agePredicted}</td>
//           <td>{detectDate}</td>
//         </tr>
//       );
//     });
//   };
//   showModal = (row, ages) => {
//     this.setState({
//       visible: true,
//       row: row,
//       ages: ages
//     });
//   };
//   handleNext = ( ) =>{
//     var { nexRow } = this.state;
//     if ( nexRow !== undefined) {
//       var currentRow = nexRow;
//       var nexRow = currentRow + 1;
//       var preRow = currentRow - 1;
//       if (currentRow + 1 >= this.props.images.length) {
//         nexRow = undefined;
//       }
//       if (currentRow - 1 < 0) {
//         preRow = undefined;
//       }
      
//       this.setState({
//         visible: true,
//         row: this.props.images[currentRow],
//         ages: this.props.images[currentRow].agePredictions,
//         currentRow: currentRow, nexRow: nexRow, preRow: preRow
//       });
//     }
//   }
//   handlePre = ( ) =>{
//     var { preRow } = this.state;
//     if ( preRow !== undefined) {
//       var currentRow = preRow;
//       var nexRow = currentRow + 1;
//       var preRow = currentRow - 1;
//       if (currentRow + 1 >= this.props.images.length) {
//         nexRow = undefined;
//       }
//       if (currentRow - 1 < 0) {
//         preRow = undefined;
//       }
      
//       this.setState({
//         visible: true,
//         row: this.props.images[currentRow],
//         ages: this.props.images[currentRow].agePredictions,
//         currentRow: currentRow, nexRow: nexRow, preRow: preRow
//       });
//     }
//   }
//   handleOk = e => {
//     this.setState({
//       visible: false
//     });
//   };

//   handleCancel = e => {
//     this.setState({
//       visible: false
//     });
//   };
 
//   render() {
//     var { imageLink, createdTime, imageId } = this.state.row;
//     var { ages } = this.state;
//     var timeDescription = toStringDate(createdTime);
//     var dectectionDescription = getDetectDescription(ages);
//     return (
//       <div>
//         <Modal
//           className="modal-zoomImage"
//           title={`Số Hiệu Hình Ảnh: ${imageId}`}
//           visible={this.state.visible}
//           onOk={this.handleOk}
//           onCancel={this.handleCancel}
//         >
//           <div className="dl-col">
//             <p>{`Chụp vào ${timeDescription}`}</p>
//             <p>{dectectionDescription}</p>
//             <div class="model-group-switchimage">
//               <Icon type="caret-left" onClick={this.handlePre}/>
//               <Icon type="caret-right" onClick={this.handleNext}/>
//             </div>
//             <img key={imageId} alt="zoom" src={imageLink} className="" />
//           </div>
//         </Modal>
//         <table >
//           <tbody>
//             <tr>
//               <th>
//                 <div>ID</div>
//               </th>
//               <th>
//                 <div>Username</div>
//               </th>
//               <th>
//                 <div>Number of websites</div>
//               </th>
//               <th>
//                 <div>Active/Deactive</div>
//               </th>
//             </tr>
//             {this.getRows()}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }
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
    updateFiltersDate: bindActionCreators(updateFiltersDate, dispatch),
    updatePagination: bindActionCreators(updatePagination, dispatch),
    resetFiltersDate: bindActionCreators(resetFiltersDate, dispatch),
    updateFiltersRange: bindActionCreators(updateFiltersRange, dispatch),
    resetFiltersRange: bindActionCreators(resetFiltersRange, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersComponent);
