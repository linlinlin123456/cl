import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import {
  Row,
  Input,
  Button,
  Table,
  Col,
  Modal,
  Form,
  Checkbox,
  Pagination,
  Popconfirm,
  Icon,
  message
} from "antd";
export default class ExportExcel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    const tableCon = ReactDOM.findDOMNode(this.refs["table"]);
    const table = tableCon.querySelector("table");
    table.setAttribute("id", "table-to-xls");
  }
  render() {
    let dataList = [
      { code: "123", name: "hahah", key: "1" },
      { code: "123", name: "hahah", key: "2" }
    ];
    const columns = [
      {
        title: "维度编码",
        className: "dimension-alias",
        dataIndex: "code",
        render: (text, record, index) => {
          return <span>{text}</span>;
        }
      },
      {
        title: "维度别名",
        className: "dimension-alias",
        dataIndex: "name",
        render: (text, record, index) => {
          return <span>{text}</span>;
        }
      }
    ];
    return (
      <div style={{ color: "red", background: "#fff" }}>
        <Table
          ref="table"
          columns={columns}
          dataSource={dataList}
          bordered
          pagination={false}
        />

        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
      </div>
    );
  }
}
