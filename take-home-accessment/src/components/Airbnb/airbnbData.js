import trending from '../../assets/airbnb/trending.png'
import cabin    from '../../assets/airbnb/cabin.png'
import beach    from '../../assets/airbnb/beach.png'
import mansion  from '../../assets/airbnb/mansion.png'
import artic    from '../../assets/airbnb/artic.png'
import boat     from '../../assets/airbnb/boat.png'
import camping  from '../../assets/airbnb/camping.png'
import newIcon  from '../../assets/airbnb/new.webp'
import home     from '../../assets/airbnb/home.png'

export const CATEGORIES = [
    { label: 'Trending', icon: trending },
    { label: 'Cabins',   icon: cabin    },
    { label: 'Beach',    icon: beach    },
    { label: 'Mansions', icon: mansion  },
    { label: 'Arctic',   icon: artic    },
    { label: 'Boats',    icon: boat     },
    { label: 'Camping',  icon: camping  },
    { label: 'New',      icon: newIcon  },
    { label: 'Homes',    icon: home     },
]

export const LISTINGS = [
    { id: 1,  location: 'Malibu, California', price: 324, nights: 5, rating: 4.97, guest: true  },
    { id: 2,  location: 'Aspen, Colorado',    price: 189, nights: 5, rating: 4.92, guest: false },
    { id: 3,  location: 'New York, NY',       price: 275, nights: 5, rating: 4.85, guest: false },
    { id: 4,  location: 'Lake Tahoe, NV',     price: 215, nights: 5, rating: 4.94, guest: true  },
    { id: 5,  location: 'Portland, Oregon',   price: 178, nights: 5, rating: 4.96, guest: false },
    { id: 6,  location: 'Scottsdale, AZ',     price: 199, nights: 5, rating: 4.88, guest: false },
    { id: 7,  location: 'Nashville, TN',      price: 156, nights: 5, rating: 4.91, guest: false },
    { id: 8,  location: 'Miami Beach, FL',    price: 289, nights: 5, rating: 4.95, guest: true  },
    { id: 9,  location: 'Big Sur, CA',        price: 345, nights: 5, rating: 4.98, guest: true  },
    { id: 10, location: 'Austin, Texas',      price: 167, nights: 5, rating: 4.87, guest: false },
    { id: 11, location: 'San Diego, CA',      price: 242, nights: 5, rating: 4.93, guest: false },
    { id: 12, location: 'Denver, Colorado',   price: 198, nights: 5, rating: 4.86, guest: false },
    { id: 13, location: 'Key West, FL',       price: 312, nights: 5, rating: 4.96, guest: true  },
    { id: 14, location: 'Napa Valley, CA',    price: 268, nights: 5, rating: 4.95, guest: false },
    { id: 15, location: 'Jackson Hole, WY',   price: 287, nights: 5, rating: 4.93, guest: false },
]

export const SEARCH_SEGMENTS = [
    { key: 0, label: 'Anywhere',   title: 'Destination', options: ['New York', 'Los Angeles', 'Miami', 'Aspen', 'Maui', 'Paris'] },
    { key: 1, label: 'Any week',   title: 'Dates',       options: ['This weekend', 'Next week', 'Next month', 'Flexible dates']  },
    { key: 2, label: 'Add guests', title: 'Guests',      options: ['1 guest', '2 guests', '3 guests', '4 guests']                },
]

const houseImages = import.meta.glob('../../assets/airbnb/houses/*.avif', { eager: true })
export const getHouseImage = (id) => houseImages[`../../assets/airbnb/houses/${id}.avif`]?.default
