import { Activity } from "../ActivityTable/types";

interface DetailedHistoryProps {
    property: Property | null;
    toggleFavourite: (property: Property) => void;
    addActivity: (activity: Activity) => void; 
    updateNotes: (notes: string) => void;
    currTab: string;
    setCurrTab: (value: string) => void;
}

interface Property { 
    addrLineOne: string, 
    city: string,
    province: string,
    postalCode: string,
    favourited: boolean,
    activities: Activity[],
    notes: string,
}

export default DetailedHistoryProps;