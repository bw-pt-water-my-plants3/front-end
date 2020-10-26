import React, {useState, useEffect} from 'react';
import { axiosWithAuth } from "../utils/axiosWithAuth";
import EditPlant from './EditPlant';
import AddPlant from './Plants';

const MyPlants = props => {
    const [allPlants, setAllPlants] = useState([]);
    const [edit, setEdit] = useState({isEditing: false, plant: {
        id: 1,
        user_id: 1,
        nickname: 'nickname',
        species: 'species',
        h2ofrequency: ''
    }});
    const getPlants = () => {
        axiosWithAuth()
        .get(`https://reqres.in/api/auth//plant/`)
        .then(res => {
            console.log('getPlants *success*', res);
            setAllPlants(res.data);
        })
        .catch(err => {
          console.error('getPlants *error*', err)
        
        })
    };
    useEffect(() => {
        getPlants();
    }, []);
    const editingPlant = (plantId) => {
        const plantEdit = allPlants.filter(p => p.id === plantId)
        setEdit({...edit, isEditing: true, plant: plantEdit[0]});
    };
    return (
        
        
        <div>
            
            <EditPlant getPlants={getPlants} edit={edit} setEdit={setEdit}/>
            <AddPlant getPlants={getPlants} user={props.user} />
            <div>
            {allPlants.length ? allPlants.map(plant => {
                return(
                    <div key={plant.id}>
                        <span>
                            <i className="fas fa-ellipsis-h" 
                            onClick={() => {
                                setEdit(true); 
                                editingPlant(plant.id);
                                }}></i>
                            <h1>{plant.nickname}</h1>
                            <p> Species: {plant.species}</p>
                            <p> Frequency: {plant.h2ofrequency}</p>
                        </span>
                    </div>
                )
            }) : null}
            </div>
            
        </div>
    );
};
export default MyPlants;