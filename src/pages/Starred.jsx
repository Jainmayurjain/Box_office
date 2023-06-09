import { useQuery } from '@tanstack/react-query';
import { useStarredShows } from '../lib/useStarredShows';
import { getShowByIds } from '../api/tvmaze';
import ShowGrid from '../component/shows/ShowGrid';
import { TextCenter } from '../component/common/TextCenter.jsx';

const Starred = () => {
  const [starredShowsIds] = useStarredShows();
  const { data: starredShows, error: starredShowsError } = useQuery({
    queryKey: ['starred', starredShowsIds],
    queryFn: () =>
      getShowByIds(starredShowsIds).then(result =>
        result.map(show => ({ show }))
      ),
    refetchOnWindowFocus: false,
  });

  if (starredShows?.length === 0) {
    return <TextCenter>Starred Something and come back</TextCenter>;
  }

  if (starredShows?.length > 0) {
    // Optional chainning
    return <ShowGrid shows={starredShows} />;
  }

  if (starredShowsError) {
    return <TextCenter>Error Occured {starredShowsError.message}</TextCenter>;
  }

  return (
    <TextCenter>Starred Page, starred {starredShowsIds.length}</TextCenter>
  );
};

export default Starred;
