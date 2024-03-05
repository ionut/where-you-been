import CityItem from './CityItem'
import styles from './CityList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import { UseCities } from '../context/CitiesContext'

function CityList() {
    const { cities, isLoading } = UseCities()
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

    return (
        <ul className={styles.cityList}>
            {cities.map(city => <CityItem city={city} key={crypto.randomUUID()} />)}
        </ul>
    )
}

export default CityList

