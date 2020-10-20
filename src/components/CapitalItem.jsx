import React from 'react'
import { useDispatch } from '../context/MainContext'

function CapitalItem({ active, capital }) {

    const dispatch = useDispatch()

    const selectCapital = (capital) => {
        dispatch({ type: "selectCapital", payload: { capital } })
    }
    const deleteCapital = (e, capital) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch({ type: "deleteCapital", payload: capital })
    }

    return (
        <li onClick={() => selectCapital(capital)} className={`list-group-item d-flex justify-content-between align-items-center ${active && 'active'}`}>
            { capital.capital}
            <button type='button' onClick={e => deleteCapital(e, capital)} className="btn btn-danger btn-sm">X</button>

        </li >
    )
}

export default CapitalItem
