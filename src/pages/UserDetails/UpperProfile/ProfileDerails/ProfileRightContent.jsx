import React, { useState } from 'react'
import DefaultStaticPopover from '../../../../components/DefaultStaticPopover/DefaultStaticPopover'

const ProfileRightContent = ({ user }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="user-wrap ">
        <div className='d-inline-flex' style={{ position: "relative", cursor: "pointer" }} 
         onClick={() => setOpen(true)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)} tabIndex={-1}>
          <div >
            <span className='titleHeading' >
              User titles
            </span>
            {
              open &&
              <DefaultStaticPopover
                position='bottom'
                headerText={"User titles"}
                bodyText={user?.title}
                isArray={true}
              />
            }
          </div>
          {user?.title && <span className='designation-count-big'>
            {user?.title?.length}
          </span>}
        </div>

        <div className='userTitleList '>
          {
            user?.title ? user?.title?.map((title, id, array) => (
              <span key={id}>
                {title?.value}
                {id !== array.length - 1 && ", "}
              </span>
            )) : 'N/A'
          }

        </div>



      </div>
    </>
  )
}

export default ProfileRightContent
