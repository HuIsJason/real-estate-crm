import React, { useEffect } from 'react';
import PropertySelectList from './PropertySelectList/index';
import DetailedHistory from '../DetailedHistory/index';
import AddPropertyModal from './PropertySelectList/addPropertyModal';
import { Property } from '../../utils/types';
import { Activity } from '../ActivityTable/types';
import Props from './types'; 
import ConfirmationModal from '../ConfirmationModal';
import { makeStyles, Theme, Typography } from '@material-ui/core';

import send from '../../requests/request';

const properties:Property[] = [
    {
        _id: "123",
       address: '75 Terra Crescent',
       city: 'Toronto', 
       province: 'ON',
       postalCode: 'L6X6X6', 
       favourited: true,
       activities: [{ _id: "1", title: 'Showing', description: '', date: '2021-02-21' }],
       notes: 'Really liked this house. Should follow up in a week.',
    },
    {
        _id: "234",
        address: '99 Fern Blvd',
        city: 'Toronto', 
        province: 'ON',
        postalCode: 'L6X6X6', 
        favourited: false,
        activities: [{ _id: "1", title: 'Follow-up', description: '', date: '2021-02-01' }],
        notes: 'Not too sure if this is the best option. Lots of renovation required. Contact contractor for estimates!',
    },
    {
        _id: "5674",
        address: '123 John Street',
        city: 'Toronto', 
        province: 'ON',
        postalCode: 'L6X6X6',  
        favourited: true,
        activities: [{ _id: "1", title: 'Phone Call w/ Client', description: '', date: '2021-01-01' }],
        notes: '',
    }
]

const dummyProperty: Property = {
    _id: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    favourited: false,
    activities: [],
    notes: "",
}

const dummyPropertiesList: Property[] = [];

const ProjectHistory: React.FC<Props> = ({ projectId }: Props) => {
    const classes = useStyles();
    
    const [selectedProperty, setSelectedProperty] = React.useState(dummyProperty);
    const [modalOpen, setModalOpen] = React.useState(0);

    // TODO: Get a list of all properties (w/ detailed info) for this project from server
    const [allProperties, setAllProperties] = React.useState(dummyPropertiesList);

    const [displayedProperties, setDisplayedProperties] = React.useState(dummyPropertiesList);
    const [currTab, setCurrTab] = React.useState('activity');
    const [showFav, setShowFav] = React.useState(false);

    useEffect(() => {
        // TODO: Get a list of all properties (w/ detailed info) for this project from server
        send('getAllProperties', {}, `/${projectId}`)
        .then((response ) => response.json())
        .then(json => {
            const { properties } = json;
            setAllProperties(properties);
            setDisplayedProperties(properties);
            setSelectedProperty(properties[0] || null);
        });
    }, []);

    const saveProperty = async(property: Property) => {
        // TODO: send request to server to add a new property to this project
        send("addProperty", property, `/${projectId}`)
        .then(response => {
            if (response.status === 201) {
                console.log("Property was saved.");
                return response.json();
                // allProperties.push(property);
                // setAllProperties(prevProperties => [...prevProperties, property]);
                // displayedProperties.push(property);
                // setDisplayedProperties(prevProperties => [...prevProperties, property]);
            } else {
                console.log(`Property was not saved... ${response.status}`);
                // throw error
            }
        })
        .then(property => {
            setAllProperties(prevProperties => [...prevProperties, property]);
            setDisplayedProperties(prevProperties => [...prevProperties, property]);
        });
        
        setModalOpen(0);
    }

    const toggleFavourite = (property: Property) => {

        const req_content = [{ op: "update", field: "favourited", value: !property.favourited }]
        send('updateProperty', req_content, `/${projectId}/${property._id}`)
        .then((response) => {
            if (response.status === 200) {
                const updatedProperties = allProperties.map(p => {
                    if (p === property) {
                        property.favourited = !property.favourited;
                        return property;
                    }
                    return p;
                })
        
                setAllProperties(updatedProperties);

            }

        }); 
    }

    const addActivity = (activity: Activity) => {
    
        // activity.id = selectedProperty.activities.length + 1;
        // TODO: send request to server to add <activity> to <selectedProperty>'s activity list
        send("addActivity", activity, `/${projectId}/${selectedProperty._id}`)
        .then((response) => {
            if (response.status === 201) {
                console.log("New activity added");
                return response.json();

                // Sort by reverse chronological order
                // TODO: update Date object??
                // selectedProperty.activities.sort((a, b) => {
                //     const aDateParts = a.date.split('-').map(part => parseInt(part));
                //     const aDate = new Date(aDateParts[0], aDateParts[1] - 1, aDateParts[2]);
            
                //     const bDateParts = b.date.split('-').map(part => parseInt(part));
                //     const bDate = new Date(bDateParts[0], bDateParts[1] - 1, bDateParts[2]);
            
                //     return aDate < bDate ? 1 : -1;
                // });
   
            } else {
                console.log(`Activity not added... Error ${response.status}`);
            }
        })
        .then(json => {
            const { activity, property } = json;
            
            const updatedProperties = allProperties.map( property => {
                if (property._id === selectedProperty._id) {
                    property.activities.push(activity);
                }
                return property;
            });
            const updatedDisplay = showFav ? updatedProperties.filter(property => property.favourited) : updatedProperties;
            const updatedSelectedProperty = updatedProperties.filter( property => property._id === selectedProperty._id)[0];

            setSelectedProperty(updatedSelectedProperty);
            setAllProperties(updatedProperties);
            setDisplayedProperties(updatedDisplay);
       
        });
  
    }

    const updateNotes = (notes: string) => {
        // TODO: send request to server to update the notes for <selectedProperty>
        const req_content = [{ op: "update", field: "notes", value: notes }]
        send('updateProperty', req_content, `/${projectId}/${selectedProperty._id}`)
        .then((response) => {
            if (response.status === 200) {
                selectedProperty.notes = notes;
                setSelectedProperty(selectedProperty);
                setAllProperties(allProperties);

            }

        }); 
        
    }

    const handleSelect = (property: Property) => {
        setCurrTab('activity');
        setSelectedProperty(property);
    }

    const deleteSelectedProperty = () => {

        // TODO: send request to server to delete <selectedProperty> and
        // get an updated list of the remaining properties
        send("deleteProperty", {}, `/${projectId}/${selectedProperty._id}`)
        .then(response => {
            if (response.status === 200) {

                const updatedProperties = allProperties.filter(property => property !== selectedProperty);
                setAllProperties(updatedProperties);

                const updatedDisplay = displayedProperties.filter(property => property !== selectedProperty);
                setDisplayedProperties(updatedDisplay);

                setSelectedProperty(updatedDisplay[0] || null);
                
            } else {
                console.log(`Property not deleted... ${response.status}`);
            }
        });
        setModalOpen(0);

    }

    const filterFavourites = () => {
        const newDisplay = allProperties.filter(property => property.favourited);
        setDisplayedProperties(newDisplay);
        setSelectedProperty(newDisplay[0] || null);
        setCurrTab('activity');
        setShowFav(true);
    }

    const showAll = () => {
        setDisplayedProperties(allProperties); 
        setShowFav(false);
    }

    return (
        <div className={classes.main}>
            <div className={classes.root}>
                <PropertySelectList 
                properties={displayedProperties} 
                selected={selectedProperty} 
                onSelect={handleSelect} />

                <div className={classes.btnContainer}>
                    <button onClick={() => setModalOpen(1)} className={classes.clearBtn}> <Typography variant="button">+ Add Property</Typography> </button>
                    {(displayedProperties.length > 0 && selectedProperty !== null) ? (<button onClick={() => setModalOpen(2)} className={classes.clearBtn}> <Typography variant="button">Delete Property </Typography> </button>) : null}
                    {showFav ? <button onClick={() => showAll()} className={classes.clearBtn}> <Typography variant="button">Show All</Typography> </button>
                    : <button onClick={() => filterFavourites()} className={classes.clearBtn}> <Typography variant="button">Show Favourites</Typography> </button>}
                </div>
            </div>

        <DetailedHistory currTab={currTab} setCurrTab={(value) => setCurrTab(value)}
        property={selectedProperty} toggleFavourite={toggleFavourite} addActivity={addActivity} updateNotes={updateNotes} />
        <AddPropertyModal open={modalOpen === 1} onCancel={() => setModalOpen(0)} onSave={saveProperty}/>
        <ConfirmationModal open={modalOpen === 2} onCancel={() => setModalOpen(0)} onContinue={deleteSelectedProperty} 
        actionDescription={ selectedProperty ? `delete property ${selectedProperty.address}` : ''} />
        </div>
    )
}

const useStyles = makeStyles((theme: Theme) => ({
    main: {
        width: "fit-content", 
        margin: "auto",
        position: "absolute",
        top: "185px",
        left: "15%",
    },
    root: {
      margin: theme.spacing(3),
      padding: '20px 20px',
      display: 'inline-block'
    },
    button: {
      background: "white",
      color: "#b2b6bf",
      padding: '4px 8px',
      border: '1px solid #e1e4eb',
      borderRadius: '7px',
      outline: 'none',
      width: '200px',
      marginBottom: 5,
      '&:hover' : {
        opacity: 1,
        background: "#e6f0ff",
        color: '#0C3A77',
        border: '1px solid #0C3A77'
      }
    },
    buttonSelected: {
        background: "#e6f0ff",
        color: '#0C3A77',
        border: '1px solid #0C3A77',
        padding: '4px 8px',
        borderRadius: '7px',
        outline: 'none',
        width: '200px',
        marginBottom: 5,
    },
    btnContainer: {
        borderTop: '2px solid #e1e4eb',
        marginTop: 5,
        paddingTop: '5px',
        width: '200px',
        // display: 'inline-block',
    },
    clearBtn: {
        border: 'none',
        outline: 'none',
        background: 'none',
        color: "#202021",
        opacity: .3,
        '&:hover' : {
            color: "#0C3A77",
            opacity: 1,
        }
    }
  }));

  export default ProjectHistory;