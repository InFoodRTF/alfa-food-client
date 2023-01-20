import React from "react";


class Layout extends React.Component<{cheldren :React.Component}>{
    render() {
        return (
            <div>
                {this.props.cheldren.render()}
            </div>
        );
    }
}