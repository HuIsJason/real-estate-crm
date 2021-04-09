import { Property, Activity } from "../../utils/types";

interface DetailedHistoryProps {
    property: Property;
    toggleFavourite: (property: Property) => void;
    addActivity: (activity: Activity) => void; 
    deleteActivity: (activity: Activity) => void; 
    updateNotes: (notes: string) => void;
    currTab: string;
    setCurrTab: (value: string) => void;
}

export default DetailedHistoryProps;