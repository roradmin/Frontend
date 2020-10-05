import React,{useState,useContext,useEffect, useMemo} from 'react';
import _ from 'lodash';
import { getUsers } from '../../apiConnector/permissions.api';
import AppContext from '../appContext';
import { PermissionsContext } from './permissionsPage';

const UserPermissions = () => {
    const [currentSearch,setCurrentSearch] = useState('');
    const [usersList,setUsersList] = useState([]);
    const [filteredList,setFilteredList] = useState([]);
    const {currentUser,setCurrentUser} = useContext(PermissionsContext);
    const {openPopupMessage} = useContext(AppContext);

    useEffect(() => {
        getAllUsers();
    },[]);
    
    useEffect(() => {
        !_.isEmpty(usersList) && setFilteredList(usersList);
    },[usersList]);

    useEffect(() => {
        if(!_.isEmpty(usersList) && !_.isEmpty(currentSearch)){
                const list = usersList.filter(u => u.firstName.toUpperCase().includes(currentSearch.toUpperCase()) ||
                u.lastName.toUpperCase().includes(currentSearch.toUpperCase())
            );
            setFilteredList(list);
        }else{
            setFilteredList(usersList);
        }
    },[currentSearch]);

    const getAllUsers = async() => {
        try{
            const {data:{data}} = await getUsers();
            setUsersList(data);
        }
        catch(err){
            openPopupMessage({err});
        }
    }
    const GetUserPermissionsList = () => {
        console.log(currentUser);
        const{extraPermissions,groupPermissions} = currentUser;
        const combinedPermissions = extraPermissions.concat(groupPermissions || []);

    return <div className="usersList">
            <div className="goBack" onClick={()=> setCurrentUser(null)}>{'<<<'}</div>
            {
                combinedPermissions.map(per => {
                    return <div key={per} className="per">{per}</div>
                })
            }
        </div>
    }
    const GetUsersList = () => {
        if(!_.isEmpty(filteredList)){
            return <div className="usersList">
                {
                    filteredList.map(t => {
                        return <div
                                className="userItem"
                                onClick = {() => setCurrentUser(t)}
                                key={t.email}><h4>
                                {`${t.firstName} ${t.lastName}`}
                                </h4>
                        </div>
                    })
                }
            </div>
        }else return [];
    }
    return <div className="userPermissions">
            {
                !_.isEmpty(filteredList) && !currentUser && <input value={currentSearch} placeholder="Search name..." onChange={(e)=> setCurrentSearch(e.target.value)} />
            }
            {
                currentUser && <GetUserPermissionsList /> || <GetUsersList />
            }
    </div>
}

export default UserPermissions;