import React, {SyntheticEvent, useState} from 'react';
import Cookies from "universal-cookie";
import {jwtDecode} from "jwt-decode";
import axios from "axios";
import {ip} from "../../env/env";

const CarInfo = ({ car }) => {
  const [activeTab, setActiveTab] = useState('info');

  const submit = async (e: SyntheticEvent) => {
        try {
            e.preventDefault();
            const token = new Cookies().get("jwt_authorization");
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.Id;

            if (userId === car.userId) {
                throw new Error("Id equals");
            }

            await axios.post(`http://${ip}/api/NotifyCar/Add`, {
                firstUserComment: "empty",
                secondUserComment: car.comment,
                cargoId: car.id,
                firstUserId: userId,
                secondUserId: car.userId,
            }, {headers: {"Authorization": `Bearer ${token}`}});
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <div className="car-info-container">
      <div className="tabs">
        <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
          Информация
        </button>
        <button className={`tab ${activeTab === 'comment' ? 'active' : ''}`} onClick={() => setActiveTab('comment')}>
          Комментарий
        </button>
      </div>
      {activeTab === 'info' ? (
        <div className="tab-content">
          <h3>{car.name}</h3>
          <div className="info-section">
            <h3>Тип кузова:</h3>
            <ul>
              {car.bodyTypes.map((bodyType) => (
                <li key={bodyType.id}>{bodyType.name}</li>
              ))}
            </ul>
          </div>
          <div className="info-section">
            <h3>Тип разгрузки:</h3>
            <ul>
              {car.loadingTypes.map((loadingType) => (
                <li key={loadingType.id}>{loadingType.name}</li>
              ))}
            </ul>
          </div>
          <p>Вместимость: {car.capacity}</p>
          <p>Объем: {car.volume}</p>
          <p>Ширина: {car.width}</p>
          <p>Высота: {car.height}</p>
          <p>Откуда: {car.from} Куда: {car.to}</p>
          <p>Загрузка: {car.readyFrom} Разгрузка: {car.readyTo}</p>
          <p>Телефон: {car.phone}</p>
        </div>
      ) : (
        <div className="tab-content-comment">
          <h5>{car.comment}</h5>
        </div>
      )}
      <form onSubmit={submit}>
        <button type="submit" className="respond-button">
          Откликнуться
        </button>
      </form>
    </div>
  );
};

export default CarInfo;



// import React, { useState } from 'react';
//
// const CarInfo = ({ car, submit }) => {
//   const [activeTab, setActiveTab] = useState('info');
//
//   return (
//     <div className="car-info-container">
//       <div className="tabs">
//         <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
//           Информация
//         </button>
//         <button className={`tab ${activeTab === 'comment' ? 'active' : ''}`} onClick={() => setActiveTab('comment')}>
//           Комментарий
//         </button>
//       </div>
//       {activeTab === 'info' ? (
//         <div className="tab-content">
//           <h4>{car.name}</h4>
//           <div className="info-section">
//             <h4>Тип кузова:</h4>
//             <ul>
//               {car.bodyTypes.map((bodyType) => (
//                 <li key={bodyType.id}>{bodyType.name}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="info-section">
//             <h3>Тип разгрузки:</h3>
//             <ul>
//               {car.loadingTypes.map((loadingType) => (
//                 <li key={loadingType.id}>{loadingType.name}</li>
//               ))}
//             </ul>
//           </div>
//           <p>Вместимость: {car.capacity}</p>
//           <p>Объем: {car.volume}</p>
//           <p>Ширина: {car.length}</p>
//           <p>Высота: {car.height}</p>
//           <p>Откуда: {car.whereFrom} Куда: {car.whereTo}</p>
//           <p>Загрузка: {car.readyFrom} Разгрузка: {car.readyTo}</p>
//           <p>Телефон: {car.phone}</p>
//         </div>
//       ) : (
//         <div className="tab-content-comment">
//           <h5>{car.comment}</h5>
//         </div>
//       )}
//       <form onSubmit={submit}>
//         <button type="submit" className="btn btn-dark form-text respond-button">
//           Откликнуться
//         </button>
//       </form>
//     </div>
//   );
// };
//
// export default CarInfo;


// import React, { useState } from 'react';
//
// const CarInfo = ({ car, submit }) => {
//   const [activeTab, setActiveTab] = useState('info');
//
//   return (
//     <div className="car-info-container">
//       <div className="tabs">
//         <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
//           Информация
//         </button>
//         <button className={`tab ${activeTab === 'comment' ? 'active' : ''}`} onClick={() => setActiveTab('comment')}>
//           Комментарий
//         </button>
//       </div>
//       {activeTab === 'info' ? (
//         <div className="tab-content">
//           <h3>{car.name}</h3>
//           <div className="info-section">
//             <h3>Тип кузова:</h3>
//             <ul>
//               {car.bodyTypes.map((bodyType) => (
//                 <li key={bodyType.id}>{bodyType.name}</li>
//               ))}
//             </ul>
//           </div>
//           <div className="info-section">
//             <h3>Тип разгрузки:</h3>
//             <ul>
//               {car.loadingTypes.map((loadingType) => (
//                 <li key={loadingType.id}>{loadingType.name}</li>
//               ))}
//             </ul>
//           </div>
//           <p>Вместимость: {car.capacity}</p>
//           <p>Объем: {car.volume}</p>
//           <p>Ширина: {car.length}</p>
//           <p>Высота: {car.height}</p>
//           <p>Откуда: {car.whereFrom} Куда: {car.whereTo}</p>
//           <p>Загрузка: {car.readyFrom} Разгрузка: {car.readyTo}</p>
//           <p>Телефон: {car.phone}</p>
//         </div>
//       ) : (
//         <div className="tab-content-comment">
//           <h5>{car.comment}</h5>
//         </div>
//       )}
//       <form onSubmit={submit}>
//         <button type="submit" className="btn btn-dark form-text respond-button">
//           Откликнуться
//         </button>
//       </form>
//     </div>
//   );
// };
//
// export default CarInfo;


// import React, {SyntheticEvent, useState} from 'react';
// import './style.css';
// import Cookies from "universal-cookie";
// import {jwtDecode} from "jwt-decode";
// import axios from "axios";
// import {ip} from "../../env/env"
//
// const Car = ({car}) => {
//     const [activeTab, setActiveTab] = useState('info');
//     console.log(car.bodyTypes);
//     const submit = async (e: SyntheticEvent) => {
//         e.preventDefault();
//         try {
//             const token = new Cookies().get("jwt_authorization");
//             const decodedToken = jwtDecode(token);
//             const userId = decodedToken.Id;
//
//             if (userId === car.userId) {
//                 throw new Error("Id equals");
//             }
//
//             await axios.post(`http://${ip}/api/NotifyCar/Add`, {
//                 firstUserComment: "empty",
//                 secondUserComment: car.comment,
//                 cargoId: car.id,
//                 firstUserId: userId,
//                 secondUserId: car.userId,
//             }, {headers: {"Authorization": `Bearer ${token}`}});
//         } catch (err) {
//             console.log(err);
//         }
//     };
//
//     return (
//         <div className="car-info-container">
//             <div className="tabs">
//                 <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>
//                     Информация
//                 </button>
//                 <button className={`tab ${activeTab === 'comment' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('comment')}>
//                     Комментарий
//                 </button>
//             </div>
//             {activeTab === 'info' ? (
//                 <div className="tab-content">
//                     <h3>{car.name}</h3>
//                     <div>
//                         <h3>Тип кузова:</h3>
//                         <ul>
//                             {car.length > 0 ? car.bodyTypes.map((bodyType) => (
//                                 // <li key={bodyType.id}>{bodyType.name}</li>
//                                 bodyType.name+"\n"
//                             )) : (
//                                 "Empty"
//                             )
//                             }
//                         </ul>
//                     </div>
//                     <div>
//                         <h3>Тип разгрузки:</h3>
//                         <ul>
//                             {car.loadingTypes.map((loadingType) => (
//                                 <li key={loadingType.id}>{loadingType.name}</li>
//                             ))}
//                         </ul>
//                     </div>
//                     <p>Вместимость: {car.capacity}</p>
//                     <p>Объем: {car.volume}</p>
//                     <p>Ширина: {car.length}</p>
//                     <p>Высота: {car.height}</p>
//                     <p>Откуда: {car.whereFrom} Куда: {car.whereTo}</p>
//                     <p>Загрузка: {car.readyFrom} Разгрузка: {car.readyTo}</p>
//                     <p>Телефон: {car.phone}</p>
//                 </div>
//             ) : (
//                 <div className="tab-content-comment">
//                     <h5>{car.comment}</h5>
//                 </div>
//             )}
//             <form onSubmit={submit}>
//                 <button type="submit" className="btn btn-dark form-text respond-button">
//                     Откликнуться
//                 </button>
//             </form>
//         </div>
//     );
// };
//
// export default Car;
