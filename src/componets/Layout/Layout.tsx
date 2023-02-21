import React, {PropsWithChildren} from "react";


class Layout extends React.Component<{Childer: React.Component}> {
    render() {
        return (
            <div>
                {this.props.Childer.render()}
            </div>
        );
    }
}

export default Layout;