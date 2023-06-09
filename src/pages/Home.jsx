import { useState, useReducer } from 'react';
import { searchForShows, searchForPeople } from '../api/tvmaze';
import SearchForm from '../component/SearchForm';
import ShowGrid from '../component/shows/ShowGrid';
import ActorsGrid from '../component/actors/ActorsGrid';
import { useQuery } from '@tanstack/react-query';
import { TextCenter } from '../component/common/TextCenter';

const reduceFn = (currentCounter, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return currentCounter + 1;
    case 'DECREMENT':
      return currentCounter - 1;
    case 'RESET':
      return 0;
    case 'SET_VALUE':
      return action.newCounterValue;
  }
  return 0;
};
const Home = () => {
  const [filter, setFilter] = useState(null); // filter is, 1 query we write to search, 2 option like actor or movie
  //If not importing library we have to write React.useState otherwise simply write useState

  const [counter, dispatch] = useReducer(reduceFn, 0);
  const onIncrement = () => {
    dispatch({ type: 'INCREMENT' });
  };
  const onDecrement = () => {
    dispatch({ type: 'DECREMENT' });
  };
  const onReset = () => {
    dispatch({ type: 'RESET' });
  };
  const onSetToValue = () => {
    dispatch({ type: 'SET_VALUE', newCounterValue: 500 });
  };

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),
    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  //const [apiData, setApiData] = useState(null); //We can't assign null here because at start it won't work with map method
  //const [apiDataError, setApiDataError] = useState(null);

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });
    // try {
    //   setApiDataError(null);

    //   let result;
    //   if (searchOption === 'shows') {
    //     result = await searchForShows(q);
    //   } else {
    //     result = await searchForPeople(q);
    //   }
    //   setApiData(result);
    // } catch (error) {
    //   setApiDataError(error);
    // }
    // const response = await fetch(
    //   `https://api.tvmaze.com/search/shows?q=${searchStr}`
    // );
    // const body = await response.json();
    // console.log(body);
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error Occured{apiDataError.message}</TextCenter>;
    }

    if (apiData?.length === 0) {
      return <TextCenter>No results</TextCenter>;
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }

    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />
      <div>Counter: {counter}</div>
      <button type="button" onClick={onIncrement}>
        Increment
      </button>
      <button type="button" onClick={onDecrement}>
        Decrement
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onSetToValue}>
        Set to 500
      </button>

      <div>{renderApiData()}</div>
    </div>
  );
};
export default Home;
