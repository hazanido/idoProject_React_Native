import { create } from "apisauce";
import {back_URL} from '../config'

const backAPI = create({
 baseURL: `${back_URL}`,
 headers: { Accept: 'application/vnd.github.v3+json' },
})
export default backAPI