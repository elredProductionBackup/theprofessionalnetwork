import { Icon } from "@iconify/react";
import { components } from "react-select";

export const DropdownIndicator = (props) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <Icon
          icon={
            props.selectProps.menuIsOpen
              ? "icon-park-solid:up-one"
              : "icon-park-solid:down-one"
          }
          color="#000"
        />
      </components.DropdownIndicator>
    )
  );
};
