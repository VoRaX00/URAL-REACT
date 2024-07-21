import "../styles/css/EditProfile.css"

const EditProfile = () => {
    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center">
            <form className='card p-5' action="#" encType="multipart/form-data" method="post">
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label form-text">Имя</label>
                    <input type="text" name='name' value="user-name" className="form-control"
                           id="exampleInputName"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="InputEmail" className="form-label form-text">Адрес электронной почты</label>
                    <input type="email" value="user-email" name='email' className="form-control" id="InputEmail" aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label form-text">Номер телефона</label>
                    <input type="tel" value="user-phone" name='phone' className="form-control" id="InputPhone"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label form-text">Загрузите изображение</label>
                    <br/>
                    <input type="file" className="form-control-file" id="image" name="image" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="aboutMe" className="form-label form-text">Обо мне</label>
                    <textarea className="form-control form-text" id="aboutMe" name="aboutMe" rows="5">Я люблю программировать)</textarea>
                </div>
                <button type="submit" className="btn btn-dark form-text">Изменить</button>
            </form>
        </div>
    );
}

export default EditProfile;