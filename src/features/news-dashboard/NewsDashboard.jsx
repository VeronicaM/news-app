import React, { Fragment, Component } from 'react';

// Material UI Components
import Typography from '@material-ui/core/Typography';

// Material UI Components
import CircularProgress from '@material-ui/core/CircularProgress';

// Services
import NewsService from './news.service.js';

// constants
import { countries } from '../../constants/countries.js';

const HEADLINES_MAX_COUNT = 5;

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
        debugger;
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
     *    Verifies that the component is mounted before setting the state
     *    to avoid getting a warning for setting state on unmounted compoent
     */
    stateSetter = (stateParams) => {
        if (this.hasMounted) {
            this.setState(stateParams)
        }
    };

    selectCountry = (event) => {
        event.preventDefault();
        const selectedCountryCode = event.target.attributes.id.nodeValue;
        const selectedCountry = countries.find((country) => country.code === selectedCountryCode);

        // update selected country
        this.stateSetter({ selectedCountry });

        // retrieve news for selected country
        this.getNewsHeadlines(selectedCountry);
    };

    render() {
        const renderNewsHeadlines = this.state.newsHeadlines.slice(0, HEADLINES_MAX_COUNT).map((headline, index) => {
            return <div key={index}> {headline.title} </div>;
        });

        const countriesList = countries.map((country) => {
            return <li key={country.code} id={country.code} onClick={this.selectCountry}> {country.name} </li>;
        });

        const countryName = (this.state.selectedCountry && this.state.selectedCountry.name) || defaultCountry.name;

        if (this.state.isLoading) {
            return <div className="loading-container">  <CircularProgress /> Loading.... </div>;
        }

        if (this.state.error) {
            return <Typography variant="h6" color="secondary" display="block">
                 Something went wrong, please contact support at x@team.com or try again later! 
            </Typography>;
        }

        return (
            <Fragment>
                <Typography variant="h4" gutterBottom>
                    Countries List 
                </Typography>
                <ul>
                  {countriesList}
                </ul>
                 <Typography variant="h6" gutterBottom>
                     News Headlines for {countryName} 
                 </Typography>
                  {renderNewsHeadlines}
              </Fragment>
        );
    };
};

export default NewsDashboard;
