import React, {Component} from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap'

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
        const {stockName, stockAmount, handleStockName, addStock, index} = this.props;
        return (
            <div>
                <div><button className="add-stock" onClick={this.toggle}>Add Stock</button></div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>Add a stock</ModalHeader>
                    <ModalBody>
                        <form>
                            <div>
                                <label><h6>Stock Name</h6></label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Stock Name"
                                    name="stockName"
                                    value={stockName}
                                    onChange={handleStockName}
                                />
                            </div>
                            <div>
                                <label><h6>Stock Amount</h6></label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="0"
                                    name="stockAmount"
                                    value={stockAmount}
                                    onChange={handleStockName}
                                />
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button onClick={this.toggle}>Cancel</button>{' '}
                        <button onClick={()=>addStock(index, this.toggle)}>Add</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default CreateStock