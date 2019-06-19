import React, { Fragment, Component } from 'react';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Material UI Components
import CircularProgress from '@material-ui/core/CircularProgress';

// Custom Components
import ImgButton from '../img-button/ImgButton.jsx';
import NewsCard from '../news-card/NewsCard.jsx';

// Services
import NewsService from './news.service.js';

// constants
import { countries } from '../../constants/countries.js';

// css
import './NewsDashboard.css';

const defaultCountry = {
    code: 'gb',
    name: 'Great Britain'
};

const defaultState = {
    selectedCountry: defaultCountry,
    newsHeadlines: [],
    isLoading: true,
    error: false
};

class NewsDashboard extends Component {

    constructor(props) {
        super(props);
        // initialize state with default values 
        this.state = defaultState;

        // Keep track of component mounted state to avoid set state on unmounted component memory leak
        this.hasMounted = false;
    }

    componentDidMount() {
        this.hasMounted = true;
        this.getNewsHeadlines();
    }

    componentWillUnmount() {
        this.hasMounted = false;
    }

    getNewsHeadlines = (country = defaultCountry) => {
  
        const onError = (error) => {
            // set error flag to true and isLoading to false to update UI
            this.stateSetter({
                newsHeadlines: [],
                isLoading: false,
                error: true
            });
        };

        const onSuccess = (data) => {
            this.stateSetter({
                newsHeadlines: data,
                isLoading: false // hide loading
            });
        };

        // set isLoading flag to true to update UI while waiting for data to render
        this.setState({ isLoading: true });

        NewsService.getHeadlines(country.code)
            .then(onSuccess)
            .catch(onError);
    };

    /**
     * Verifies that the component is mounted before setting the state
     * to avoid getting a warning for setting state on unmounted compoent
     */
    stateSetter = (stateParams) => {
        if (this.hasMounted) {
            this.setState(stateParams)
        }
    };

    selectCountry = (selectedCountryCode) => {
        const selectedCountry = countries.find((country) => country.code === selectedCountryCode);

        // update selected country
        this.stateSetter({ selectedCountry });

        // retrieve news for selected country
        this.getNewsHeadlines(selectedCountry);
    };

    renderCountriesList = () => {
        const renderCountryBtn = (country) => {
            const imgPath = require(`../../images/${country.img}`);
            const isActive = country.code === this.state.selectedCountry.code;

            return <ImgButton 
                      key={country.code}
                      image={imgPath}
                      id={country.code}
                      text={country.name}
                      onClickAction={this.selectCountry} 
                      isActive={isActive}
                    />;
        };

        return <div className="news-dashboard__countries-container"> 
            {countries.map(renderCountryBtn)} 
        </div>;
    };

    renderNewsCards = () => {
        if(!this.state.newsHeadlines.length) return <div> No headlines available</div>;

        const renderCard = (headline, index) => {
            return <NewsCard key={index}
                image={headline.urlToImage}
                title={headline.title}
                description={headline.description}
                url={headline.url}
                sourceName={headline.source.name}
                author={headline.author}
            />
        };

        const newsHeadlines = this.state.newsHeadlines.map(renderCard);

        return <div className="news-dashboard__news-card-container"> {newsHeadlines} </div>;
    };

    render() {
        const countryName = (this.state.selectedCountry && this.state.selectedCountry.name) || defaultCountry.name;

        if (this.state.error) {
            return <Typography variant="h6" color="secondary" display="block">
                 Something went wrong, please contact support at x@team.com or try again later! 
            </Typography>;
        }

        return (
            <Fragment>
                <Typography variant="h4" gutterBottom className="news-dashboard__headline">
                    Countries List 
                </Typography>
                {this.renderCountriesList()}
             
                {this.state.isLoading ? 
                   <div className="news-dashboard__loading-container">  <CircularProgress /> Loading.... </div> 
                   :
                   <div>
                        <Typography variant="h6" gutterBottom className="news-dashboard__headline">
                             News Headlines for {countryName} 
                         </Typography>
                             {this.renderNewsCards()}
                    </div>
              }
              </Fragment>
        );
    };
};

export default NewsDashboard;