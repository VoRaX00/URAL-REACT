import React from 'react';
import Select from 'react-select';
import "./style.css"

const options = [
  { value: 'тентовый', label: 'Тентовый' },
  { value: 'контейнер', label: 'Контейнер' },
  { value: 'открытый конт.', label: 'Открытый конт.' },
  { value: 'площадка без бортов', label: 'Площадка без бортов' },
  { value: 'фургон', label: 'Фургон' },
  { value: 'цельнометалл', label: 'Цельнометалл' },
  { value: 'изотермический', label: 'Изотермический' },
  { value: 'рефрижератор', label: 'Рефрижератор' },
  { value: 'реф. мультирежимный', label: 'Реф. мультирежимный' },
  { value: 'реф. с перегородкой', label: 'Реф. с перегородкой' },
  { value: 'реф. -тушевоз', label: 'Реф. -тушевоз' },
  { value: 'бортовой', label: 'Бортовой' },
  { value: 'самосвал', label: 'Самосвал' },
  { value: 'шаланда', label: 'Шаланда' },
  { value: 'низкорамный', label: 'Низкорамный' },
  { value: 'низкорам.платф.', label: 'Низкорам.платф.' },
  { value: 'телескопический', label: 'Телескопический' },
  { value: 'трал', label: 'Трал' },
  { value: 'балковоз(негабарит)', label: 'Балковоз(негабарит)' },
  { value: 'автобус', label: 'Автобус' },
  { value: 'автовоз', label: 'Автовоз' },
  { value: 'автовышка', label: 'Автовышка' },
  { value: 'автотранспортер', label: 'Автотранспортер' },
  { value: 'бетоновоз', label: 'Бетоновоз' },
  { value: 'битумовоз', label: 'Битумовоз' },
  { value: 'бензовоз', label: 'Бензовоз' },
  { value: 'вездеход', label: 'Вездеход' },
  { value: 'газовоз', label: 'Газовоз' },
  { value: 'зерновоз', label: 'Зерновоз' },
  { value: 'коневоз', label: 'Коневоз' },
  { value: 'контейнеровоз', label: 'Контейнеровоз' },
  { value: 'кормовоз', label: 'Кормовоз' },
  { value: 'кран', label: 'Кран' },
  { value: 'лесовоз', label: 'Лесовоз' },
  { value: 'ломовоз', label: 'Ломовоз' },
  { value: 'манипулятор', label: 'Манипулятор' },
  { value: 'микроавтобус', label: 'Микроавтобус' },
  { value: 'муковоз', label: 'Муковоз' },
  { value: 'панелевоз', label: 'Панелевоз' },
  { value: 'пикап', label: 'Пикап' },
  { value: 'пухтовоз', label: 'Пухтовоз' },
  { value: 'пирамида', label: 'Пирамида' },
  { value: 'рулоновоз', label: 'Рулоновоз' },
  { value: 'седельный тягач', label: 'Седельный тягач' },
  { value: 'скотовоз', label: 'Скотовоз' },
  { value: 'стекловоз', label: 'Стекловоз' },
  { value: 'трубовоз', label: 'Трубовоз' },
  { value: 'цементовоз', label: 'Цементовоз' },
  { value: 'автоцистерна', label: 'Автоцистерна' },
  { value: 'щеповоз', label: 'Щеповоз' },
  { value: 'эвакуатор', label: 'Эвакуатор' },
  { value: 'грузопассажирский', label: 'Грузопассажирский' },
  { value: 'клюшковоз', label: 'Клюшковоз' },
  { value: 'мусоровоз', label: 'Мусоровоз' },
  { value: 'jumbo', label: 'Jumbo' },
  { value: '20 танк-контейнер', label: '20 танк-контейнер' },
  { value: '40 танк-контейнер', label: '40 танк-контейнер' },
  { value: 'мега фура', label: 'Мега фура' },
  { value: 'допельшток', label: 'Допельшток' },
  { value: 'Раздвижной полуприцеп 20/40', label: 'Раздвижной полуприцеп 20/40' },
];

const SelectBody = ({ value, onChange }) => {
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

export default SelectBody;