const Base_Url = 'https://api.tvmaze.com';
// It is reusable function
const apiGet = async queryString => {
  const response = await fetch(`${Base_Url}${queryString}`);
  const body = await response.json();

  return body;
};

export const searchForShows = query => apiGet(`/search/shows?q=${query}`);

export const searchForPeople = query => apiGet(`/search/people?q=${query}`);

export const getShowById = showId =>
  apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`);

export const getShowByIds = async showIds => {
  const promises = showIds.map(showId => apiGet(`/shows/${showId}`));

  const result = await Promise.all(promises);
  return result;
};
