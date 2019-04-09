import React from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from './FindAddressPresenter';

interface IState {
  lat: number;
  lng: number;
}

class FindAddressContainer extends React.Component<any,IState>{
  public mapRef: any;
  public map: google.maps.Map;

  constructor(props){
    super(props);
    this.mapRef = React.createRef();
  }

  public componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      this.handleGeoSucces,
      this.handleGeoError
      );
  }

  public handleGeoSucces = (position: Position) => {
    const {
      coords: {latitude, longitude} 
    } =  position;
    this.setState({
      lat: latitude,
      lng: longitude
    })
    this.loadMap(latitude,longitude);
  };

  public handleGeoError = () => {
    console.log("No loacation");
  }

  public loadMap = (lat, lng) => {
    const { google } = this.props;
    const maps = google.maps;
    const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
    const mapConfig: google.maps.MapOptions ={
      center:{
        lat,
        lng        
      },
      disableDefaultUI: false,
      zoom:11,

    };
    this.map = new maps.Map(mapNode,mapConfig);
    this.map.addListener("dragend",this.handleDragEnd)
  }
  
  public handleDragEnd = () => {
    const newCenter = this.map.getCenter();
    const lat = newCenter.lat();
    const lng = newCenter.lng();
    this.setState({
      lat,
      lng
    })
  }

  public render(){
    // console.log(this.props);
    return <FindAddressPresenter mapRef={this.mapRef}/>
  }
}

export default FindAddressContainer;