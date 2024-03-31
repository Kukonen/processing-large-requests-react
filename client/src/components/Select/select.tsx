import { useEffect, useMemo, useState, useRef, SyntheticEvent } from "react";

import './select.css'
import SelectItem from "./selectItem";
import { User } from "../../service/userService";

interface SelectProps {
    options: User[] | undefined;
    setOption: (value: User) => void;
}

const Select = ({options, setOption} : SelectProps) => {
    const container = useRef<any>();
    const [currentOption, setCurrentOption] = useState<User | undefined>(undefined);

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalDisplayNone, setModalDisplayNone] = useState<boolean>(false);
    const [visibleOptions, setVisibleOptions] = useState<User[]>([]);
    const [firstVisibleElement, setFirstVisibleElement] = useState<number>(0);

    const BASE_OPTION_LENGTH = 100;
    const BASE_OPTION_GAP = 10;

    useEffect(() => {
        const handler = (event:any) => {
            if (!container.current.contains(event.target)) {
                changeVisible(false);
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    });

    useEffect(() => {
        if (options) {
            setVisibleOptions(options.slice(0, BASE_OPTION_LENGTH));
        }
    }, [options]);

    const scrollEvent = (e: SyntheticEvent) => {
        if (!options) {
            return;
        }

        
        const target = e.target as HTMLDivElement;
        
        if (target.scrollTop === 0) { // прокрутка до верха
            
            let changedElelemtsStart = BASE_OPTION_GAP;

            if (firstVisibleElement < BASE_OPTION_GAP) {
                changedElelemtsStart = firstVisibleElement;
            }

            // выбираем элементы для отображения на от firstVisibleElement до BASE_OPTION_GAP
            // индексами меньше, чем было отображего
            const remainingOptions = options.slice(firstVisibleElement - changedElelemtsStart, BASE_OPTION_LENGTH - BASE_OPTION_GAP + firstVisibleElement);
            setVisibleOptions([...remainingOptions]);
            setFirstVisibleElement(firstVisibleElement - changedElelemtsStart);

            // это надо, чтобы добавить прокрутку в очередь после useState
            setTimeout(() => {
                if (firstVisibleElement < BASE_OPTION_GAP) {
                    //@ts-ignore
                    target.scrollTop = target.children[firstVisibleElement].offsetTop;
                } else {
                    //@ts-ignore
                    target.scrollTop = target.children[BASE_OPTION_GAP - 1].offsetTop;
                }

            }, 0)
            
        }
        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            // выбираем элементы для отображения на от firstVisibleElement до BASE_OPTION_GAP
            // индексами больше, чем было отображего
            const remainingOptions = options.slice(firstVisibleElement + BASE_OPTION_GAP, firstVisibleElement + BASE_OPTION_LENGTH + BASE_OPTION_GAP);
            setVisibleOptions([...remainingOptions]);
            setFirstVisibleElement(firstVisibleElement + BASE_OPTION_GAP);
        }
    }

    const setUser = (user: User) => {
        setCurrentOption(user)
        setOption(user)
    }

    const changeVisible = (state: boolean) => {
        setModalDisplayNone(state)
        setTimeout(() => {
            setModalVisible(state)
        }, 1)
    }

    return (
        <div>
            <div ref={container} className="select__modal__section">
                <div
                    onClick={() => changeVisible(true)}
                    className="select_modal_selected"
                >
                    {currentOption ? currentOption.name : "Выберете пользователя"}
                </div>
            </div>
        
            <div
                style={
                    {
                        position: 'relative',
                        display: modalDisplayNone ? 'block' : 'none'
                    }
                }
                className={modalVisible ? "select__modal__visible" : "select__modal__hidden"}
                onScroll={scrollEvent}
            >
                {
                    visibleOptions.map(option => {
                        return (
                            <SelectItem
                                key={option.id} 
                                user={option} 
                                setUser={setUser}
                            />)
                    })
                }
            </div>
        </div>
    )
}

export default Select;