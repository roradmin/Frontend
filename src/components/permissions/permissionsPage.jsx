import React,{useState,useContext,useEffect} from 'react';
import UserPermissions from './userPermissions';
import {getAllPermissions,updatePermissionsToUser} from '../../apiConnector/permissions.api';
import _ from 'lodash';
import AppContext from '../appContext';
import './permissions.scss';

export const PermissionsContext = React.createContext();

const PermissionPage = () => {
    const [allPermissions,setAllPermissions] = useState([]);
    const [currentUser,setCurrentUser] = useState(null);
    const [userPermissions,setUserPermissions] = useState([]);
    const {openPopupMessage} = useContext(AppContext);

    useEffect(() => {
        getPermissions();
    },[]);

    useEffect(() => { 
        console.log(currentUser);
        const extraPermissions = _.get(currentUser,'extraPermissions',[]);
        setUserPermissions(extraPermissions);
    },[currentUser]);

    const getPermissions = async() => {
        // get all permissions options
        try{
            const {data:{data}} = await getAllPermissions();
            const permissionsList = data;
            setAllPermissions(permissionsList);
        }
        catch(err){
             openPopupMessage({err});
        }
        finally{
           // setIsLoading(false)
        }
    }
    const addPermission = async (permission) => {
        let newUserPemissions = [...userPermissions];
        const permissionsExists = newUserPemissions.findIndex(us => us === permission.value);
        if(permissionsExists !== -1){
            newUserPemissions.splice(permissionsExists,1);
            setUserPermissions(newUserPemissions);
        }else{
            newUserPemissions.push(permission.value);
            setUserPermissions(newUserPemissions);
        }

    }
    const updatePermissions = async() => {
        try{
            const {data:{data}} = await updatePermissionsToUser(currentUser.id,userPermissions);
            openPopupMessage({header: 'Updated Successfuly',type:'success'});
            console.log(data);
        }
        catch(err){
            openPopupMessage({err});
        }
        finally{
        }
    }
    const PermissionsList = () => {
        if(!_.isEmpty(allPermissions)){
            return <div className="permissionsList">
                {
                    allPermissions.map(c => {
                        return <div
                            className={`perBox ${currentUser ? userPermissions.includes(c.value) : ''}`}
                            key={c.value}
                            onClick={() => {currentUser && addPermission(c)}}>
                            {c.label + c.group}
                        </div>
                    })
                }
            </div>
        }else return [];
    }
    return <div className="permissionsPageWrapper">
        <PermissionsContext.Provider value = {{
            allPermissions,
            currentUser,
            setCurrentUser
        }}>
            <div className="permissions">
                <UserPermissions/>
                <PermissionsList />
            </div>
            <div className="sendBtnWrapper">
                <button onClick={() => currentUser && updatePermissions()} >Update Permissions</button>
            </div>
        </PermissionsContext.Provider>
    </div>
}

export default PermissionPage;
