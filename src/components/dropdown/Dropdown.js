// CustomDropdown.js
import "./style.css"
import Select from 'react-select';
import { components } from 'react-select';

// const useDetectOutsideClick = (el, initialState) => {
//   const [isActive, setIsActive] = useState(initialState);
//
//   useEffect(() => {
//     const pageClickEvent = (e) => {
//       // If the active element exists and is clicked outside of
//       if (el.current !== null && !el.current.contains(e.target)) {
//         setIsActive(!isActive);
//       }
//     };
//
//     // If the item is active (ie open) then listen for clicks
//     if (isActive) {
//       window.addEventListener('click', pageClickEvent);
//     }
//
//     return () => {
//       window.removeEventListener('click', pageClickEvent);
//     }
//   })
//   return [isActive, setIsActive];
// }
//
//
// const Dropdown = ({title, items, multiSelect = false}) =>{
//       const dropdownRef = useRef(null);
//     const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
//     const onClick = () => setIsActive(!isActive);
//         return (
//             <div className="container">
//                 <div className="menu-container">
//                     <button onClick={onClick} className="menu-trigger">
//                         <span>User</span>
//                         <img
//                             src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
//                             alt="User avatar"
//                         />
//                     </button>
//                     <nav
//                         ref={dropdownRef}
//                         className={`menu ${isActive ? "active" : "inactive"}`}
//                     >
//                     <ul>
//                         {items.map((item, index) => (
//                             <li key={index}>
//                                 <a className="menu-item" onClick={onClick}>{item}</a>
//                             </li>
//                         ))}
//                     </ul>
//                 </nav>
//             </div>
//         </div>
//     )
// }


const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}>
        <img src={props.dropdownIndicatorImg} alt="dropdown indicator" className="custom-dropdown-indicator-img"/>
    </components.DropdownIndicator>
);

const CustomMenu = (props) => {
    const {children, ...rest} = props;
    return (
        <components.Menu {...rest}>
            <div className="custom-dropdown-menu">
                {children}
            </div>
        </components.Menu>
    );
};

const CustomDropdown = ({options, onChange, dropdownIndicatorImg}) => {
    return (
        <Select
            options={options}
            onChange={onChange}
            components={{
                DropdownIndicator: (props) => <CustomDropdownIndicator {...props}
                                                                       dropdownIndicatorImg={dropdownIndicatorImg}/>,
                Menu: CustomMenu
      }}
      className="custom-dropdown"
      classNamePrefix="dropdown"
      isSearchable={false} // Отключить поле поиска
      placeholder={null}
      menuPlacement="auto"// Размещаем меню снизу
      controlShouldRenderValue={false}
    />
  );
};

export default CustomDropdown;
