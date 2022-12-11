import union from '../images/Union.png'
export default function InfoTooltip () {
    return(
        <div className="popup">
        <div className="popup__container">
            <button className="popup__close"></button>
            <img src={union} alt="ok" className="popup-info__image"></img>
            <h2 className="popup-info__title">Вы успешно зарегистрировались!</h2>
        </div>
        </div>
    )
}