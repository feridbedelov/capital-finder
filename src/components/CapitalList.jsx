import React from 'react'
import { useStore } from '../context/MainContext'
import CapitalItem from './CapitalItem'

function CapitalList({ }) {

    const { capitalList, selectedCapital } = useStore()

    return (
        <ul className='list-group mb-4'>
            {capitalList && capitalList.map(capital => {
                return <CapitalItem
                    active={selectedCapital && selectedCapital.name === capital.name}
                    key={capital.name}
                    capital={capital} />
            })}
        </ul>
    )
}

export default CapitalList
