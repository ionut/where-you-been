import styles from './CountryList.module.css'
import Spinner from './Spinner'
import Message from './Message'
import CountryItem from './CountryItem'

function CityList({ cities, isLoading }) {
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Add your first city by clicking on a city on the map" />

    const countries = cities.filter((obj, index) => {
        return index === cities.findIndex(el => obj.country === el.country)
    })

    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem country={country} key={crypto.randomUUID()} />)}
        </ul>
    )
}

export default CityList

