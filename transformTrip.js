const { formatDate, getStateAbbrev } = require("./helper")

function transformTrip(trip) {
   const info = {
      id: null,
      PU_date: null,
      PU_addr: null,
      DEL_date: null,
      DEL_addr: null,
      price: null,
      mile: null,
      drivers: '',
      status: null
   }
   
   if (!trip) {
      return {}
   }
   
   info.drivers += trip.drivers.map(driver => driver.firstName).join(', ');
   info.id = trip.id
   info.price = trip.payout.value
   info.mile = Math.round(trip.totalDistance.value)
   info.status = trip.executionStatus

   if (trip.tenderStatus == "REJECTED") {
      info.status = "REJECTED"
      return info
   }

   if (trip.executionStatus == "CANCELLED") {
      info.status = "CANCELLED"
      info.mile = 0
   }


   // FOR PU
   const PUStop = trip.loads[0].stops[0]

   info.PU_date = formatDate.wdx(new Date(PUStop.actions[0].plannedTime), PUStop.location.timeZone)
   info.PU_addr = `${PUStop.location.city}, ${getStateAbbrev(PUStop.location.state)}`

   // FOR DEL
   // if has many legs will take last leg otherwise will take 1st leg last stop 
   if (trip.loads.length > 1) {

      // reverse to begin from last
      for (const leg of trip.loads.slice().reverse()) {
         let DELStop = leg.stops.at(-1)

         // if bobtail take previous one
         if (leg.loadType == "BOBTAIL" || leg.executionStatus == "CANCELLED") {
            continue
         } else {
            DELStop = leg.stops.at(-1)
            info.DEL_date = formatDate.wdx(new Date(DELStop.actions[0].actualTime ?? DELStop.actions[0].plannedTime), DELStop.location.timeZone)
            info.DEL_addr = `${DELStop.location.city}, ${getStateAbbrev(DELStop.location.state)}`

            break
         }
      }

   } else {
      // here means only has 1 leg, will take 1st leg last stop
      let DELStop = trip.loads[0].stops.at(-1)

      info.DEL_date = formatDate.wdx(new Date(DELStop.actions[0].actualTime ?? DELStop.actions[0].plannedTime), DELStop.location.timeZone)
      info.DEL_addr = `${DELStop.location.city}, ${getStateAbbrev(DELStop.location.state)}`
   }


   info.PU_date = info.PU_date
   info.DEL_date = info.DEL_date

   return info
}

module.exports = transformTrip