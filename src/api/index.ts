import axios from 'axios'
import User from '../types/user'

interface Response {
  data: Partial<User>
}

export const fetchUser = (id: number): Promise<Response> =>
  axios.get(`https://swapi.dev/api/people/${id}`)
