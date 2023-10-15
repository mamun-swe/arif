import { Backendurl } from "../Constants";
import axios from 'axios';

export const getUpdateProjectData = async (id, router) => {
    console.log(id, router)
    const res = await axios.post(Backendurl + router, { id })
    return res.data;
}
