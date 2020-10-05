//import { useMediaQuery } from 'react-responsive';
 
const getResponsiveDetails = () => {
    // const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    // const isBigScreen = useMediaQuery({ minDeviceWidth: 1824 })
    // const isTabletOrMobileDevice = useMediaQuery({ maxDeviceWidth: 1224 })
    // const isPortrait = useMediaQuery({ orientation: 'portrait' })
    // const isMobile = useMediaQuery({ maxWidth: 380 });
    // const isTablet = useMediaQuery({ query: '(max-width: 1224px) and (min-width: 380px)' });

 const responsiveData = {  
    isDesktopOrLaptop :true,
    isBigScreen: false,
    isTablet : false,
    isTabletOrMobileDevice  : false,
    isPortrait  : false,
    isMobile  : false
  }
  return responsiveData;
}
export default getResponsiveDetails;