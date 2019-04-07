import React from "react";
import Helmet from "react-helmet";
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import Place from '../../Components/Place';
import styled from '../../typed-components';
import { getPlaces,getPlaces_GetMyPlaces } from '../../types/api';

const Container = styled.div``;

const SLink = styled(Link)`
text-decoration: underline;`;

interface IProps {
  data? : getPlaces;
  loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({
  data,
  loading
}) => {
  if(data){
    const tMyPlaces: getPlaces_GetMyPlaces = data.GetMyPlaces;
    if(tMyPlaces){
      const places = tMyPlaces.places;
      return (
        <React.Fragment>
          <Helmet>
            <title>Places | Nuber</title>
          </Helmet>
          <Header title={"Places"} backTo={"/"} />
          {!loading && places && places.length === 0 && "You have no places" }
          <Container>
          {!loading &&
          places &&
          places.map(place=> (
            <Place 
              key={place!.id}
              id={place!.id}
              fav={place!.isFav}
              name={place!.name}
              address={place!.address}
            />
          ))}
          <SLink to={"/add-place"}>Add some places!</SLink>
        </Container>

        </React.Fragment>
      )
  
    }
  }
  return <div>can't load</div>;

}

export default PlacesPresenter;