import React from "react";
import styles from "./LeftMenuCooking.module.css";
import {Button} from "react-bootstrap";
import {Menu} from "../../Pages/PagesCooker/Store/Models/Menu";


interface props {
    menu: Menu;
}
//у каждой галочки должен быть уникальный id, например фио в поля "id" и "htmlFor"
export class LeftMenuCooking extends React.Component<props> {
    render() {
        const {menu} = this.props;
        const changeClass = (event: any) => { // todo много кода, надо будет урезать
            const buttons = document.querySelectorAll('Button')
            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].classList.contains(styles.red)) {
                    buttons[i].classList.remove(styles.red)
                }
            }
            event.currentTarget.classList.toggle(styles.red)
        }
        return (
            <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
                {
                        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                            <Button variant={''} bsPrefix={''} onClick={changeClass}
                                    style={{width: `${200}px`}}>
                                {menu.name}
                            </Button>
                            <div className={styles.infBlock}>
                                <input type={"checkbox"} id={menu.id.toString()} className={styles.InputField}></input>
                                <label htmlFor={menu.id.toString()} className={styles.InputLabel}></label>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

