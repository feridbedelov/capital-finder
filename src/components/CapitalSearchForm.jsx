import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useStore } from '../context/MainContext'

function CapitalSearchForm({ }) {

    const [searchTerm, setSearchTerm] = useState("")
    const [requestCount, setRequestCount] = useState(0)
    const [results, setResults] = useState([])
    const [status, setStatus] = useState("neither")

    const dispatch = useDispatch()
    const { capitalList } = useStore()

    useEffect(() => {
        if (searchTerm.trim()) {
            setStatus("loading")
            const delay = setTimeout(() => {
                setRequestCount(prev => prev + 1)
            }, 600)
            return () => clearTimeout(delay)
        } else {
            setStatus("neither")
        }

    }, [searchTerm])

    useEffect(() => {
        if (requestCount) {
            const CancelToken = axios.CancelToken;
            const source = CancelToken.source();

            async function fetchResults() {
                try {
                    const res = await axios(`https://restcountries.eu/rest/v2/capital/${searchTerm}`, {
                        cancelToken: source.token
                    })
                    if (res.data.length > 0) {
                        setStatus("showResults")
                        setResults(res.data)
                    } else {
                        setResults([])
                        setStatus("noData")
                    }

                } catch (error) {
                    console.log(error);
                    setStatus('noData')
                }
            }
            fetchResults()
            return () => source.cancel()

        }
    }, [requestCount])


    const addCapitalToList = (e, newCapital) => {
        e.preventDefault()

        const check = capitalList.find(cp => cp.name === newCapital.name)
        if (!check) {
            dispatch({ type: "addNewCapital", payload: newCapital })
        }

        setStatus('neither')
        setSearchTerm("")
        setResults([])
        setRequestCount(0)
    }


    return (
        <div className='mt-4' >
            <form className='d-flex justify-content-between align-items-center'>
                <input
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder='Capital'
                    type="text" className="form-control mr-2" id="searchTerm" aria-describedby="searchTerm" />

            </form>
            {
                status === "loading" && <div className="text-center mt-2" >
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {
                status === 'noData' && <div className="text-center mt-2">There is no capital matching what you typed</div>
            }
            {status === "showResults" &&

                <ul className="list-group  mt-2">
                    {results.map((capital, i) => {
                        return (<li key={i}
                            onClick={(e) => addCapitalToList(e, capital)}
                            className="list-group-item">
                            {capital.capital} is the capital of {capital.name}
                        </li>)
                    })}
                </ul>


            }
        </div>
    )
}

export default CapitalSearchForm
