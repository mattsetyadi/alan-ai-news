import React, { useEffect, useState } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

// got issues with number and our app detect as number string like four instead of 4 when open article
import wordsToNumbers from 'words-to-numbers';

import NewsCards from './components/NewsCards/NewsCards';
import useStyles from './appStyles';
import AlanLogo from './assests/alan-logo.jpg';

const alanKey =
  '4b782610e4dc299c5eebbc7afed54bf12e956eca572e1d8b807a3e2338fdd0dc/stage';

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
    <div>
      <div className={classes.logoContainer}>
        <img className={classes.alanLogo} src={AlanLogo} alt='' />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}

export default App;
