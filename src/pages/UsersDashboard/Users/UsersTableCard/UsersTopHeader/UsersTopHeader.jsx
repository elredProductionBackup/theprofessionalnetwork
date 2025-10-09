import peopleIcon from "../../../../../assets/Icons/people.svg";

const UsersTopHeader = ({ headerText, count }) => {
  return (
    <div className="users-table-card-header-new">
    <div className="users-table-card-title-left">
      <span className="users-table-card-title-left-img"><img src={peopleIcon} alt="" /></span>
      <span className="users-table-card-title-left-text">{headerText}</span>
    </div>
    <div className="users-table-card-title-right">{count}</div>
  </div>
  )
}

export default UsersTopHeader;