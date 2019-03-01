// @flow
import React from 'react';
import {PEAK_PLATE_RESPONSE} from "./enums";
import {checkIsPeakAndPlate} from "./helpers";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

export interface Props {
    classes?: any;
}

export interface State {
    plateNumber: string,
    inputDate
        :
        string,
    inputTime
        :
        string,
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
    }


    render() {
        const {classes} = this.props;
        return (
            <main className={classes.main}>
                <CssBaseline/>
                <Paper className={classes.paper}>
                    <form className={classes.form} onSubmit={this._handleSubmit}>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel>Plate Number</InputLabel>
                            <Input type="text"
                                   name="plateNumber"
                                   required
                                   style={{textTransform: "uppercase"}}
                                   placeholder="AAA9999"
                                   minLength={6}
                                   maxLength={7}
                                   value={this.state.plateNumber}
                                   onChange={(event) => this.setState({plateNumber: event.target.value})}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel>Date</InputLabel>
                            <Input type="date"
                                   required
                                   name="inputDate"
                                   value={this.state.inputDate}
                                   onChange={(event) => this.setState({inputDate: event.target.value})}
                            />
                        </FormControl>
                        <FormControl margin="normal" required fullWidth>
                            <InputLabel>Time</InputLabel>
                            <Input type="time"
                                   name="name"
                                   required
                                   value={this.state.inputTime}
                                   onChange={(event) => this.setState({inputTime: event.target.value})}
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </form>
                </Paper>
            </main>

        );
    }
}

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

// export default PeakPlatePredictor;
export default withStyles(styles)(PeakPlatePredictor);
