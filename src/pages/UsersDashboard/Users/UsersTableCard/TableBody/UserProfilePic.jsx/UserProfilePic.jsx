import { useState } from "react";
import defaultImage from "../../../../../../assets/Images/userImg.png";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

const UserProfilePic = ({ dpURL }) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <span className="user-table-table-cart-img-new">
            <img src={dpURL} alt="" className={isLoading ? "hide-user-table-table-cart-dp" : "user-table-table-cart-dp-pic"} onLoad={() => setIsLoading(false)} 
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src = defaultImage;
                }} />
            {isLoading && <div className="table-profile-thumb-shimmer"><Skeleton width="30px" height="30px" circle baseColor="#B4B4B4" highlightColor="#F7F7F7" /></div>}
        </span>
  )
}

export default UserProfilePic;