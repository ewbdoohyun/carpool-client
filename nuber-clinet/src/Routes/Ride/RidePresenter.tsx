import React from "react";
import { MutationFn } from 'react-apollo';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button';
import styled from "../../typed-components";
import { getRide, userProfile } from '../../types/api';

const Container = styled.div`
  padding: 40px;
`;

const Title = styled.h4`
  font-weight: 800;
  margin-top: 30px;
  margin-bottom: 10px;
  &:first-child {
    margin-top: 0;
  }
`;

const Data = styled.span`
  color: ${props => props.theme.blueColor};
`;

const Img = styled.img`
  border-radius: 50%;
  margin-right: 20px;
  max-width: 50px;
  height: 50px;
`;

const Passenger = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const Buttons = styled.div`
  margin: 30px 0px;
`;

const ExtendedButton = styled(Button)`
  margin-bottom: 30px;
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
}) =>  (
    <Container>
      { data && data.GetRide && data.GetRide.ride &&
        userData && userData.GetMyProfile && userData.GetMyProfile.user && 
        data.GetRide.ride.passenger &&
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
              { data.GetRide.ride.driver && data.GetRide.ride.driver.id === userData.GetMyProfile.user.id &&
                data.GetRide.ride.status === "ACCEPTED" && (
                  <ExtendedButton
                    value={"Picked Up"}
                    onClick={() =>
                      updateRideFn({
                        variables: {
                          rideId: data.GetRide.ride ? data.GetRide.ride.id : null,
                          status: "ONROUTE"
                        }
                      })
                    }
                  />
                )
              }
              { data.GetRide.ride.driver &&  data.GetRide.ride.driver.id === userData.GetMyProfile.user.id &&
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
              {  
                  data.GetRide.ride.status !== "REQUESTING" && (
                    <Link to={`/chat/${data.GetRide.ride.chatId}`}>
                      <ExtendedButton value={"Chat"} onClick={null} />
                    </Link>
                  )
                
              }
            </Buttons>
          </React.Fragment>
      )}
    </Container>
  );

export default RidePresenter;
