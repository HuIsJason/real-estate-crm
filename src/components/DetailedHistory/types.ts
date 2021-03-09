import { Activity } from "../ActivityTable/types";

interface DetailedHistoryProps {
    property: Property;
    toggleFavourite: (property: Property) => void;
    addActivity: (activity: Activity) => void; 
}

interface Property { 
    addrLineOne: string, 
    city: string,
    province: string,
    postalCode: string,
    favourited: boolean,
    activities: Activity[],
}
export default DetailedHistoryProps;