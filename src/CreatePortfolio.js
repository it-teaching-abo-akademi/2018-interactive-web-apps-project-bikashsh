import React, {Component} from 'react'
import {Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap'

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
        const {portfolioName, handlePortfolioName, createPortfolio} = this.props
        return (
            <div>
                <button type="button" className="add-portfolio" onClick={this.toggle}>Add new Portfolio</button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>Create a portfolio</ModalHeader>
                    <ModalBody>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Portfolio Name"
                            size="30"
                            value={portfolioName}
                            onChange={handlePortfolioName}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" onClick={this.toggle}>Cancel</button>{' '}
                        <button type="button" onClick={()=>createPortfolio(this.toggle)}>Add</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreatePortfolio