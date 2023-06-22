import React, {PropsWithChildren} from "react";
import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

interface IModal {
    active: boolean,
    onClose: () => void,
    textClose?: string
    onSubmit?: () => void
}

// TOdo сделать красивее
class ModalView extends React.Component<PropsWithChildren<IModal>, {}> {


    render() {
        return (
            <Modal style={customStyles}  isOpen={this.props.active}
            ariaHideApp={false}>
                <div>{this.props.children}</div >
                {this.props.onSubmit !== undefined && <button onClick={() => this.props.onSubmit ?? ""}> Да</button>}
                <button onClick={() => this.props.onClose()}> {this.props.textClose ?? " Нет"}</button>
            </Modal>
        );
    }
}

export default ModalView

