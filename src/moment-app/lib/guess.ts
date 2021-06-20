import * as moment from "moment-timezone";

export function guess() {
    const timezone = moment.tz.guess();
    switch (timezone) {
        case "Europe/Berlin":
            return "Berlin";
        case "Europe/London":
            return "London";
        default:
            return "Where are you?";
    }
}