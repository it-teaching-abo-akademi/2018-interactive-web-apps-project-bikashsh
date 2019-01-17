import React, {Component} from 'react';
import {Button, Input, Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';

//Creating new portfolio
class CreatePortfolio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    //Toggling of the state
    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    render() {
        const {portfolioName, handleChangePortfolio, createPortfolio} = this.props
        return (
            <div>
                <Button className="addPortfolio" onClick={this.toggle}>Add new Portfolio</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>Create a portfolio</ModalHeader>
                    <ModalBody>
                        <Input
                            type="text"
                            className="form-control"
                            placeholder="Give a Portfolio Name"
                            size="30"
                            value={portfolioName}
                            onChange={handleChangePortfolio}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button outline color="secondary" onClick={()=>createPortfolio(this.toggle)}>Add</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreatePortfolio