import { create } from "apisauce";


const backAPI = create({
 baseURL: 'http://localhost:3000/user',
 headers: { Accept: 'application/vnd.github.v3+json' },
})
export default backAPI