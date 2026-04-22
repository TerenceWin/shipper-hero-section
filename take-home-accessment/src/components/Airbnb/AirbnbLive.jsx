import React, { useState, useRef, useEffect } from 'react'
import './AirbnbBase.css'
import './AirbnbLive.css'
import FilterPanel from './FilterPanel'
import { CATEGORIES, LISTINGS, SEARCH_SEGMENTS, getHouseImage } from './airbnbData'
import airbnbLogo from '../../assets/airbnb/airbnb.png'
import searchIcon from '../../assets/airbnb/search.png'
import nightIcon  from '../../assets/airbnb/moon.png'
import lightIcon  from '../../assets/airbnb/sun.png'

// stage 1 = base Airbnb | stage 2 = + night toggle | stage 3 = + filters
function AirbnbLive({ stage = 1 }) {
    const [activeCategory, setActiveCategory] = useState('Trending')
    const [openSegment,    setOpenSegment]    = useState(null)
    const [nightMode,      setNightMode]      = useState(false)
    const [filterOpen,     setFilterOpen]     = useState(false)

    const searchBarRef = useRef(null)
    const filterRef    = useRef(null)

    useEffect(() => {
        if (stage < 2) setNightMode(false)
        if (stage < 3) setFilterOpen(false)
    }, [stage])

    useEffect(() => {
        if (openSegment === null) return
        const handler = (e) => { if (!searchBarRef.current?.contains(e.target)) setOpenSegment(null) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [openSegment])

    useEffect(() => {
        if (!filterOpen) return
        const handler = (e) => { if (!filterRef.current?.contains(e.target)) setFilterOpen(false) }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [filterOpen])

    const nm = nightMode  // shorthand for className expressions
    const showNightToggle = stage >= 2
    const showFilters     = stage >= 3

    return (
        <div className="airbnb">

            {/* Navbar */}
            <nav className={nm ? 'airbnbNav airbnbNavNight' : 'airbnbNav'}>
                <img src={airbnbLogo} className="airbnbLogo" alt="Airbnb" />

                <div className="airbnbSearchBar" ref={searchBarRef}>
                    {SEARCH_SEGMENTS.map((seg, i) => (
                        <React.Fragment key={seg.key}>
                            {i > 0 && <span className="searchDivider" />}
                            <div className="searchSegmentWrapper">
                                <span
                                    className={"searchSegment" + (seg.key === 2 ? " searchSegmentFaint" : "") + (openSegment === seg.key ? " searchSegmentActive" : "")}
                                    onClick={() => setOpenSegment(p => p === seg.key ? null : seg.key)}
                                >{seg.label}</span>
                                {openSegment === seg.key && (
                                    <div className="searchDropdown">
                                        <p className="searchDropdownTitle">{seg.title}</p>
                                        <div className="searchDropdownOptions">
                                            {seg.options.map(opt => (
                                                <button key={opt} className="searchDropdownOption" onClick={() => setOpenSegment(null)}>{opt}</button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                    <button className="searchButton">
                        <img src={searchIcon} className="searchIcon" alt="search" />
                    </button>
                </div>

                {showNightToggle
                    ? <div className="modeToggle" onClick={() => setNightMode(n => !n)}>
                          <div className="modeWrapper">
                              <img src={nm ? lightIcon : nightIcon} className={"modeImage" + (nm ? " modeImageLight" : "")} />
                          </div>
                      </div>
                    : <div className="airbnbNavRight" />
                }
            </nav>

            {/* Category Bar */}
            <div className={nm ? 'categoryBarWrapper categoryBarWrapperNight' : 'categoryBarWrapper'}>
                <div className={nm ? 'categoryBar categoryBarNight' : 'categoryBar'}>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.label}
                            className={(nm ? 'categoryItem categoryItemNight' : 'categoryItem') + (activeCategory === cat.label ? ' categoryItemActive' : '')}
                            onClick={() => setActiveCategory(cat.label)}
                        >
                            <img src={cat.icon} className={nm ? 'categoryIcon categoryIconNight' : 'categoryIcon'} alt={cat.label} />
                            <span>{cat.label}</span>
                        </button>
                    ))}
                </div>
                {showFilters && (
                    <div className="filterButtonWrapper" ref={filterRef}>
                        <button
                            className={"filterToggleBtn" + (filterOpen ? " filterToggleBtnActive" : "") + (nm ? " filterToggleBtnNight" : "")}
                            onClick={() => setFilterOpen(p => !p)}
                        >
                            <svg viewBox="0 0 16 16" className="filterToggleIcon">
                                <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                            </svg>
                            Filters
                        </button>
                        {filterOpen && <FilterPanel onClose={() => setFilterOpen(false)} />}
                    </div>
                )}
            </div>

            {/* Listing Grid */}
            <div className={nm ? 'listingGrid listingGridNight' : 'listingGrid'}>
                {LISTINGS.map(listing => (
                    <div key={listing.id} className="listingCard">
                        <div className="listingImageWrapper">
                            {listing.guest && <div className={nm ? 'guestBadge guestBadgeNight' : 'guestBadge'}>Guest favourite</div>}
                            <button className="saveButton">
                                <svg viewBox="0 0 32 32" className="heartIcon">
                                    <path d="M16 28c-.414 0-.828-.153-1.146-.459C8.988 22.092 4 17.366 4 11.5 4 7.91 6.91 5 10.5 5c1.924 0 3.75.896 5 2.318C16.75 5.896 18.576 5 20.5 5 24.09 5 27 7.91 27 11.5c0 5.866-4.988 10.592-10.854 16.041A1.566 1.566 0 0 1 16 28z" />
                                </svg>
                            </button>
                            <div className="imagePlaceholder">
                                <img className="listingImage" src={getHouseImage(listing.id)} alt={listing.location} />
                            </div>
                        </div>
                        <div className="listingInfo">
                            <div className="listingInfoRow">
                                <span className="listingLocation">{listing.location}</span>
                                <span className="listingRating">★ {listing.rating}</span>
                            </div>
                            <span className={nm ? 'listingPrice listingPriceNight' : 'listingPrice'}>
                                ${listing.price} for {listing.nights} nights
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show Map */}
            <div className="showMapWrapper">
                <button className="showMapButton">
                    Show map
                    <svg viewBox="0 0 24 24" className="mapIcon">
                        <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z"/>
                    </svg>
                </button>
            </div>

        </div>
    )
}

export default AirbnbLive
