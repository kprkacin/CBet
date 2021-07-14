import { Grid } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card, Jumbotron } from 'react-bootstrap';
import { array } from 'yup';
import { fetchNews } from '../../../services/news/api';
import { News } from '../../../services/news/types';

export const NewsSection: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const newsData = await fetchNews();
        setNews(newsData);
      } catch (e) {
        //ignore error
      }
    })();
  }, []);

  const handleNewsClicked = useCallback((link: string) => {
    window.open(link);
  }, []);
  return (
    <Grid container spacing={4}>
      {news.map((news) => {
        return (
          <Grid item xs={12} lg={4}>
            <Card className="newsCard">
              <Card.Img variant="top" src={news.media} />
              <Card.Body>
                <Card.Title>{news.title}</Card.Title>
                <Card.Text>{news.summary}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">{news.author}</small>
                <small className="text-muted">{news.date}</small>
              </Card.Footer>
              <a
                href="#"
                onClick={() => handleNewsClicked(news.link)}
                className="stretched-link"
              ></a>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
