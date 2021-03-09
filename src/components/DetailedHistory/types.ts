interface DetailedHistoryProps {
    property: Property;
    toggleFavourite: (property: Property) => void;
}

interface Property { 
    addrLineOne: string, 
    city: string,
    province: string,
    postalCode: string,
    favourited: boolean
}
export default DetailedHistoryProps;