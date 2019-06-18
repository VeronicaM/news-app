const endpointUrls = {
    newsHeadlines: `https://newsapi.org/v2/top-headlines?country=:country`
};

const endpointNames = {
    NEWS_HEADLINES: 'forecast'
};

const buildURL = (endpointName = '', params = {}) => {
    // return empty string if no endpoint name passed
    if (endpointName === '') return '';

    let urlWithParams = endpointUrls[endpointName];

    // replace params specified as :paramName in the endpoint URL with corresponding values
    Object.entries(params).forEach(([paramName, paramValue]) => {
        urlWithParams = urlWithParams.replace(`:${paramName}`, paramValue);
    });

    return urlWithParams;
};

export default {
    buildURL,
    constants: endpointNames
};