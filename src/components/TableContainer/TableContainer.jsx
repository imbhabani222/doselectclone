import React from "react";
import { Row, Col, Table } from "antd";
import PropTypes from "prop-types";
import style from "./table.module.scss";

const TableContainer = ({
  columnsData,
  data,
  classData,
  onChange,
  pagination,
  scroll,
  rowKey,
  rowSelection,
  rowClassName,
  bordered
}) => {
  return (
    <div className={style.table}>
      <Row>
        <Col span={24}>
          <Table
            dataSource={data}
            columns={columnsData}
            className={classData}
            onChange={onChange}
            pagination={pagination}
            scroll={scroll}
            rowKey={rowKey || null}
            bordered={bordered}
            rowSelection={rowSelection || null}
            rowClassName={rowClassName || null}
          />
        </Col>
      </Row>
    </div>
  );
};

TableContainer.propTypes = {
  history: PropTypes.object,
  data: PropTypes.any,
  columnsData: PropTypes.any,
  classData: PropTypes.any,
  onChange: PropTypes.any,
  pagination: PropTypes.any,
  scroll: PropTypes.any,
  rowKey: PropTypes.any,
  rowSelection: PropTypes.any,
  rowClassName: PropTypes.any
};

export default React.memo(TableContainer);
