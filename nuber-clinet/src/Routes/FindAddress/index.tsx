import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from './FindAddressContainer';

export default GoogleApiWrapper({
  apiKey: "AIzaSyCNJGfHyF_ccYOgiFMHe2N53yqA-lfP44k"
})(FindAddressContainer);