import { useSelector } from 'react-redux';
import './user.css';
import { selectCurrentUser } from '../../store/reducers/userSlice';
import { useEffect, useState } from 'react';
import PersonIcon from '../../person.svg';

const User = () => {
    const user = useSelector(selectCurrentUser);

    const [name, setName] = useState<string>("");
    const [department, setDepartment] = useState<string>("");
    const [company, setCompany] = useState<string>("");
    const [jobTitle, setJobTitle] = useState<string>("");

    useEffect(() => {
        if (!user) {
            return;
        }

        setName(user.name);
        setDepartment(user.department);
        setCompany(user.company);
        setJobTitle(user.jobTitle);
    }, [user])

    return (
        <>
        {
        
        user ?
        <div className="user">
            <div className='user__name'>
                <input 
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Имя пользователя"
                />
            </div>
            <div className='user__information'>
                <img 
                    src={PersonIcon} 
                    alt="фото" 
                />
                <table>
                <tbody>
                    <tr>
                        <td>
                            Должность
                        </td>
                        <td>
                            <input 
                                type="text" 
                                value={jobTitle}
                                onChange={e => setJobTitle(e.target.value)}
                                placeholder="Не указано"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Отдел
                        </td>
                        <td>
                            <input 
                                type="text" 
                                value={department}
                                onChange={e => setDepartment(e.target.value)}
                                placeholder="Не указано"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Компания
                        </td>
                        <td>
                            <input 
                                type="text" 
                                value={company}
                                onChange={e => setCompany(e.target.value)}
                                placeholder="Не указано"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button>Сохранить</button>
                        </td>
                    </tr>
                </tbody>
                </table>
            </div>
        </div>
        :
        <div className="user">
            <div className='user__name'>
                Выберете пользователя
            </div>
        </div>
        }
        </>
    )
}

export default User;