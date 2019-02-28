import {PEAK_PLATE_RESPONSE} from "./enums";
import moment from "moment";

export function checkIsPeakAndPlate(plateNumber: string, inputDate: string, inputTime: string) {
    let completeDateString = inputDate + " " + inputTime;

    //Check if date is valid
    let DateFormat = 'YYYY-MM-DD HH:mm';
    if (!moment(completeDateString, DateFormat, true).isValid()) {
        return PEAK_PLATE_RESPONSE.INVALID_DATE;
    }

    //Check PlateNumber
    let lastCharacter = plateNumber.substring(plateNumber.length - 1, plateNumber.length);
    if (!plateNumber || plateNumber.length !== 6 || plateNumber.length !== 7 || isNaN(lastCharacter)) {
        return PEAK_PLATE_RESPONSE.INVALID_PLATE_NUMBER;
    }


    // Check Time is in peak and plate hours
    let firstDateMorning = moment(inputDate + " 07:00");

    let lastDateMorning = moment(inputDate + " 09:30");

    let firstDateAffternoon = moment(inputDate + " 16:00");

    let lastDateAffternoon = moment(inputDate + " 19:30");

    let isHourPeakPlate = false;
    let inputDateAndTime = moment(completeDateString);

    if (inputDateAndTime >= firstDateMorning && inputDateAndTime <= lastDateMorning) {
        isHourPeakPlate = true
    }

    if (inputDateAndTime >= firstDateAffternoon && inputDateAndTime <= lastDateAffternoon) {
        isHourPeakPlate = true
    }

    let lastDigitPlateNumber = Number(lastCharacter);


    let weekday = inputDateAndTime.days();

    // Check is Peak and Plate
    let isPeakPlate = false;
    switch (lastDigitPlateNumber) {
        case 1:
        case 2:
            if (weekday === 1 && isHourPeakPlate) {
                isPeakPlate = true;
            }
            break;
        case 3:
        case 4:
            if (weekday === 2 && isHourPeakPlate) {
                isPeakPlate = true;
            }
            break;
        case 5:
        case 6:
            if (weekday === 3 && isHourPeakPlate) {
                isPeakPlate = true;
            }
            break;
        case 7:
        case 8:
            if (weekday === 4 && isHourPeakPlate) {
                isPeakPlate = true;
            }
            break;
        case 9:
        case 0:
            if (weekday === 5 && isHourPeakPlate) {
                isPeakPlate = true;
            }
            break;
        default:
            isPeakPlate = false;
    }

    if (isPeakPlate) {
        return PEAK_PLATE_RESPONSE.IS_PEAK_AND_PLATE
    } else {
        return PEAK_PLATE_RESPONSE.NO_PEAK_AND_PLATE
    }
}





