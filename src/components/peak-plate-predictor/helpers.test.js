import {checkIsPeakAndPlate} from "./helpers";
import {PEAK_PLATE_RESPONSE} from "./enums";

// IS_PEAK_AND_PLATE: 0,
// NO_PEAK_AND_PLATE: 1,
// INVALID_DATE: 2,
// INVALID_PLATE_NUMBER: 3,

test('checkIsPeakAndPlate funtion test', () => {
    // INVALID_DATE
    expect(checkIsPeakAndPlate("", "","")).toBe(PEAK_PLATE_RESPONSE.INVALID_DATE);

    // INVALID_PLATE_NUMBER
    expect(checkIsPeakAndPlate("", "2018-02-28","07:00")).toBe(PEAK_PLATE_RESPONSE.INVALID_PLATE_NUMBER);

    // INVALID_PLATE_NUMBER
    expect(checkIsPeakAndPlate("TTTT", "2018-02-28","07:00")).toBe(PEAK_PLATE_RESPONSE.INVALID_PLATE_NUMBER);

    // INVALID_PLATE_NUMBER
    expect(checkIsPeakAndPlate("TTTT9", "2018-02-28","07:00")).toBe(PEAK_PLATE_RESPONSE.INVALID_PLATE_NUMBER);

    // NO_PEAK_AND_PLATE
    expect(checkIsPeakAndPlate("PFH1553", "2019-02-28","07:00")).toBe(PEAK_PLATE_RESPONSE.NO_PEAK_AND_PLATE);

    // IS_PEAK_AND_PLATE
    expect(checkIsPeakAndPlate("PFH1557", "2019-02-28","07:00")).toBe(PEAK_PLATE_RESPONSE.IS_PEAK_AND_PLATE);

    // NO_PEAK_AND_PLATE
    expect(checkIsPeakAndPlate("PFH1557", "2019-02-28","06:59")).toBe(PEAK_PLATE_RESPONSE.NO_PEAK_AND_PLATE);

    // IS_PEAK_AND_PLATE
    expect(checkIsPeakAndPlate("PFH1558", "2019-02-28","16:00")).toBe(PEAK_PLATE_RESPONSE.IS_PEAK_AND_PLATE);

    // NO_PEAK_AND_PLATE
    expect(checkIsPeakAndPlate("PFH1558", "2019-02-28","19:31")).toBe(PEAK_PLATE_RESPONSE.NO_PEAK_AND_PLATE);

    // IS_PEAK_AND_PLATE
    expect(checkIsPeakAndPlate("PFH1553", "2019-02-26","07:00")).toBe(PEAK_PLATE_RESPONSE.IS_PEAK_AND_PLATE);
});

