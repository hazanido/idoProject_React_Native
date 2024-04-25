import User from '../Model/userModel';       
import base from './base';
import {IUser} from '../Model/userModel';




class UserController extends BaseController<IUser>{
    constructor() {
        super(User)
    }
}

export default new UserController();