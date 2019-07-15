import React, { Component } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.less";
import XLSXS from "xlsx-style";
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
    this.dataList = [["123", "hahah", "1"], ["123", "hahah", "2"]];
  }
  formatExcel = () => {
    let sheet = XLSXS.utils.aoa_to_sheet(this.dataList);
    sheet["A1"] = {
      t: "s",
      v: "三鹿集团有限公司"
    }; //给A1单元格赋值
    sheet["A1"].s = {
      font: {
        name: "宋体",
        sz: 40,
        bold: true,
        underline: true,
        color: {
          rgb: "FFFFAA00"
        }
      },
      alignment: { horizontal: "center", vertical: "center", wrap_text: true },
      fill: {
        bgColor: { rgb: "FFFFAA00" }
      }
    };
    this.openDownloadDialog(this.sheet2blob(sheet), "导出.xlsx");
  };
  openDownloadDialog = (url, saveName) => {
    if (typeof url == "object" && url instanceof Blob) {
      url = URL.createObjectURL(url); // 创建blob地址
    }
    var aLink = document.createElement("a");
    aLink.href = url;
    aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
    var event;
    if (window.MouseEvent) event = new MouseEvent("click");
    else {
      event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
    }
    aLink.dispatchEvent(event);
  };
  sheet2blob = (sheet, sheetName) => {
    sheetName = sheetName || "sheet1";
    var workbook = {
      SheetNames: [sheetName],
      Sheets: {}
    };
    workbook.Sheets[sheetName] = sheet;
    // 生成excel的配置项
    var wopts = {
      bookType: "xlsx", // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: "binary"
    };
    var wbout = XLSXS.write(workbook, wopts);
    var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
    // 字符串转ArrayBuffer
    function s2ab(s) {
      var buf = new ArrayBuffer(s.length);
      var view = new Uint8Array(buf);
      for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
    return blob;
  };
  render() {
    let dataList2 = [
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
          style={{ display: "none" }}
          ref="table"
          columns={columns}
          dataSource={dataList2}
          bordered
          pagination={false}
        />
        <Button onClick={this.formatExcel}>导出</Button>
      </div>
    );
  }
}
