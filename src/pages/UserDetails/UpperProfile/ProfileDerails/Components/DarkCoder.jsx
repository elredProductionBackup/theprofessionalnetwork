import React, { useEffect, useState } from 'react'
import { copyIcon } from '../../../../../assets/Images'
import { copyText } from '../../../../../helpers/globalFunctions'
import "./dark-coder.scss";

const DarkCoder = ({ data, value }) => {
    const [copyState, setCopyState] = useState("disappear");

    useEffect(() => {
        setTimeout(() => {
            if (copyState === "appear") {
                setCopyState("disappear");
            }
        }, 1000);
    }, [copyState]);

    return (
        <div className="dark-data-copy-container">
            <span className="data-wrapper">
                {`${data} - ${value ? value : 'N/A'}`}
            </span>
            <img src={copyIcon} alt='copyIcon' onClick={() => copyText(value, setCopyState)} />
            <span className={`dark-data-copied-${copyState}`}>
                Copied!
            </span>
        </div>
    )
}

export default DarkCoder
