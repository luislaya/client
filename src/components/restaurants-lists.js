import React, { useState, useEffect } from 'react'
import RestaurantDataService from '../services/restaurant'
import { Link } from 'react-router-dom'

const RestaurantsLists = (props) => {
  const [restaurant, setRestaurant] = useState([])
  const [searchName, setsearchName] = useState('')
  const [searchZip, setsearchZip] = useState('')
  const [searchCuisine, setsearchCuisine] = useState('')
  const [cuisine, setcuisine] = useState(['All Cuisine'])

  useEffect(() => {
    retriveRestaurants()
    restriveCuisines()
  }, [])

  const retriveRestaurants = () => {
    RestaurantDataService.getAll()
      .then((response) => {
        console.log(response.data)
        setRestaurant(response.data.restaurants)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const onChangeSearchName = (e) => {
    const searchName = e.target.value //take the value of the search box
    setsearchName(searchName)
  }

  const onChangeSearchZip = (e) => {
    const searchZip = e.target.value //take the value of the search box
    setsearchZip(searchZip)
  }

  const onChangeSearchCuisine = (e) => {
    const searchCuisine = e.target.value //take the value of the search box
    setsearchCuisine(searchCuisine)
  }

  const restriveCuisines = () => {
    RestaurantDataService.getCuisine()
      .then((response) => {
        console.log(response.data)
        setcuisine(['All Cuisines'].concat(response.data)) //it start with all of the cuisines then we concatenate the other cuisines
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const refreshList = () => {
    retriveRestaurants()
  }

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then((response) => {
        console.log(response.data)
        setRestaurant(response.data.restaurants)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const findByName = () => {
    find(searchName, 'name')
  }

  const findByZip = () => {
    find(searchZip, 'zipcode')
  }

  const findByCuisine = () => {
    if (searchCuisine === 'All Cuisines') {
      refreshList()
    } else {
      find(searchCuisine, 'cuisine')
    }
  }

  return (
    <div>
      <div className='row pb-1'>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by name'
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByName}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg-4'>
          <input
            type='text'
            className='form-control'
            placeholder='Search by zip'
            value={searchZip}
            onChange={onChangeSearchZip}
          />
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByZip}
            >
              Search
            </button>
          </div>
        </div>
        <div className='input-group col-lg-4'>
          <select onChange={onChangeSearchCuisine}>
            {cuisine.map((cuisine) => {
              return <option value={cuisine}>{cuisine.substr(0, 20)}</option>
            })}
          </select>
          <div className='input-group-append'>
            <button
              className='btn btn-outline-secondary'
              type='button'
              onClick={findByCuisine}
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className='row'>
        {restaurant.map((restaurants) => {
          const address = `${restaurants.address.building} ${restaurants.address.street} ${restaurants.address.zipcode}`
          return (
            <div className='col-lg-4 pb-1'>
              <div className='card'>
                <div className='card-body'>
                  <h5 className='card-title'>{restaurants.name}</h5>
                  <p className='card-text'>
                    <strong>Cuisine: </strong> {restaurants.cuisine} <br />
                    <strong>Address: </strong> {address}
                  </p>
                  <div className='row'>
                    <Link
                      to={'/restaurants/' + restaurants._id}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                    >
                      View Reviews
                    </Link>
                    <a
                      target='_blank'
                      href={'https://www.google.com/maps/place/' + address}
                      className='btn btn-primary col-lg-5 mx-1 mb-1'
                    >
                      View Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default RestaurantsLists
