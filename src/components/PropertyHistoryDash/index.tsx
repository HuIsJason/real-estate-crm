import React from 'react';
import PropertySelectList from './PropertySelectList/index';
import DetailedHistory from '../DetailedHistory/index';
import AddPropertyModal from './PropertySelectList/addPropertyModal';
import { Property } from './PropertySelectList/types';

const properties = [
    {
       addrLineOne: '75 Terra Crescent',
       city: 'Toronto', 
       province: 'ON',
       postalCode: 'L6X6X6', 
       favourited: true 
    },
    {
        addrLineOne: '99 Fern Blvd',
        city: 'Toronto', 
        province: 'ON',
        postalCode: 'L6X6X6', 
        favourited: false 
    },
    {
        addrLineOne: '123 John Street',
        city: 'Toronto', 
        province: 'ON',
        postalCode: 'L6X6X6',  
        favourited: true
    }
]

export default function PropertyHistoryDash() {

    const [selectedProperty, setSelectedProperty] = React.useState(properties[0]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [allProperties, setAllProperties] = React.useState(properties);

    const saveProperty = (property: Property) => {
        allProperties.push(property);
        setAllProperties(allProperties);
        setModalOpen(false);
    }

    const toggleFavourite = (property: Property) => {

        const updatedProperties = allProperties.map(p => {
            if (p == property) {
                property.favourited = !property.favourited;
                return property;
            }
            return p;
        })

        setAllProperties(updatedProperties);
    }

    return (
        <div style={{ width: "fit-content", margin: "auto"}}>
        <PropertySelectList 
        properties={allProperties} 
        selected={selectedProperty} 
        onSelect={(property) => setSelectedProperty(property)}
        onClickAdd={ () => setModalOpen(true) }/>

        <DetailedHistory property={selectedProperty} toggleFavourite={toggleFavourite}/>
        <AddPropertyModal open={modalOpen} onCancel={() => setModalOpen(false)} onSave={saveProperty}/>
        </div>
    )
}