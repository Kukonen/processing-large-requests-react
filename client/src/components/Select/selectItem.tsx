import { User } from '../../service/userService'
import './select.css'
import PersonIcon from '../../person.svg';

interface SelectItem {
    user: User
    setUser: (user: User) => void
}

const SelectItem = ({user, setUser} : SelectItem) => {
    return (
        <div className="select__item"
            onClick={() => {
                setUser(user)
            }}
        >

            <img src={PersonIcon} alt="фото" />
            <span>
                {
                    user.name
                }
            </span>
        </div>
    )
}

export default SelectItem;