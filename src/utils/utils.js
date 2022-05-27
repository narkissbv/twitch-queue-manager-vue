// const API_BASE_URL = '/api/otofoto2be'
import axios from 'axios'

const sendAPI = (payload) => {
  let formData = new FormData()
  for (let key in payload) {
    formData.append(key, payload[key])
  }
  return axios.post(`https://twitch.narxx.com/queue_config.php`, formData)
}

export {
  sendAPI
}
