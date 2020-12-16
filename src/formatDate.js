'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const resultArray = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const arrDate = date.split(oldSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        dateObj.year = arrDate[i];
        break;

      case 'DD':
        dateObj.day = arrDate[i];
        break;

      case 'MM':
        dateObj.month = arrDate[i];
        break;
    }
  }

  for (let a = 0; a < toFormat.length - 1; a++) {
    switch (toFormat[a]) {
      case 'YYYY':
        if (dateObj.year.length === 4) {
          resultArray.push(dateObj.year);
        } else if (dateObj.year < 30) {
          resultArray.push(`20${dateObj.year}`);
        } else {
          resultArray.push(`19${dateObj.year}`);
        }
        break;

      case 'YY':
        if (dateObj.year.length === 2) {
          resultArray.push(dateObj.year);
        }
        resultArray.push(dateObj.year.toString().slice(2));

        break;

      case 'DD':
        resultArray.push(dateObj.day);
        break;

      case 'MM':
        resultArray.push(dateObj.month);
        break;
    }
  }

  return (resultArray.join(newSeparator));
}

module.exports = formatDate;
