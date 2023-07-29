const default_endpoints = {
    navbar: 'static/profile/navbar_data.json',
    home: 'static/profile/home_data.json',
    social: 'static/profile/social_data.json',
    about: 'static/profile/about_data.json',
    education: 'static/profile/education_data.json',
    experiences: 'static/profile/experiences_data.json',
    projects: 'static/profile/projects_data.json',
    contact: 'static/profile/contact_data.json',
};

const api_endpoints = {
    navbar: 'https://btschwartz.com/api/v1/portfolio/navbar/',
    home: 'https://btschwartz.com/api/v1/portfolio/home/',
    social: 'https://btschwartz.com/api/v1/portfolio/social/',
    about: 'https://btschwartz.com/api/v1/portfolio/about/',
    education: 'https://btschwartz.com/api/v1/portfolio/education/',
    experiences: 'https://btschwartz.com/api/v1/portfolio/experiences/',
    projects: 'https://btschwartz.com/api/v1/portfolio/projects/',
    contact: 'https://btschwartz.com/api/v1/portfolio/contact/',
};

const cache = {};

async function getEndpoint(key) {
    // if the endpoint was previously fetched and stored, return it
    if (cache[key]) {
        return cache[key];
    }

    // validate key
    if (!api_endpoints[key]) {
        throw new Error(`Invalid endpoint key: ${key}`);
    }

    // fetch the endpoint
    try {
        const response = await fetch(api_endpoints[key]);
        if (!response.ok) {
            throw new Error(`API response error. Status: ${response.status}`);
        }

        cache[key] = api_endpoints[key];  // store the valid endpoint in cache
    } catch (error) {
        console.log(`Using default endpoint for ${key}. Error: ${error}`);
        cache[key] = default_endpoints[key];  // store the default endpoint in cache
    }

    return cache[key];
}

export default getEndpoint;
