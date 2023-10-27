import Logo from "../source/logoNav2.png"
import { Image } from 'react-native'

function LogoTitle() {
    return (
      <Image
        style={{ width: 180, height: 50, marginHorizontal: 40}}
        source={Logo}  
      />
    );
  }
  export default LogoTitle;