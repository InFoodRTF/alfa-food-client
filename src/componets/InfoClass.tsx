import React from "react";
import Grade from "../Model/Grade";

class InfoClass extends React.Component<{ grade: Grade }> {
    render() {
        return (
            <div>
                {this.props.grade.name}
            </div>
        );
    }

}