import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { getUserAsync, setCurrentUser } from "../../store/reducers/userSlice";
import './userList.css'
import Select from "../Select/select";
import UserService, { User } from "../../service/userService";

const UsersList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [users, setUsers] = useState<User[] | undefined>(undefined);

    useEffect(() => {        
        const fetchData = async () => {
            const data = await UserService.getUsers()
            setUsers(data as User[]);
         }
       
         fetchData();
    }, [])

    const selectUser = (user: User) => {
        dispatch(setCurrentUser(user));
    }

    return (
        <Select options={users} setOption={e => selectUser(e)}/>
    )
}

export default UsersList;