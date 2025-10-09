const TableHeaderRow = ({
  tableHeaderTextOne,
  tableHeaderTextTwo,
  tableHeaderTextThree,
  tableHeaderTextFour,
  tableHeaderTextFive,
  tableHeaderTextSix,
  tableHeaderTextSeven,
}) => {
  return (
    <thead className="user-table-table-head">
      <tr className="user-table-table-head-row-new">
        <th className="user-table-table-text-header-new user-table-header-first">
          {tableHeaderTextOne}
        </th>
        <th className="user-table-table-text-header-new user-table-header-second">
          {tableHeaderTextTwo}
        </th>
        <th className="user-table-table-text-header-new user-table-header-third">
          {tableHeaderTextThree}
        </th>
        <th className="user-table-table-text-header-new user-table-header-fourth">
          {tableHeaderTextFour}
        </th>
        <th className="user-table-table-text-header-new user-table-header-fifth">
          {tableHeaderTextFive}
        </th>
        <th className="user-table-table-text-header-new user-table-header-sixth">
          {tableHeaderTextSix}
        </th>
        <th className="user-table-table-text-header-new user-table-header-seventh">
          {tableHeaderTextSeven}
        </th>
      </tr>
    </thead>
  );
};

export default TableHeaderRow;
