import React, { useState } from 'react'
import './AirbnbFilter.css'

const PLACE_TYPES   = ['Any type', 'Entire place', 'Private room', 'Shared room']
const COUNT_OPTIONS = ['Any', '1', '2', '3', '4', '5', '6', '7', '8+']

function FilterPanel({ onClose }) {
    const [placeType, setPlaceType] = useState('Any type')
    const [minPrice,  setMinPrice]  = useState(50)
    const [maxPrice,  setMaxPrice]  = useState(500)
    const [bedrooms,  setBedrooms]  = useState('Any')
    const [beds,      setBeds]      = useState('Any')
    const [bathrooms, setBathrooms] = useState('Any')

    const handleClear = () => {
        setPlaceType('Any type'); setMinPrice(50); setMaxPrice(500)
        setBedrooms('Any'); setBeds('Any'); setBathrooms('Any')
    }

    const CountRow = ({ value, setter }) => (
        <div className="filterCountRow">
            {COUNT_OPTIONS.map(opt => (
                <button key={opt} className={"filterCountBtn" + (value === opt ? " filterCountBtnActive" : "")} onClick={() => setter(opt)}>{opt}</button>
            ))}
        </div>
    )

    return (
        <div className="filterPanel">
            <div className="filterSection">
                <p className="filterSectionTitle">Type of place</p>
                <div className="filterChips">
                    {PLACE_TYPES.map(type => (
                        <button key={type} className={"filterChip" + (placeType === type ? " filterChipActive" : "")} onClick={() => setPlaceType(type)}>{type}</button>
                    ))}
                </div>
            </div>
            <div className="filterDivider" />

            <div className="filterSection">
                <p className="filterSectionTitle">Price range</p>
                <div className="filterPriceRow">
                    <div className="filterPriceInput">
                        <span className="filterPricePrefix">$</span>
                        <input type="number" className="filterPriceField" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
                    </div>
                    <span className="filterPriceDash">–</span>
                    <div className="filterPriceInput">
                        <span className="filterPricePrefix">$</span>
                        <input type="number" className="filterPriceField" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="filterDivider" />

            {[['Bedrooms', bedrooms, setBedrooms], ['Beds', beds, setBeds], ['Bathrooms', bathrooms, setBathrooms]].map(([label, val, setter], i) => (
                <React.Fragment key={label}>
                    <div className="filterSection">
                        <p className="filterSectionTitle">{label}</p>
                        <CountRow value={val} setter={setter} />
                    </div>
                    {i < 2 && <div className="filterDivider" />}
                </React.Fragment>
            ))}
            <div className="filterDivider" />

            <div className="filterFooter">
                <button className="filterClearBtn" onClick={handleClear}>Clear all</button>
                <button className="filterShowBtn"  onClick={onClose}>Show places</button>
            </div>
        </div>
    )
}

export default FilterPanel
