import { SubscribeToMoreOptions } from "apollo-client";
import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { USER_PROFILE } from '../../sharedQueries';
import { 
  getRide, 
  // getRideVariables,  
  updateRide, 
  updateRideVariables,
  userProfile 
} from '../../types/api';
import RidePresenter from "./RidePresenter";
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from "./RideQueries";

class RideQuery extends Query<getRide>{};
class ProfileQuery extends Query<userProfile>{};
class RideUpdate extends Mutation<updateRide, updateRideVariables>{};

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps){
    super(props);
    if(!props.match.params.rideId){
      props.history.push("/");
    }
    props.match.params.rideId = parseInt(props.match.params.rideId,10);
  }
  public render() {
    const {
      match: {
        params: { rideId }
      }
    } = this.props;
    return (
      <ProfileQuery query={USER_PROFILE}>
        {({ data: userData }) => (
          <RideQuery query={GET_RIDE} variables={{ rideId }}>
            {({ data, loading, subscribeToMore }) => {
              const subscribeOptions: SubscribeToMoreOptions = {
                document: RIDE_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) =>{
                  if (!subscriptionData){
                    return prev;
                  }
                  const {
                    data: {
                      RideStatusSubscription: {status}
                    }
                  } = subscriptionData;
                  if (status === "FINISHED") {
                    window.location.href = "/";
                  }
                }
              };
                subscribeToMore(subscribeOptions);
              return (
                <RideUpdate
                  mutation={UPDATE_RIDE_STATUS}
                >
                  {updateRideFn => (
                    <RidePresenter
                      data={data}
                      userData={userData}
                      loading={loading}
                      updateRideFn={updateRideFn}
                    />
                  )}
                </RideUpdate>
              );
            }}
          </RideQuery>
        )}
      </ProfileQuery>
    );
  }
}
export default RideContainer;