const formatDate = {
   hqs: (date, timeZone = null) => {
      options = {
         month: "2-digit",
         day: "2-digit",
         hour: "numeric",
         minute: "numeric",
         hour12: false,
         timeZone
      }

      return (new Intl.DateTimeFormat('EN', options).format(date)).replace(',', '')
   },
   wdx: (date, timeZone = null) => {
      const options = {
         month: 'numeric',
         day: 'numeric',
         timeZone
      };
      return new Intl.DateTimeFormat('en-US', options).format(date);
   }
}

function getStateAbbrev(state) {
   const stateMap = {
      "alabama": "AL",
      "alaska": "AK",
      "arizona": "AZ",
      "arkansas": "AR",
      "california": "CA",
      "colorado": "CO",
      "connecticut": "CT",
      "delaware": "DE",
      "florida": "FL",
      "georgia": "GA",
      "hawaii": "HI",
      "idaho": "ID",
      "illinois": "IL",
      "indiana": "IN",
      "iowa": "IA",
      "kansas": "KS",
      "kentucky": "KY",
      "louisiana": "LA",
      "maine": "ME",
      "maryland": "MD",
      "massachusetts": "MA",
      "michigan": "MI",
      "minnesota": "MN",
      "mississippi": "MS",
      "missouri": "MO",
      "montana": "MT",
      "nebraska": "NE",
      "nevada": "NV",
      "new hampshire": "NH",
      "new jersey": "NJ",
      "new mexico": "NM",
      "new york": "NY",
      "north carolina": "NC",
      "north dakota": "ND",
      "ohio": "OH",
      "oklahoma": "OK",
      "oregon": "OR",
      "pennsylvania": "PA",
      "rhode island": "RI",
      "south carolina": "SC",
      "south dakota": "SD",
      "tennessee": "TN",
      "texas": "TX",
      "utah": "UT",
      "vermont": "VT",
      "virginia": "VA",
      "washington": "WA",
      "west virginia": "WV",
      "wisconsin": "WI",
      "wyoming": "WY"
   }

   return stateMap[state.trim().toLowerCase()] || state
}

module.exports = {
   formatDate,
   getStateAbbrev
}