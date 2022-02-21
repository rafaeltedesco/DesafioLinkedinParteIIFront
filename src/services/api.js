
import {API_URL} from '../config/env.js'
import axios from 'axios'


class ApiService {

  constructor(url = null) {
    
    this.api = axios.create({
      baseURL: url || API_URL
      })
  }

  async get(resource = null) {
    return await this.api.get(resource || '/')
  }

  async queryWord(word){
    console.log(word, 'query')
    return await this.api.get(`/search?courseName=${word}`)

  }

}

export default new ApiService()