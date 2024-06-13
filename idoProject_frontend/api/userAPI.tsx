import { User } from "../src/model/user";
import backAPI from "./backAPI";





const getAlluser = async () => {
 return backAPI.get('/user')
}

const getuser = async (id: string) => {
 return backAPI.get(`/user/${id}`)
}

const createuser = async (user: User) => {
 return backAPI.post('/user', user)
}


export default {
 getAlluser,
 getuser,
 createuser,
}

