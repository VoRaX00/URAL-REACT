import React from 'react';
import Select from 'react-select';
import "./style.css"

const options = [
    {value: 'боковая', label: 'Боковая'},
    {value: 'верхняя', label: 'Верхняя'},
    {value: 'задняя', label: 'Задняя'},
    {value: 'с полной растентовкой', label: 'С полной расстентовкой'},
    {value: 'со снятием поперечных перекладин', label: 'Со снятием поперечных перекладин'},
    {value: 'со снятием стоек', label: 'Со снятием стоек'},
    {value: 'без ворот', label: 'Без ворот'},
    {value: 'гидроборт', label: 'Гидроборт'},
    {value: "аппарели", label: 'Аппарели'},
    {value: 'с обрешеткой', label: 'С обрешоткой'},
    {value: 'с бортами', label: 'С бортами'},
    {value: 'боковая с 2-х сторон', label: 'Боковая с 2-х'},
    {value: 'налив', label: 'Налив'},
    {value: 'электрический', label: 'Электрический'},
    {value: 'гидравлический', label: 'Гидравлический'},
    {value: 'пневматический', label: 'Пневматический'},
    {value: 'дизельный компрессор', label: 'Дизельный компрессор'},

];

const SelectLoading = ({value, onChange}) => {
    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            isMulti
            className="multi-select"
            classNamePrefix="select"
            placeholder={null}
        />
    );
};

export default SelectLoading;