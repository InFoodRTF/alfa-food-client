import React from "react";
import Grade from "../Pages/UsersMenu/Profile/Parent/Store/Grade";

class InfoClass extends React.Component<{ grade: Grade }> {
    render() {
        return (
            <div>
                {this.props.grade.name}
            </div>
        );
    }

}