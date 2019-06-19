import React from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

// CSS
import './NewsCard.css';

const NewsCard = React.memo(({ image, title, description, url, author, sourceName }) =>  {
  const goToLink = () => {
    window.open(url, '_blank');
  };

  return (
       <Card className="news-card__wrapper" onClick={goToLink}>
          <CardActionArea>
            <CardMedia
              className="news-card__media"
              component="img"
              height="140"
              image={image}
            />
            <CardContent>
              <Typography 
                gutterBottom 
                variant="h5" 
                component="h2"
              >
                {title}
            </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {description}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <div> Source: &nbsp;
              <a href={author} target="_blank" rel="noopener noreferrer">
                 {sourceName}
              </a>
            </div>
          </CardActions>
        </Card>
  );
});

NewsCard.propTypes = {
    image: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string.isRequired,
    author: PropTypes.string,
    sourceName: PropTypes.string.isRequired  
};

NewsCard.defaultProps = {
  description: 'N/A',
  image: require('../../images/img__404.jpg') // 404
};

export default NewsCard;
