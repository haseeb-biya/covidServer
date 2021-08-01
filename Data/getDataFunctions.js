import {get_data_by_districts} from '../Data/getDistricts.js'
import centres  from '../Data/dummyData.js'
import logger from '../logger.js'

const centers_id = [67953, 68160, 67963, 47061,642521];

var slotDetails = [];

const collectDataFromServer = (async () => {
    const districts = await get_data_by_districts();
    //const districts = centres;
    
    const filterData = [];
    slotDetails = [];
    for (var x in districts) {
        for (var y in districts[x]) {
            if (centers_id.includes(districts[x][y]['center_id'])) {
                filterData.push(districts[x][y])
            }
        }
    }
    // for (var x in districts) {
    //     if (centers_id.includes(districts[x]['center_id'])) {
    //             filterData.push(districts[x])
    //         }
    // }
    
    return filterData;
});
const checkForSlotAvailability = (async (filterData) => {
    
    var isAvailable = false;
    slotDetails = [];  
    for (var x in filterData) {  
        if (filterData[x]['sessions'].length >= 1) {
            for (var y in filterData[x]['sessions'])
            {
                if (filterData[x]['sessions'][y]['available_capacity_dose1']>= 1) {
                    isAvailable = true;
                    const contructJSON = {
                        session_id: filterData[x]['sessions'][y]['session_id'],
                        date:filterData[x]['sessions'][y]['date'],
                        vaccine: filterData[x]['sessions'][y]['vaccine'],
                        age: filterData[x]['sessions'][y]['min_age_limit'],
                        center_id: filterData[x]['center_id'],
                        pincode: filterData[x]['pincode'],
                        name: filterData[x]['name'],
                        dose1: filterData[x]['sessions'][y]['available_capacity_dose1']
                    }
                    slotDetails.push(contructJSON);
                    console.log(slotDetails);
                    logger.info(`${filterData[x]['sessions'][y]['available_capacity_dose1']} Dose1 slots are available at ${filterData[x]['name']}, ${filterData[x]['address']}`);
                }
            }            
        }
    }

    return isAvailable;
});
function getAvailableSlotDetails() {
    return slotDetails;
}
export  {
    collectDataFromServer,
    checkForSlotAvailability,
    getAvailableSlotDetails
}