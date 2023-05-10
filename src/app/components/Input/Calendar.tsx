// @flow 


import {DateRange, RangeKeyDict,Range} from "react-date-range";
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
interface CalendarProps  {
    value:Range;
    onChange:(value:RangeKeyDict)=>void;
    disabledDates?:Date[]
};
export const Calendar :React.FC<CalendarProps> = ({
    value,
    onChange,
    disabledDates
                                                }) => {
    console.log(disabledDates)
    return (
        // <DateRange
        //
        //     ranges={[value]}
        //     date={new Date}
        //     onChange={onChange}
        //     direction="vertical"
        //     showDateDisplay={false}
        //     minDate={new Date()}
        //     disabledDates={disabledDates}
        // />

    <DateRange
        rangeColors={["#f43f5e"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
    />

    );
};