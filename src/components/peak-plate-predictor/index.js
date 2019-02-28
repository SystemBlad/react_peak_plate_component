import React, {Component} from 'react';
import moment from 'moment'

class PeakPlatePredictor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plateNumber: "",
            inputDate: new Date().toISOString().substr(0, 10),
            inputTime: new Date().toTimeString().substr(0, 5),
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }


    _handleSubmit(event) {
        event.preventDefault();
        console.log("plateNumber", this.state.plateNumber);
        console.log("inputDate", this.state.inputDate);
        console.log("inputTime", this.state.inputTime);
        let completeDateString = this.state.inputDate + " " + this.state.inputTime;
        console.log("completeDateString", completeDateString);

        //Check if date is valid
        let DateFormat = 'YYYY-MM-DD HH:mm';
        if (!moment(completeDateString, DateFormat, true).isValid()) {
            alert("Not Valid Date or Time");
            return
        }

        let inputDateAndTime = moment(completeDateString);
        console.log("inputDateAndTime", inputDateAndTime);

        //Check PlateNumber
        let lastCharacter = this.state.plateNumber.substring(this.state.plateNumber.length - 1, this.state.plateNumber.length);
        console.log("lastCharacter", lastCharacter);
        if (isNaN(lastCharacter)) {
            alert("Not Valid Plate Number");
            return
        }
        let lastDigitPlateNumber = Number(lastCharacter);
        console.log("lastDigit", lastDigitPlateNumber);

        // Check Time is in peak and plate hours
        let firstDateMorning = moment(this.state.inputDate + " 07:00");
        console.log("firstDateMorning", firstDateMorning);

        let lastDateMorning = moment(this.state.inputDate + " 09:30");
        console.log("lastDateMorning", lastDateMorning);

        let firstDateAffternoon = moment(this.state.inputDate + " 16:00");
        console.log("firstDateAffternoon", firstDateAffternoon);

        let lastDateAffternoon = moment(this.state.inputDate + " 19:30");
        console.log("lastDateAffternoon", lastDateAffternoon);

        let isHourPeakPlate = false;

        if (inputDateAndTime >= firstDateMorning && inputDateAndTime <= lastDateMorning) {
            isHourPeakPlate = true
        }

        if (inputDateAndTime >= firstDateAffternoon && inputDateAndTime <= lastDateAffternoon) {
            isHourPeakPlate = true
        }
        console.log("isHourPeakPlate", isHourPeakPlate);

        let weekday = inputDateAndTime.days();
        console.log("weekday", weekday);

        // Check is Peak and Plate
        let isPeakPlate = false;
        switch (lastDigitPlateNumber) {
            case 1:
            case 2:
                if (weekday === 1 && isHourPeakPlate){
                    isPeakPlate = true;
                }
                break;
            case 3:
            case 4:
                if (weekday === 2 && isHourPeakPlate){
                    isPeakPlate = true;
                }
                break;
            case 5:
            case 6:
                if (weekday === 3 && isHourPeakPlate){
                    isPeakPlate = true;
                }
                break;
            case 7:
            case 8:
                if (weekday === 4 && isHourPeakPlate){
                    isPeakPlate = true;
                }
                break;
            case 9:
            case 0:
                if (weekday === 5 && isHourPeakPlate){
                    isPeakPlate = true;
                }
                break;
            default:
                isPeakPlate = false;
        }

        console.log("isPeakPlate", isPeakPlate);
        if(isPeakPlate){
            alert("You cannot drive the car");
        }else{
            alert("You can drive the car");
        }

    };

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