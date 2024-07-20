// CustomDropdown.js
import "./style.css"
import Select from 'react-select';
import { components } from 'react-select';

const CustomDropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <img src={props.dropdownIndicatorImg} alt="dropdown indicator" className="custom-dropdown-indicator-img" />
  </components.DropdownIndicator>
);

const CustomDropdown = ({ options, onChange, dropdownIndicatorImg }) => {
  return (
    <Select
      options={options}
      onChange={onChange}
      components={{ DropdownIndicator: (props) => <CustomDropdownIndicator {...props} dropdownIndicatorImg={dropdownIndicatorImg} /> }}
      className="custom-dropdown"
      classNamePrefix="dropdown"
      isSearchable={false} // Отключить поле поиска
      placeholder={null}
      menuPosition="absolute" // Позиционирование меню
      menuPlacement="auto"  // Размещаем меню снизу
    />
  );
};

export default CustomDropdown;
