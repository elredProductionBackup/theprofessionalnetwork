import "./users-table.scss";
import TableHeaderRow from "./TableHeaderRow/TableHeaderRow";
import TableBody from "./TableBody/TableBody";
import SearchPageTablePagination from "./SearchPageTablePagination/SearchPageTablePagination";
import Select from "react-select";
import { DropdownIndicator } from "./DropdownIndicator/DropdownIndicator";
import UsersTopHeader from "./UsersTopHeader/UsersTopHeader";
import Spinner from "react-bootstrap/Spinner";

const UsersTableCard = ({
  tableHeaderTextOne,
  tableHeaderTextTwo,
  tableHeaderTextThree,
  tableHeaderTextFour,
  searchText,
  setSearchText,
  setSearchKey,
  setOnboardingStatus,
  userLoader,
  tableHeaderTextFive,
  tableHeaderTextSix,
  tableHeaderTextSeven,
  usersTableData,
  usersError,
  onBoardingStatus,
  sortOptions,
  data,
  count,
  itemsPerPage,
  activePage,
  setActivePage,
  searchKey,
}) => {
  const totalPages = Math.ceil(count / itemsPerPage);

  const handleChange = (selectedOption) => {
    if (selectedOption?.value === searchKey) return false;
    setSearchKey(selectedOption?.value);
    setActivePage(0);
    setSearchText("");
  };

  const handleOnboarding = (selectedOption) => {
    setActivePage(0);
    setOnboardingStatus(selectedOption?.value);
  };

  const handleSearchText = (e) => {
    if (e.target.value.trimStart() === searchText) return false;
    if (e.target.value.trim() !== "") {
      let reg = /^[a-zA-Z0-9]+$/;
      if (
        !e.nativeEvent.data ||
        e?.nativeEvent?.data?.match(reg) ||
        e?.nativeEvent.inputType === "deleteContentBackward" ||
        e?.nativeEvent?.data === " " ||
        e.nativeEvent.data === "-"
      ) {
        let regs = /\s+$/;
        let text = regs.test(e.target.value)
          ? e.target.value.replace(/\s+$/, " ")
          : e.target.value;
        if (/[ ]{2,}/.test(text)) return false;
        setSearchText(text);
      }
    } else {
      setSearchText("");
    }
  };

  return (
    <div className="users-table-card-container-new">
      <div className="users-table-card-inner-new">
        <UsersTopHeader headerText={"Users"} count={count} />
        <div className="user-table-card-body-new">
          <div className="user-table-card-top">
            <div className="user-table-card-top-left">
              <span className="user-table-card-top-left-onboarding">
                Onboarding status
              </span>
              <Select
                options={onBoardingStatus}
                isSearchable={false}
                defaultValue={onBoardingStatus[0]}
                classNamePrefix="filter"
                components={{ DropdownIndicator }}
                onChange={handleOnboarding}
              />
            </div>
            <div className="user-table-card-top-right">
              <Select
                options={sortOptions}
                isSearchable={false}
                defaultValue={sortOptions[0]}
                classNamePrefix="filter"
                components={{ DropdownIndicator }}
                onChange={handleChange}
              />
              <input
                className="user-table-search-input-field"
                type="text"
                value={searchText}
                placeholder="Search"
                onChange={(e) => handleSearchText(e)}
              />
            </div>
          </div>
          <div className="user-table-table-responsive">
            <table className="user-table-table">
              <TableHeaderRow
                tableHeaderTextOne={tableHeaderTextOne}
                tableHeaderTextTwo={tableHeaderTextTwo}
                tableHeaderTextThree={tableHeaderTextThree}
                tableHeaderTextFour={tableHeaderTextFour}
                tableHeaderTextFive={tableHeaderTextFive}
                tableHeaderTextSix={tableHeaderTextSix}
                tableHeaderTextSeven={tableHeaderTextSeven}
              />
              {!userLoader && (
                <TableBody usersTableData={usersTableData} data={data} />
              )}
            </table>
            {userLoader && (
              <div className="users-table-spinner-container">
                <Spinner
                  animation="border"
                  variant="danger"
                  className="users-table-spinner-loader"
                />
              </div>
            )}
            {!userLoader && count === 0 && !usersError && (
              <div className="users-table-spinner-container">
                <span className="no-users-found-text">No users found</span>
              </div>
            )}
            {!userLoader && usersError && (
              <div className="users-table-spinner-container">
                <span className="no-users-found-text">{usersError}</span>
              </div>
            )}
          </div>
          {userLoader || count === 0 || usersError ? (
            <div className="users-table-empty-bottom"></div>
          ) : (
            <div className="user-table-card-bottom">
              <span className="user-table-card-bottom-left">
                Showing{" "}
                {count > 0
                  ? (activePage + 1) * itemsPerPage - itemsPerPage + 1
                  : 0}{" "}
                to{" "}
                {(activePage + 1) * itemsPerPage > count
                  ? count
                  : (activePage + 1) * itemsPerPage}{" "}
                Out of {count} entries
              </span>
              <SearchPageTablePagination
                pagesCount={totalPages}
                activePage={activePage}
                setActivePage={setActivePage}
                count={count}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersTableCard;
