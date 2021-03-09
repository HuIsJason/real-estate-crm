import React from 'react';
import PropertySelectList from './PropertySelectList/index';
import DetailedHistory from '../DetailedHistory/index';
import AddPropertyModal from './PropertySelectList/addPropertyModal';
import { Property } from './PropertySelectList/types';
import { Activity } from '../ActivityTable/types';

const properties = [
    {
       addrLineOne: '75 Terra Crescent',
       city: 'Toronto', 
       province: 'ON',
       postalCode: 'L6X6X6', 
       favourited: true,
       activities: [{ id: 1, title: 'Showing', description: '', date: '2021-02-21' }]
    },
    {
        addrLineOne: '99 Fern Blvd',
        city: 'Toronto', 
        province: 'ON',
        postalCode: 'L6X6X6', 
        favourited: false,
        activities: [{ id: 1, title: 'Follow-up', description: '', date: '2021-02-01' }] 
    },
    {
        addrLineOne: '123 John Street',
        city: 'Toronto', 
        province: 'ON',
        postalCode: 'L6X6X6',  
        favourited: true,
        activities: [{ id: 1, title: 'Phone Call w/ Client', description: '', date: '2021-01-01' }] 
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

    const addActivity = (activity: Activity) => {
    
        activity.id = selectedProperty.activities.length + 1;
        selectedProperty.activities.push(activity);
  
        // Sort by reverse chronological order
        selectedProperty.activities.sort((a, b) => {
          const aDateParts = a.date.split('-').map(part => parseInt(part));
          const aDate = new Date(aDateParts[0], aDateParts[1] - 1, aDateParts[2]);
  
          const bDateParts = b.date.split('-').map(part => parseInt(part));
          const bDate = new Date(bDateParts[0], bDateParts[1] - 1, bDateParts[2]);
  
          return aDate < bDate ? 1 : -1;
        });

        // Debug this!
        setAllProperties(allProperties);
  
    }

    return (
        <div style={{ width: "fit-content", margin: "auto"}}>
        <PropertySelectList 
        properties={allProperties} 
        selected={selectedProperty} 
        onSelect={(property) => setSelectedProperty(property)}
        onClickAdd={ () => setModalOpen(true) }/>

        <DetailedHistory property={selectedProperty} toggleFavourite={toggleFavourite} addActivity={addActivity}/>
        <AddPropertyModal open={modalOpen} onCancel={() => setModalOpen(false)} onSave={saveProperty}/>
        </div>
    )
}