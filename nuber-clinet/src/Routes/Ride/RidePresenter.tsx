import React from "react";
import styled from "../../typed-components";
import { getRide, userProfile } from '../../types/api';
import Button from '../../Components/Button';
import { MutationFn } from 'react-apollo';
import { Link } from 'react-router-dom';

const Container = styled.div`

`;

const Title = styled.h4`
`;

const Data = styled.span`
`;

const Img = styled.img`
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
`;

const ExtendedButton = styled(Button)`
`;

interface IProps {
  data?: getRide;
  userData?: userProfile;
  loading: boolean;
  updateRideFn: MutationFn;
}

const RidePresenter: React.SFC<IProps> = ({
 data,
 userData,
 updateRideFn 
}) => (
  <Container>
    { data && data.GetRide && data.GetRide.ride &&
      userData && userData.GetMyProfile && userData.GetMyProfile.user && 
    (
        <React.Fragment>
          <Title>Passenger</Title>
          <Passenger>
            <Img src={data.GetRide.ride.passenger.profilePhoto!} />
            <Data>{data.GetRide.ride.passenger.fullName!}</Data>
          </Passenger>
          {data.GetRide.ride.driver && (
            <React.Fragment>
              <Title>Driver</Title>
              <Passenger>
                <Img src={data.GetRide.ride.passenger.profilePhoto!} />
                <Data>{data.GetRide.ride.passenger.fullName!}</Data>
              </Passenger>
            </React.Fragment>
          )}
          <Title>From</Title>
          <Data>{data.GetRide.ride.pickUpAddress}</Data>
          <Title>To</Title>
          <Data>{data.GetRide.ride.dropOffAddress}</Data>
          <Title>Price</Title>
          <Data>{data.GetRide.ride.price}</Data>
          <Title>Distance</Title>
          <Data>{data.GetRide.ride.distance}</Data>
          <Title>Duration</Title>
          <Data>{data.GetRide.ride.duration}</Data>
          <Title>Status</Title>
          <Data>{data.GetRide.ride.status}</Data>
          <Buttons>
            { data.GetRide.ride.driver.id === userData.GetMyProfile.user.id &&
              data.GetRide.ride.status === "ONROUTE" &&  data.GetRide.ride.id &&(
                <ExtendedButton
                  value={"Finished"}
                  onClick={() =>
                    updateRideFn({
                      variables: {
                        rideId: data.GetRide.ride ? data.GetRide.ride.id : null,
                        status: "FINISHED"
                      }
                    })
                  }
                />
              )}
            {data.GetRide.ride.driver.id === userData.GetMyProfile.user.id ||
              ( data.GetRide.ride.passenger.id === userData.GetMyProfile.user.id &&
                data.GetRide.ride.status === "ACCEPTED" && (
                  <Link to={`/chat/${data.GetRide.ride.chatId}`}>
                    <ExtendedButton value={"Chat"} onClick={null} />
                  </Link>
                )
              )
            }
          </Buttons>
        </React.Fragment>
    )}
  </Container>
);

export default RidePresenter;
