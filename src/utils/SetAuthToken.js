import axios from 'axios'

 export default axios.defaults.headers.post['withCredentials'] = true;