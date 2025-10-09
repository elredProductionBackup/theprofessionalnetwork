import "./default-static-tooltip.scss";

const DefaultStaticTooltip = ({ text, position }) => {
    return (
        <div className={`tooltip bs-tooltip-${position}`} role="tooltip">
            <div className={`tooltip-arrow tooltip-arrow-${position}`}></div>
            <div className="tooltip-inner">
                {text}
            </div>
        </div>
    )
}

export default DefaultStaticTooltip;