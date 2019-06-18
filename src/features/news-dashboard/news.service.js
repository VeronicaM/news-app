import axios from 'axios';

// api config
import config from '../../config/api.config.js';

// Services
import LoggerService from '../../services/logger.service.js';
import EndpointService from '../../services/endpoint.service.js';

// local Variables
const filename = 'news.service.js';

// get news headlines for given country from NEWS API
const getHeadlines = (country) => {

    const onSuccess = (response) => {
        if (response && response.data && response.data.articles) {
            return response.data.articles;
        }

        return onError('Wrong news headlines JSON format!');
    };

    const onError = (error) => {
        // Send error to logging monitoring system
        LoggerService.log({
            message: error,
            type: LoggerService.MESSAGE_TYPES.ERROR,
            filename
        });
    };

    // get news headlines endpoint
    const URL = EndpointService.buildURL(EndpointService.constants.NEWS_HEADLINES, { country });

    const headers = {
        headers: {
            'X-API-KEY': config.newsAPIKey //hide api token from loggers and request interceptors
        }
    };

    return axios.get(URL, headers)
        .then(onSuccess)
        .catch(onError);
};

export default {
    getHeadlines
};