import { create } from "apisauce";

const backAPI = create({
 baseURL: 'http://10.0.0.17:3000',
 headers: { Accept: 'application/vnd.github.v3+json' },
})
export default backAPI