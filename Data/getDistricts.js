
import {
  HOST,
  TOKEN
} from '../constants/covid_uri.js'
import fetch from 'node-fetch'


const get_data_by_districts = async () => {
  try {
    const date = getDate();
      const res = await fetch('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=393&date='+date,{
          headers: {
               'Host': HOST,
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:71.0) Gecko/20100101 Firefox/71.0',
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.5',
                'Referer': HOST,
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
          }
      });
    const headerDate = res.headers && res.headers.get('date') ? res.headers.get('date') : 'no response date';
    console.log('Status Code:', res.status);
   
    const states = await res.json();
    // console.log(states);
    return states;

    
  } catch (err) {
    console.log(err.message); //can be console.error
  }
};
function getDate(){
var datetime = new Date()
var date = datetime.getUTCDate()
var month = datetime.getUTCMonth() + 1
var year = datetime.getUTCFullYear();
return (date+"-"+month+"-"+year);  
}
export {get_data_by_districts }

