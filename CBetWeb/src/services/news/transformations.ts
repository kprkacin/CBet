import { dateToFormatedString } from '../bets/helpers';
import { News } from './types';

export const tranformNews = (res: any): News => {
  return {
    author: res.author,
    link: res.link,
    media: res.media,
    date: dateToFormatedString(res.published_date) || '',
    summary: res.summary,
    title: res.title,
  };
};
