import React from "react";

const DAY_MSEC = 24 * 3600 * 1000;

type TGetLocalPeriod = (strDate: string) => string;
const getlocalPeriod: TGetLocalPeriod = strDate => {

    const date = new Date(Date.parse(strDate));

    const daysAgo = (date: Date) => {
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
}

function PassedPeriod({ date }: { date: string }) {

    return (
        <p className="text text_type_main-default text_color_inactive">
            {getlocalPeriod(date)}
        </p>
    );
}
export default PassedPeriod;