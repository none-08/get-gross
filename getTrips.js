const axios = require('axios');

async function getTripsByID(ids, csrfToken, cookies) {
    return axios.post('https://relay.amazon.com/api/tours/entities', {
        blockSearchCriteria: {
            blockStageAndCutoffTimeFilters: null,
            driverEmails: [],
            driverIds: [],
            ids: ids,
            location: null,
            locationType: "firstStop",
            pageStartItemToken: 0,
            textSearchQuery: null,
            isRoundTrip: null,
            isOneWayTrip: null,
            isDelayed: null,
            isDriverAssigned: null,
            isAttentionNeeded: null,
            pageNumber: 1
        },
        domicileFilters: [],
        pageSize: 50,
        sortOrderList: [
            {
                "direction": "asc",
                "field": "START_DATE"
            }
        ],
        tourSearchCriteria: {
            driverEmails: [],
            driverIds: [],
            driverStatus: null,
            ids: ids,
            isRetendered: null,
            isRetenderedDiffRequired: true,
            isTabsDataDateRangeApplicable: true,
            loadTypeFilters: [
                "All"
            ],
            location: null,
            locationType: "firstStop",
            pageNumber: 1,
            pageStartItemToken: 0,
            searchFilters: [],
            hasCancelledLoads: null,
            isRejected: null,
            stages: [],
            textSearchQuery: null,
            trackingStatuses: [],
            isOneWayTrip: null,
            isRoundTrip: null,
            isDelayed: null,
            isDriverAssigned: null,
            isAttentionNeeded: null
        }
    }, {
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Type': 'application/json',
            'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'X-Csrf-Token': csrfToken,
            'Cookie': cookies,
            'Referer': 'https://relay.amazon.com/tours/history?ref=owp_nav_tours',
            'Referrer-Policy': 'strict-origin-when-cross-origin'
        }
    })
        .then(response => {
            // console.log(response.data.entities[0]);
            return response.data.entities
        })
        .catch(error => {
            console.error(error, 'ERROR !!!')
        });
}

module.exports = getTripsByID