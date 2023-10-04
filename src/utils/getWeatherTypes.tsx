import { SiApachestorm } from "react-icons/si";
import { FaCloudRain } from "react-icons/fa";
import { BsFillCloudRainHeavyFill } from "react-icons/bs";
import { BsSnow } from "react-icons/bs";
import { GoCloud } from "react-icons/go";
import { RxSun } from "react-icons/rx";

export const getIcon = (weather: string, size: number) => {
    switch (weather?.toLowerCase()) {
        case 'clear':
            return <RxSun size={size} />;
        case 'clouds':
            return <GoCloud size={size} />;
        case 'rain':
            return <BsFillCloudRainHeavyFill size={size} />;
        case 'snow':
            return <BsSnow size={size} />;
        case 'drizzle':
            return <FaCloudRain size={size} />;
        case 'thunderstorm':
            return <SiApachestorm size={size} />;
        default:
            return <RxSun size={size} />;
    };

}