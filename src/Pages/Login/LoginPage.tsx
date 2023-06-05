import React from "react";
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import styles from "./LoginPage.module.css"
import logo from './logo.svg'
import {Button, Form} from "react-bootstrap";
import {inject, observer} from "mobx-react";
import AuthStore from "./AuthStore";
import statusResponse from "../../Api/StatusResponse";
import {Navigate} from "react-router-dom";
import StatusResponse from "../../Api/StatusResponse";
import HttpPages from "../PagesPath";
import {PageComponent} from "../PageComponent";


type props = {
    authStore: AuthStore;
}

@inject("authStore")
@observer
export class LoginPage extends PageComponent<props> {

    CheckResponse(status: statusResponse) { // todo подумать над этой штукой, она не логиная
        switch (status) {
            case StatusResponse.Ok:
                return <Navigate to={HttpPages.Profile}/>
            case StatusResponse.BadRequest:
                return <span>Не корректный пароль или логин</span>
            case StatusResponse.ServerNotFound:
                return <span>Мы не работает</span>
            case StatusResponse.NotServer:
                break;
            default:
                return <></>
        }
    }

    render() {
        let {authStore} = this.injected;
        return (
            <div className="m-5">
                <Container className={styles.OrderHistoryContainer}>
                    <Card className={styles.OrderHistoryCard}>
                        <div className="">
                            <div className="text-center m-3 p-3">
                                <img src={logo} alt="Logo"/>
                            </div>
                            <h2 className="fw-bold m-3 p-3 text-center">Вход</h2>
                            <div className="row d-flex justify-content-center">
                                <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
                                    <Form.Control type="text" placeholder="Логин"
                                                  onChange={v => authStore.User.ChangeUserName(v.target.value)}/>
                                </Form.Group>
                            </div>

                            <div className="row d-flex justify-content-center">
                                <Form.Group className="mb-3 w-75" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Пароль"
                                                  onChange={v => authStore.User.ChangePassword(v.target.value)}/>
                                </Form.Group>
                            </div>

                            <div className="text-center m-3">Забыли пароль?</div>

                            <div className="text-center">
                                <Button type={"button"} className="mb-5 w-50 btn btn-danger"
                                        onClick={() => authStore.UserAuth()}>Войти</Button>
                            </div>
                            {this.CheckResponse(authStore.ResponseStatus)}
                        </div>

                    </Card>
                </Container>

            </div>


        )
    }
}