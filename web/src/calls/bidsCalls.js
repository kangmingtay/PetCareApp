import axios from 'axios';
import api from '../api';


export const fetchAllBids = async(data) => {
    let { username, sort_category, sort_direction, is_selected } = data;
    sort_category = (sort_category === undefined) ? '' : sort_category;
    sort_direction = (sort_direction === undefined) ? '' : sort_direction;
    is_selected = (is_selected === undefined) ? '' : is_selected;
    
    const resp = await axios.get(api.getCareTakerBids(username), {params: {
        sort_category: sort_category,
        sort_direction: sort_direction,
        is_selected: is_selected
    }});
    return resp;
}