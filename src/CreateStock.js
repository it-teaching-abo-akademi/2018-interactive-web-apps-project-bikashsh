import React, {Component} from 'react';
import {Button,Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

//Creating a stock
class CreateStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal,
        });
    }
    render() {
        const {stockName, stockQuantity, handleChangeStock, addStock, index} = this.props;
        return (
            <div>
                <div><Button outline color="success" className="addStock" onClick={this.toggle}>Add Stock</Button></div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>Add a stock</ModalHeader>
                    <ModalBody>
                        <form>
                            <div>
                                <Label><h6>Stock Name</h6></Label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Give a Stock Name"
                                    name="stockName"
                                    value={stockName}
                                    onChange={handleChangeStock}
                                />
                            </div>
                            <div>
                                <Label><h6>Quantity</h6></Label>
                                <Input
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                    name="stockQuantity"
                                    value={stockQuantity}
                                    onChange={handleChangeStock}
                                />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button outline color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button outline color="secondary" onClick={()=>addStock(index, this.toggle)}>Add</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreateStock