
let endpointsInstance = null;

async function getEndpoints() {
    if (endpointsInstance !== null) {
        return endpointsInstance;
    }

    const default_endpoints = {
        navbar: 'static/profile/navbar.json',
        home: 'static/profile/home.json',
        social: 'static/profile/social.json',
        about: 'static/profile/about.json',
        education: 'static/profile/education.json',
        experiences: 'static/profile/experiences.json',
        projects: 'static/profile/projects.json',
        contact: 'static/profile/contact.json',
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

    const endpointKeys = Object.keys(api_endpoints);
    for (const key of endpointKeys) {
        try {
            const response = await fetch(api_endpoints[key]);
            if (!response.ok) {
                throw new Error(`API response error. Status: ${response.status}`);
            }
        } catch (error) {
            console.log(`Using default endpoint for ${key}. Error: ${error}`);
            api_endpoints[key] = default_endpoints[key];
        }
    }

    endpointsInstance = api_endpoints;
    return endpointsInstance;
}

export default getEndpoints;
