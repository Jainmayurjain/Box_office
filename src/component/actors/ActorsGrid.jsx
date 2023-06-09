import ActorCard from './ActorCard';
import { FlexGrid } from '../common/FlexGrid';

const ActorsGrid = ({ actors }) => {
  return (
    <FlexGrid>
      {actors.map(data => (
        <ActorCard
          key={data.person.id}
          name={data.person.name}
          country={data.person.country ? data.person.country.name : 'Null'}
          birthday={data.person.birthday}
          deathday={data.person.deathday}
          gender={data.person.gender}
          image={
            data.person.image ? data.person.image.medium : 'not-found-image.png'
          }
        />
        // <div key={data.show.id}>{data.show.name}</div>
      ))}
    </FlexGrid>
  );
};

export default ActorsGrid;
