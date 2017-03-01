import React, {Component} from 'react';
import Hello from 'components/Hello';

class App extends Component {
    state = {
        number: 0
    }
    componentDidMount() {
        const increment = () => {
            this.setState({
                number: this.state.number + 1
            });
            setTimeout(increment, 1000);
        }
        increment();
    }
    
    render() {
        return <Hello name={`React with Webpack2 (${this.state.number})`}/>
    }
}

export default App;
