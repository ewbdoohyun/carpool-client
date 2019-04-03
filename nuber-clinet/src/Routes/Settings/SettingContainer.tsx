import React from "react";
import { Mutation, Query } from 'react-apollo';
import { GET_PLACES,USER_PROFILE } from '../../sharedQueries';
import { LOG_USER_OUT } from '../../sharedQueries.local';
import { getPlaces, userProfile } from "../../types/api"; 
import SettingPresenter from './SettingPresenter';

class MiniProfileQuery extends Query<userProfile>{}

class PlaceQuery extends Query<getPlaces>{}

class SettingContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT}>
          { logUserOut => 
          <MiniProfileQuery query={USER_PROFILE}>
            {({ data: userData ,loading: userDataLoading}) => (
              <PlaceQuery query={GET_PLACES}>
                {({data: placesData, loading: placesLoading}) => (
                  <SettingPresenter 
                    userDataLoading={userDataLoading}
                    placesLoading={placesLoading}
                    userData={userData}
                    placesData={placesData}
                    logUserOut={logUserOut}
                />
                )}
              </PlaceQuery>
              
            )}
          </MiniProfileQuery>
          }
      </Mutation>
    )
  }
}

export default SettingContainer;