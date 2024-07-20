// CustomDropdown.js
import "./style.css"
import Select from 'react-select';
import { components } from 'react-select';

const CustomDropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <img src={props.dropdownIndicatorImg} alt="dropdown indicator" className="custom-dropdown-indicator-img" />
  </components.DropdownIndicator>
);

const CustomMenu = (props) => {
  const { children, ...rest } = props;
  return (
    <components.Menu {...rest}>
      <div className="custom-dropdown-menu">
        {children}
      </div>
    </components.Menu>
  );
};

const CustomDropdown = ({ options, onChange, dropdownIndicatorImg }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      components={{
        DropdownIndicator: (props) => <CustomDropdownIndicator {...props} dropdownIndicatorImg={dropdownIndicatorImg} />,
        Menu: CustomMenu
      }}
      className="custom-dropdown"
      classNamePrefix="dropdown"
      isSearchable={false} // Отключить поле поиска
      placeholder={null}
      menuPlacement="auto"  // Размещаем меню снизу
    />
  );
};

// const CustomDropdown = ({ options, onChange, dropdownIndicatorImg }) => {
//   return (
//     <Select
//       options={options}
//       onChange={onChange}
//       components={{ DropdownIndicator: (props) => <CustomDropdownIndicator {...props} dropdownIndicatorImg={dropdownIndicatorImg} /> }}
//       className="custom-dropdown"
//       classNamePrefix="dropdown"
//       isSearchable={false} // Отключить поле поиска
//       placeholder={null}
//       // menuPosition="absolute" // Позиционирование меню
//       menuPlacement="auto"  // Размещаем меню снизу
//     />
//   );
// };

export default CustomDropdown;
