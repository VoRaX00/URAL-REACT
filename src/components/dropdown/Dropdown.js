import React from 'react';
import Select, { components } from 'react-select';
import "./style.css";

const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
        <img src={props.dropdownIndicatorImg} alt="dropdown indicator" className="custom-dropdown-indicator-img"/>
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

const CustomDropdown = ({ options, onChange, dropdownIndicatorImg, logout }) => {
    const handleChange = (selectedOption) => {
        if (selectedOption.action === 'logout') {
            logout();
        } else {
            onChange(selectedOption);
        }
    }

    return (
        <Select
            options={options}
            onChange={handleChange}
            components={{
                DropdownIndicator: (props) => <CustomDropdownIndicator {...props} dropdownIndicatorImg={dropdownIndicatorImg} />,
                Menu: CustomMenu
            }}
            className="custom-dropdown"
            classNamePrefix="dropdown"
            isSearchable={false}
            placeholder={null}
            menuPlacement="auto"
            menuPosition="fixed" // Меняем menuPosition на fixed
            controlShouldRenderValue={false}
        />
    );
};

export default CustomDropdown;


// // CustomDropdown.js
// import "./style.css"
// import Select from 'react-select';
// import { components } from 'react-select';
//
// const CustomDropdownIndicator = (props) => (
//     <components.DropdownIndicator {...props}>
//         <img src={props.dropdownIndicatorImg} alt="dropdown indicator" className="custom-dropdown-indicator-img"/>
//     </components.DropdownIndicator>
// );
//
// const CustomMenu = (props) => {
//     const {children, ...rest} = props;
//     return (
//         <components.Menu {...rest}>
//             <div className="custom-dropdown-menu">
//                 {children}
//             </div>
//         </components.Menu>
//     );
// };
//
// const CustomDropdown = ({options, onChange, dropdownIndicatorImg, logout}) => {
//     const handleChange = (selectedOption) => {
//         if (selectedOption.action === 'logout') {
//             logout();
//         } else{
//             onChange(selectedOption);
//         }
//     }
//
//     return (
//         <Select
//             options={options}
//             onChange={onChange}
//             components={{
//                 DropdownIndicator: (props) => <CustomDropdownIndicator {...props}
//                                                                        dropdownIndicatorImg={dropdownIndicatorImg}/>,
//                 Menu: CustomMenu
//       }}
//       className="custom-dropdown"
//       classNamePrefix="dropdown"
//       isSearchable={false} // Отключить поле поиска
//       placeholder={null}
//       menuPlacement="auto"// Размещаем меню снизу
//       controlShouldRenderValue={false}
//     />
//   );
// };
//
// export default CustomDropdown;
