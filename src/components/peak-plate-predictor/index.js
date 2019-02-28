// @flow
import React from 'react';
import {PEAK_PLATE_RESPONSE} from "./enums";
import {checkIsPeakAndPlate} from "./helpers";

export interface Props {
}

export interface State {
    plateNumber: string,
    inputDate: string,
    inputTime: string,
}

class PeakPlatePredictor extends React.Component<Props, State> {
    _handleSubmit: Function;

    constructor(props: Props) {
        super(props);
        this.state = {
            plateNumber: "",
            inputDate: new Date().toISOString().substr(0, 10),
            inputTime: new Date().toTimeString().substr(0, 5),
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }


    _handleSubmit(event: any) {
        event.preventDefault();

        let vehicle = {
            plateNumber: this.state.plateNumber,
            peakAndPlate: checkIsPeakAndPlate(this.state.plateNumber, this.state.inputDate, this.state.inputTime),
            displayMessage: "",
        };

        switch (vehicle.peakAndPlate) {
            case PEAK_PLATE_RESPONSE.IS_PEAK_AND_PLATE:
                vehicle.displayMessage = "vehicle can not be driven";
                break;

            case PEAK_PLATE_RESPONSE.NO_PEAK_AND_PLATE:
                vehicle.displayMessage = "vehicle can be driven";
                break;

            case PEAK_PLATE_RESPONSE.INVALID_PLATE_NUMBER:
                vehicle.displayMessage = "Invalid Plane Number";
                break;
            case PEAK_PLATE_RESPONSE.INVALID_DATE:
                vehicle.displayMessage = "Invalid Date";
                break;
            default:
        }

        alert("VEHICLE:" + vehicle.plateNumber + "   MESSAGE:" + vehicle.displayMessage);

        // console.log("plateNumber", this.state.plateNumber);
        // console.log("inputDate", this.state.inputDate);
        // console.log("inputTime", this.state.inputTime);
        // let completeDateString = this.state.inputDate + " " + this.state.inputTime;
        // console.log("completeDateString", completeDateString);
        //
        // //Check if date is valid
        // let DateFormat = 'YYYY-MM-DD HH:mm';
        // if (!moment(completeDateString, DateFormat, true).isValid()) {
        //     alert("Not Valid Date or Time");
        //     return
        // }
        //
        // let inputDateAndTime = moment(completeDateString);
        // console.log("inputDateAndTime", inputDateAndTime);
        //
        // //Check PlateNumber
        // let lastCharacter = this.state.plateNumber.substring(this.state.plateNumber.length - 1, this.state.plateNumber.length);
        // console.log("lastCharacter", lastCharacter);
        // if (isNaN(lastCharacter)) {
        //     alert("Not Valid Plate Number");
        //     return
        // }
        // let lastDigitPlateNumber = Number(lastCharacter);
        // console.log("lastDigit", lastDigitPlateNumber);
        //
        // // Check Time is in peak and plate hours
        // let firstDateMorning = moment(this.state.inputDate + " 07:00");
        // console.log("firstDateMorning", firstDateMorning);
        //
        // let lastDateMorning = moment(this.state.inputDate + " 09:30");
        // console.log("lastDateMorning", lastDateMorning);
        //
        // let firstDateAffternoon = moment(this.state.inputDate + " 16:00");
        // console.log("firstDateAffternoon", firstDateAffternoon);
        //
        // let lastDateAffternoon = moment(this.state.inputDate + " 19:30");
        // console.log("lastDateAffternoon", lastDateAffternoon);
        //
        // let isHourPeakPlate = false;
        //
        // if (inputDateAndTime >= firstDateMorning && inputDateAndTime <= lastDateMorning) {
        //     isHourPeakPlate = true
        // }
        //
        // if (inputDateAndTime >= firstDateAffternoon && inputDateAndTime <= lastDateAffternoon) {
        //     isHourPeakPlate = true
        // }
        // console.log("isHourPeakPlate", isHourPeakPlate);
        //
        // let weekday = inputDateAndTime.days();
        // console.log("weekday", weekday);
        //
        // // Check is Peak and Plate
        // let isPeakPlate = false;
        // switch (lastDigitPlateNumber) {
        //     case 1:
        //     case 2:
        //         if (weekday === 1 && isHourPeakPlate) {
        //             isPeakPlate = true;
        //         }
        //         break;
        //     case 3:
        //     case 4:
        //         if (weekday === 2 && isHourPeakPlate) {
        //             isPeakPlate = true;
        //         }
        //         break;
        //     case 5:
        //     case 6:
        //         if (weekday === 3 && isHourPeakPlate) {
        //             isPeakPlate = true;
        //         }
        //         break;
        //     case 7:
        //     case 8:
        //         if (weekday === 4 && isHourPeakPlate) {
        //             isPeakPlate = true;
        //         }
        //         break;
        //     case 9:
        //     case 0:
        //         if (weekday === 5 && isHourPeakPlate) {
        //             isPeakPlate = true;
        //         }
        //         break;
        //     default:
        //         isPeakPlate = false;
        // }


    }

    render() {
        return (

            <div>
                <form style={{padding: 20}} onSubmit={this._handleSubmit}>
                    <label style={{padding: 10}}>
                        plate number:
                        <input type="text"
                               name="plateNumber"
                               required
                               style={{textTransform: "uppercase"}}
                               placeholder="AAA9999"
                               minLength={6}
                               maxLength={7}
                               value={this.state.plateNumber}
                               onChange={(event) => this.setState({plateNumber: event.target.value})}
                        />
                    </label>
                    <label style={{padding: 10}}>
                        Date:
                        <input type="date"
                               required
                               name="inputDate"
                               value={this.state.inputDate}
                               onChange={(event) => this.setState({inputDate: event.target.value})}
                        />
                    </label>
                    <label style={{padding: 10}}>
                        Time:
                        <input type="time"
                               name="name"
                               required
                               value={this.state.inputTime}
                               onChange={(event) => this.setState({inputTime: event.target.value})}
                        />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>


        );
    }
}

export default PeakPlatePredictor;
