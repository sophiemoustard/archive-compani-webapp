import moment from '@helpers/moment';
import { formatQuantity } from '@helpers/utils';

export const dateDiff = (newerDate, olderDate) => new Date(newerDate) - new Date(olderDate);

export const formatDateDiff = (durationInMilliseconds) => {
  const absoluteDuration = Math.abs(durationInMilliseconds);

  if (absoluteDuration < 1000 * 60 * 60 * 24) {
    const hours = parseInt(Math.floor(absoluteDuration / 1000 / 60 / 60), 10);

    return `${durationInMilliseconds < 0 ? 'dans ' : ''}${formatQuantity('heure', hours)}`;
  }
  if (absoluteDuration < 1000 * 60 * 60 * 24 * 30) {
    const days = parseInt(Math.floor(absoluteDuration / 1000 / 60 / 60 / 24), 10);

    return `${durationInMilliseconds < 0 ? 'dans ' : ''}${formatQuantity('jour', days)}`;
  }
  if (absoluteDuration < 1000 * 60 * 60 * 24 * 365) {
    const months = parseInt(Math.floor(absoluteDuration / 1000 / 60 / 60 / 24 / 30), 10);

    return `${durationInMilliseconds < 0 ? 'dans ' : ''}${months} mois`;
  }

  const years = parseInt(Math.floor(absoluteDuration / 1000 / 60 / 60 / 24 / 365), 10);

  return `${durationInMilliseconds < 0 ? 'dans ' : ''}${formatQuantity('an', years)}`;
};

export const isBetweenOrEqual = (date, min, max) => new Date(date) <= new Date(max) && new Date(date) >= new Date(min);

export const getStartOfDay = date => new Date(date.getFullYear(), date.getMonth(), date.getDate());

export const getEndOfDay = date => new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

export const ascendingSort = (a, b) => {
  if (moment(a).isAfter(b)) return 1;
  if (moment(a).isBefore(b)) return -1;
  return 0;
};

export const descendingSort = (a, b) => {
  if (moment(a).isAfter(b)) return -1;
  if (moment(a).isBefore(b)) return 1;
  return 0;
};

export const descendingSortArray = (array, key) => [...array].sort((a, b) => descendingSort(a[key], b[key]));

export const formatDate = (value) => {
  if (!value) return '';

  const date = new Date(value).getDate() < 10 ? `0${new Date(value).getDate()}` : new Date(value).getDate();
  const month = new Date(value).getMonth() + 1;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${date}/${formattedMonth}/${new Date(value).getFullYear()}`;
};

export const addDays = (value, days) => {
  const date = new Date(value);

  return date.setDate(date.getDate() + days);
};

export const isBefore = (date1, date2) => new Date(date1) < new Date(date2);

export const isSameOrBefore = (date1, date2) => new Date(date1) <= new Date(date2);

export const isAfter = (date1, date2) => new Date(date1) > new Date(date2);

export const isSameOrAfter = (date1, date2) => new Date(date1) >= new Date(date2);

export const formatHours = (value, digits = 2) => {
  if (!value) return '0,00h';
  return `${parseFloat(value).toFixed(digits).replace('.', ',')}h`;
};

export const formatHoursWithMinutes = date => `${moment(date).hours()}h${moment(date).format('mm')}`;

export const formatDateAndHours = (dates) => {
  const date = moment(dates.startDate).format('DD MMMM');

  return `${date} (${dates.startHour.replace(':', 'h')} - ${dates.endHour.replace(':', 'h')})`;
};
