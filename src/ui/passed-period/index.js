import React from "react";
import PropTypes from 'prop-types';

const DAY_MSEC = 24 * 3600 * 1000;

const getlocalPeriod = strDate => {

    const date = new Date(Date.parse(strDate));

    const daysAgo = date => {
        const todayNum = Date.parse((new Date()).toISOString().slice(0, 10));
        const daysNum = Date.parse(date.toISOString().slice(0, 10));

        const daysPassed = (todayNum - daysNum) / DAY_MSEC;

        if (daysPassed === 0) {
            return 'Сегодня';
        } else if (daysPassed === 1) {
            return 'Вчера';
        } else if (daysPassed <= 4) {
            return `${daysPassed} дня назад`;
        } else {
            return `${daysPassed} дней назад`;
        }
    };

    const hours =
        date.getHours() > 9
            ? `${date.getHours()}`
            : `0${date.getHours()}`;

    const minutes =
        date.getMinutes() > 9
            ? `${date.getMinutes()}`
            : `0${date.getMinutes()}`;

    return `${daysAgo(date)}, ${hours}:${minutes} i-GMT+${(date.getTimezoneOffset() * -1) / 60}`;
};


function PassedPeriod({date}) {

    return (

        <p className="text text_type_main-default text_color_inactive">
            {getlocalPeriod(date)}
        </p>
    );
}


PassedPeriod.propTypes = {
    date: PropTypes.string.isRequired
}

export default PassedPeriod;