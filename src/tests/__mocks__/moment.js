// import moment from "moment";                  //cannot directly import it since this file will look for the mocked version of the library.
const moment = require.requireActual('moment')

export default (timestamp = 0)=>{                //function going to be called within the mocked moment library.
    return moment(timestamp)
}