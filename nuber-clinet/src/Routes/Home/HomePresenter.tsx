import React from "react";
import { MutationFn } from 'react-apollo';
import Helmet from "react-helmet";
import Sidebar from "react-sidebar";
import AddressBar from "../../Components/AddressBar";
import Button from "../../Components/Button";
import Menu from "../../Components/Menu";
import RidePopUp from '../../Components/RidePopUp';
import styled from "../../typed-components";
import { getRides,userProfile } from '../../types/api';

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
  bottom: 250px;
`;


interface IProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  loading: boolean;
  mapRef: any;
  toAddress: string;
  onAddressSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  price?: string;
  data?: userProfile;
  requestRideFn?: MutationFn;
  acceptRideFn?: MutationFn;
  nearbyRide?: getRides;
}

const HomePresenter: React.SFC<IProps> = ({
  isMenuOpen,
  toggleMenu,
  loading,
  toAddress,
  mapRef,
  onInputChange,
  onAddressSubmit,
  price,
  data,
  requestRideFn,
  nearbyRide,
  acceptRideFn
}) => 
(
  (
    <Container>
    <Helmet>
      <title>Home | Number</title>
    </Helmet>
    <Sidebar
      sidebar={<Menu />}
      open={isMenuOpen}
      onSetOpen={toggleMenu}
      styles={{
        sidebar: {
          backgroundColor: "white",
          width: "80%",
          zIndex: "10"
        }
      }}
    >
      {!loading && <MenuButton onClick={toggleMenu}>|||</MenuButton>}
      { data && 
        data.GetMyProfile &&
        data.GetMyProfile.user &&
        !data.GetMyProfile.user.isDriving && (
        <React.Fragment>
          <AddressBar
            name={"toAddress"}
            onChange={onInputChange}
            value={toAddress}
            onBlur={null}
          />
          <ExtendedButton
            onClick={onAddressSubmit}
            disabled={toAddress === ""}
            value={price ? "Change address" : "Pick Address"}
          />              
        </React.Fragment>
      )}
      {price && (
        <RequestButton 
          onClick={requestRideFn}
          disabled={toAddress === ""}
          value={`Request Ride ($${price})`}
        />
      )}
      { nearbyRide && 
        nearbyRide.GetNearbyRide &&
        nearbyRide.GetNearbyRide.ride &&
        nearbyRide.GetNearbyRide.ride.id && 
        nearbyRide.GetNearbyRide.ride.passenger && (
        <RidePopUp
          id={nearbyRide.GetNearbyRide.ride.id}
          pickUpAddress={nearbyRide.GetNearbyRide.ride.pickUpAddress}
          dropOffAddress={nearbyRide.GetNearbyRide.ride.dropOffAddress}
          price={nearbyRide.GetNearbyRide.ride.price}
          distance={nearbyRide.GetNearbyRide.ride.distance}
          passengerName={nearbyRide.GetNearbyRide.ride.passenger.fullName!}
          passengerPhoto={nearbyRide.GetNearbyRide.ride.passenger.profilePhoto!}
          acceptRideFn={acceptRideFn}
        />
      )}      <Map ref={mapRef} />
    </Sidebar>
  </Container>)
)

export default HomePresenter;
