import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { Typography } from '@material-ui/core';

// got issues with number and our app detect as number string like four instead of 4 when open article
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import Navbar from './components/Navbar/Navbar';
import useStyles from './appStyles';

// const alanKey = Your Alan Key

// const alanKey = process.env.REACT_APP_ALAN_KEY;

function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  // if active articles is 0 so it will in front 1 step from actual article
  // it will always reset to 0 or number articles so we need to set active article to -1 every time we fetch articles

  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === 'open') {
          // its like alan heard for => find the closest match (four) => words to numbers parse it to (4)
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > articles.length) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }

          // window.open(articles[number].url, '_blank');
        }
      },
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className={classes.toolbar} />
      <div>
        <div className={classes.logoContainer}>
          {newsArticles.length ? (
            <div className={classes.infoContainer}>
              <div className={classes.card}>
                <Typography variant='h6' component='h2'>
                  Voice intructions, Try saying: <br />
                  <br />
                  Open article number [4]
                  <br />
                  Read me the articles
                  <br />
                  Go back (To Homepage)
                </Typography>
              </div>
            </div>
          ) : (
            <>
              {/* <img className={classes.alanLogo} src={AlanLogo} alt='' /> */}
              <div className={classes.infoContainer}>
                <div className={classes.card}>
                  <Typography variant='h6' component='h2'>
                    Voice intructions, Click alan button
                    <br />
                    and try saying: <br />
                    <br />
                    - What is this app do? Jusk ask
                    <br />
                    - You can do small talk
                    <br />- You can read all the instructions below
                  </Typography>
                </div>
              </div>
            </>
          )}
        </div>
        <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      </div>
    </>
  );
}

export default App;
