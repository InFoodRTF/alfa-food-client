import React from "react";
import {Card} from "react-bootstrap";
import styles from './FiledProfile.module.css'

class FieldProfile extends React.Component<{ descr: string, info: string }> {

    render() {
        return (
            <div>
                <div className={styles.username}>
                    <div className={styles.field}>
                        <p className={styles.descr}>{this.props.descr}</p>
                        <Card className={styles.bg}>
                            <Card.Body className={styles.cardBody}> {this.props.info} </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default FieldProfile;
