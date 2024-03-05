// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message"
import Spinner from "./Spinner"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UseCities } from "../context/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
// 
function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = UseCities();
  const navigate = useNavigate()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [geoCodingError, setGeocodingError] = useState("")

  useEffect(function () {
    async function fetchCityData() {

      if (!lat && !lng) return;

      try {
        setIsLoadingGeocoding(true)
        setGeocodingError("")
        const res = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const data = await res.json()

        if (!data.countryCode) throw new Error('click somewhere else. this is not a country!')

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(data.countryCode);
      } catch (error) {
        setGeocodingError(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [lat, lng])

  async function handleSubmit(e) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    }

    await createCity(newCity)
    navigate("/app/cities")
  }

  if (isLoadingGeocoding) return <Spinner />

  if (!lat && !lng) return <Message message="Start by clicking on the map" />

  if (geoCodingError) return <Message message={geoCodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker id="date" selected={date} onChange={date => setDate(date)} dateFormat='dd/MM/yyyy' />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type='primary'>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
