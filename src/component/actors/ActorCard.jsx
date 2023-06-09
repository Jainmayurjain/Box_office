import { SearchCard, SearchImgWrapper } from '../common/SearchCard';

const ActorCard = ({ name, country, birthday, deathday, gender, image }) => {
  return (
    <SearchCard>
      <SearchImgWrapper>
        <img src={image} alt={name} />
      </SearchImgWrapper>
      <h1>
        {name} {Boolean(gender) && `(${gender})`}
      </h1>
      <p>{country ? `Comes from ${country}` : 'Unknown Country'}</p>
      {Boolean(birthday) && <p>Born {birthday}</p>}
      <p>{deathday ? `Died ${deathday}` : 'ALive'}</p>
    </SearchCard>
  );
};

export default ActorCard;
