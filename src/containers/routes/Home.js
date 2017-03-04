import React, {Component} from 'react';
import Hello from 'components/Hello';
import * as sample from 'redux/modules/sample';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class Home extends Component {
    componentWillMount() {
        const { SampleActions } = this.props;
        SampleActions.fetchData({
            text: 'hello'
        });
    }
    
    render() {
        const { status } = this.props;

        return (
            <div>
                <Hello name="home"/>
                { JSON.stringify(status.sample.get('result')) }
            </div> 
        )
    }
}

export default connect(
    state => ({
        status: {
            sample: state.sample
        }
    }),
    dispatch => ({
        SampleActions: bindActionCreators(sample, dispatch)
    })
)(Home);