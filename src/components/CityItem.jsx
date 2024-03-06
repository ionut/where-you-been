import { Link } from 'react-router-dom';
import styles from './CityItem.module.css'
import { UseCities } from '../context/CitiesContext';

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date));

function CityItem({ city }) {
    const { currentCity, deleteCity } = UseCities();
    const { cityName, emoji, date, _id, position } = city;
    const { lat, lng } = position;
    function handleClick(e) {
        e.preventDefault();

        deleteCity(_id)
    }
    return (
        <li >
            <Link className={`${styles.cityItem} ${_id === currentCity._id ? styles['cityItem--active'] : ''}`} to={`${_id}?lat=${lat}&lng=${lng}`}>
                <div className={styles.cityItemBlock}>
                    <span className={styles.emoji}>{emoji}</span>
                    <h3>{cityName}</h3>
                </div>
                <div className={styles.cityItemBlock}>
                    <time className={styles.date}>{formatDate(date)}</time>
                    <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
                </div>
            </Link>
        </li >
    )
}

export default CityItem
