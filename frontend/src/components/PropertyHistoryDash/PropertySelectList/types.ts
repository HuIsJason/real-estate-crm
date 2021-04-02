import { Property } from '../../../utils/types'; 

interface Props { 
    properties: Property[],
    selected: Property | null,
    onSelect: (property: Property) => void;
}

interface addPropertyProps { 
    open: boolean;
    onCancel: () => void;
    onSave: (property: Property) => void;
}

export default Props;
export type { addPropertyProps };