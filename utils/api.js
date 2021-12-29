import {v4 as uuidv4} from 'uuid';
import UserContact from './people/User';
import Friends from './people/Friends'
import sleep from '../utils/sleep';

const mapUser = user => {
    const {name,picture} = user;
    return{
        id:uuidv4(),
        name:`${name.first} ${name.last}`,
        avatar:picture.medium
    }
}

export const fetchUserProfile = () => {
    return mapUser(UserContact.results[0]);
}

export const fetchFriends = () => {
    return Friends.results.map(mapUser)
}