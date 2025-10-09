import React from 'react';

const DateInfo = ({ label, date , className}) => (
    <div className={className === 'companyName' ? 'companyInfo col-4' : 'educationInfo col-4'}>
        <div className={className === 'companyName' ? 'companyName' : 'educationName'}>{label} - </div>
        <div className={className === 'companyName' ? 'cName' :"eName"}>{date}</div>
    </div>
);

export default DateInfo;
