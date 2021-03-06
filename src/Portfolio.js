import React, {Component} from 'react';
import CreatePortfolio from './CreatePortfolio';
import CreateStock from './CreateStock';
import axios from 'axios';
import update from 'immutability-helper';
import { Button } from 'reactstrap';

class Portfolio extends Component {
    constructor(props){
        super(props);
        this.state = {
            portfolioName: '',
            stockName: '',
            stockQuantity: 1,
            portfolios: [],
            exchangeRate: '',
            selectedStocks: [],
        }
    }

    //Getting the exchange rate from USD-->EUR
    UNSAFE_componentWillMount() {
        axios
            .get(
                `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=7GD9LVHF7J90R06C`
            )
            .then(res => {
                const exchangeObj = res.data['Realtime Currency Exchange Rate'];
                const currencyObj = exchangeObj['5. Exchange Rate'];
                this.setState({
                    exchangeRate: currencyObj,
                });
            });
    }


    handleChangePortfolio = (e)=>{
        this.setState({
            portfolioName: e.target.value,
        })

    }
    handleChangeStock = (e)=>{
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    //Creating a new Portfolio
    createPortfolio = (toggle)=>{
        if(this.state.portfolioName === ''){
            alert('Please give a name to your portfolio')
        } else{
            const portfolio = this.state.portfolios;
            const newPortfolio = {
                name: this.state.portfolioName,
                isEuro: true,
                stocks: [],
            }
            portfolio.push(newPortfolio)
            this.setState({
                portfolioName: '',
                portfolios: portfolio,
            })
            toggle();

        }
    }
    //Removing a portfolio
    removePortfolio = (i)=>{
        let portfolios = this.state.portfolios;
        portfolios.splice(i, 1);
        this.setState({
            portfolios,
        })
    }

    //Fetching the stock value and adding to the respective portfolio
    addStock = (index, toggle)=>{
        if(this.state.stockName === ''){
            alert('Please enter a stock name')
        } else{
            const stockName = this.state.stockName.toUpperCase();
            const stockQuantity = this.state.stockQuantity;
            let portfolios = this.state.portfolios;
            axios
                .get(
                    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${
                        stockName
                        }&interval=1min&apikey=7GD9LVHF7J90R06C&outputsize=compact`
                ).then(res=>{
                const data = res.data['Time Series (1min)']
                const values = Object.values(data)
                const unitValue = values[0]['1. open']
                const total = Number.parseFloat(stockQuantity * unitValue).toFixed(3)
                const totalValue = total
                const stock = {
                    stockName,
                    unitValue,
                    stockQuantity,
                    totalValue,
                }
                portfolios[index].stocks.push(stock);
                this.setState({
                    portfolios,
                })
            }).catch(e=>alert('Stock does not exist'))
            this.setState({
                stockName: '',
                stockQuantity: 1,
            })
            toggle()
        }
    }
    //Toggling of button between show in EUR and show in USD
    toggleButton = (i)=>{
        this.setState({
            portfolios: update(this.state.portfolios, {
                [i]: {
                    isEuro: {$set: !this.state.portfolios[i].isEuro},
                },
            }),
        })
    }

    //Selecting and deleting the selected stock
    selectedStock = (stockName)=>{
        const selectedStocks = this.state.selectedStocks;
        if(selectedStocks.includes(stockName)){
            const index = selectedStocks.indexOf(stockName);
            selectedStocks.splice(index, 1);
        } else{
            selectedStocks.push(stockName);
        }

        this.setState({
            selectedStocks,
        })

    }

    removeSelectedStocks = (i)=>{
        const stocks = this.state.portfolios[i].stocks;
        const selectedStocks = this.state.selectedStocks;
        const newStocks = stocks.filter(item=>!selectedStocks.includes(item.stockName))

        this.setState({
            portfolios: update(this.state.portfolios, {
                [i]: {
                    stocks: {
                        $set: newStocks,
                    },
                },
            }),
            selectedStocks: [],
        })
    }

    //Calculating total value of Portfolio to 3 decimal points
    countValue = (i)=>{
        let value = [0];
        let portfolio = this.state.portfolios[i]
        portfolio.stocks.map(item=>value.push(Number(item.totalValue)))
        if(portfolio.isEuro){
            const totalValue = value.reduce((total, num)=>total + num)
            return Number.parseFloat(totalValue).toFixed(3) + '$'
        } else{
            const totalValue = value.reduce((total, num)=>total + num) * this.state.exchangeRate;
            return Number.parseFloat(totalValue).toFixed(3) + '€'
        }

    }
    render() {
        const portfolios = this.state.portfolios.map((item, i)=>(
            <div key={i}>
                <div className="portfolio">
                    <div className="portfolioHeader">
                        <span className="portfolioName">{item.name}</span>
                        <span><Button color="secondary" onClick={()=>this.toggleButton(i)}>{this.state.portfolios[i].isEuro ? 'Show in €' : 'Show in $'}</Button></span>
                        <span><Button
                            outline color="secondary"
                            style={{'borderRadius': '50%'}}
                            onClick={()=>{if(window.confirm('Are you sure you want to delete this portfolio?')) this.removePortfolio(i)}}>X</Button>
                        </span>
                    </div>
                    <div className="portfolioBody">
                        <table>
                            <thead>
                            <tr>
                                <th>Stock</th>
                                <th>Quantity</th>
                                <th>Unit Value</th>
                                <th>Total Value</th>
                                <th>Select</th>

                            </tr>
                            </thead>
                            {item.stocks.map((stockItem, i)=>(
                                <tbody key={i}>
                                <tr>
                                    <td>{stockItem.stockName}</td>
                                    <td>{stockItem.stockQuantity}</td>
                                    <td>{item.isEuro ?
                                        Number(stockItem.unitValue) + '$' :
                                        Number.parseFloat(Number(stockItem.unitValue) * this.state.exchangeRate).toFixed(3) + '€'}
                                    </td>
                                    <td>{item.isEuro ?
                                        Number(stockItem.totalValue) + '$' :
                                        Number.parseFloat(Number(stockItem.totalValue) * this.state.exchangeRate).toFixed(3) + '€'}
                                    </td>
                                    <td><input type="checkbox" onClick={()=>this.selectedStock(stockItem.stockName)} /></td>
                                </tr>
                                </tbody>
                            ))}

                        </table>
                    </div>
                    <p>Total Value of {item.name}: {this.countValue(i)}</p>
                    <div className="portfolioFooter">
                        <CreateStock
                            stockName={this.state.stockName}
                            stockQuantity={this.state.stockQuantity}
                            handleChangeStock={this.handleChangeStock}
                            addStock={this.addStock}
                            index = {i}
                        />
                        <span><Button outline color="info">Perf Graph</Button></span>
                        <span><Button outline color="danger" onClick={()=>this.removeSelectedStocks(i)}>Remove Selected</Button></span>
                    </div>
                </div>
            </div>
        ))
        return (
            <div>
                <CreatePortfolio
                    portfolioName={this.state.portfolioName}
                    handleChangePortfolio={this.handleChangePortfolio}
                    createPortfolio={this.createPortfolio}
                />
                <div>
                    {portfolios}
                </div>
            </div>
        )
    }
}

export default Portfolio