import "./default-static-popover.scss";

const DefaultStaticPopover = ({ position, headerText, bodyText, isArray }) => {
    const popoverClasses = `popover bs-popover-${position} customPopover${isArray ? ' popoverArrowLeft' : ''}`;
    const arrowposition = position === "bottom" ? isArray ? "array-bottom" : "bottom" : position;

    return (
        <div className={popoverClasses}>
            <div className={`popover-arrow popover-arrow-${arrowposition} ${isArray ? 'popoverArrowLeft' : ''}`}></div>
            <div className="popover-header nowrap-header">{headerText}</div>
            <div className="popover-body">
                {
                    isArray ?
                        bodyText?.map((item, id, arr) => (
                            item?.value + (arr.length - 1 == id ? "" : ', ')
                        )) : bodyText
                }
            </div>
        </div>
    );
}

export default DefaultStaticPopover;
