import React from "react";
import { RouteChildrenProps } from 'react-router';
import EditAccountPresenter from './EditAccountPresenter';

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

interface IProps extends RouteChildrenProps<any>{}

class EditAccountContainer extends React.Component<IProps,IState>{
  public state = {
    email: "",
    firstName: "",
    lastName: "",
    profilePhoto: ""
  };

  public render(){
    const { email, firstName, lastName, profilePhoto } = this.state;
    return (
      <EditAccountPresenter
        email={email}
        firstName={firstName}
        lastName={lastName}
        profilePhoto={profilePhoto}
        onInputChange={this.onInputChange}
        loading={false}
        // onSubmit={update}
      />
    );
 
  }
  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
      const {
        target: { name, value }
      } = event;
      this.setState({
        [name]: value
      } as any);
  }
}


export default EditAccountContainer;