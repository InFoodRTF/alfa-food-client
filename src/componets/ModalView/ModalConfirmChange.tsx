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
    onSubmit: () => void
}

// TOdo сделать красивее
class ModalExampleBasic extends React.Component<PropsWithChildren<IModal>, {}> {


    render() {
        return (
            <Modal style={customStyles} isOpen={this.props.active}
            ariaHideApp={false}>
                <div>{this.props.children}</div>
                <button onClick={() => this.props.onSubmit()}> Да</button>
                <button onClick={() => this.props.onClose()}> Нет</button>
            </Modal>
        );
    }
}

export default ModalExampleBasic

