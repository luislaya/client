import axios from 'axios'

export default axios.create({
  baseURL:
    'https://webhooks.mongodb-realm.com/api/client/v2.0/app/yelp-reviews-dnhgb/service/Restaurants/incoming_webhook/',
  headers: {
    'Content-type': 'application/json',
  },
})
