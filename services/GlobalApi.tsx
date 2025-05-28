import axios from 'axios'

const axiosClient = axios.create({
  baseURL: 'http://192.168.29.254:1337/api',
  headers: {
    'Authorization':`Bearer ${process.env.EXPO_PUBLIC_STRAPI_API_KEY}`
  },
})

const GetUserByEmail = (email:string) => axiosClient.get(`/user-list?filters[email][$eq]=${email}`)
const CreateNewUser = (data:any) => axiosClient.post('/user-list',data)

export default {GetUserByEmail,CreateNewUser}