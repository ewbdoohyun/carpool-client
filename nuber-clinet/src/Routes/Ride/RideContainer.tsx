import { SubscribeToMoreOptions } from "apollo-client";
import React from "react";
import { Query, Mutation } from "react-apollo";
import { 
  getRide, 
  getRideVariables,  
  updateRide, 
  updateRideVariables,
  userProfile 
} from '../../types/api';
import { RouteComponentProps } from "react-router-dom";
import RidePresenter from "./RidePresenter";
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from "./RideQueries";
import { USER_PROFILE } from '../../sharedQueries';

class RideQuery extends Query<getRide,getRideVariables>{};
class ProfileQuery extends Query<userProfile>{};
class RideUpdate extends Mutation<updateRide, updateRideVariables>{};

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps){
    super(props);
    if(!props.match.params.rideId){
      props.history.push("/");
    }
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
                updateQuery: (prev, { subscriptionData }) => {
                  if (!subscriptionData.data) {
                    return prev;
                  }
                  console.log(prev, subscriptionData);
                }
              };
              subscribeToMore(subscribeOptions);
              return (
                <RideUpdate
                  mutation={UPDATE_RIDE_STATUS}
                  refetchQueries={GET_RIDE}
                >
                  {updateRideFn => (
                    <RidePresenter
                      userData={userData}
                      loading={loading}
                      data={data}
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