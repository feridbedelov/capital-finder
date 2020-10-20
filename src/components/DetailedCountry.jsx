import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useStore } from '../context/MainContext'
import Loader from './Loader'



function DetailedCountry({ }) {
    const [borderCountries, setBorderCountries] = useState([])
    const [loading, setLoading] = useState(false)

    const { selectedCapital } = useStore()

    useEffect(() => {
        setLoading(true)
        setBorderCountries([])
        const borders = []
        selectedCapital.borders && selectedCapital.borders.forEach((border, i) => {
            Axios(`https://restcountries.eu/rest/v2/alpha/${border}`)
                .then(res => {
                    borders.push(res.data.name)
                    if (selectedCapital.borders.length - 1 === i) {
                        setBorderCountries(borders)
                        setTimeout(() => setLoading(false), 500)
                    }

                })
                .catch(err => console.log(err))

        })

    }, [selectedCapital])


    return (
        <div className="card mb-2">
            {
                loading ? <Loader /> : <>
                    <img src={selectedCapital.flag} className="card-img-top img-fluid" alt="Flag" />
                    <div className="card-body">
                        <h5 className="card-title">{selectedCapital.name}</h5>
                        <h6 className="card-text">{selectedCapital.region}</h6>
                        {selectedCapital.population && <h6 className="card-text"> Population : {selectedCapital.population}</h6>}
                        {selectedCapital.currencies && <h6 className="card-text">Currency : {selectedCapital.currencies[0].name}</h6>}
                    </div>
                    {
                        borderCountries &&
                        <div className="card-footer">
                            {<p> Neighbors: {borderCountries.join(', ')}</p>}
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default DetailedCountry
