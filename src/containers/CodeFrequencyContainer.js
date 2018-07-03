import React, { Component } from 'react';
import Fetch from '../utils/Fetch';
import LoadingSpinner from '../components/LoadingSpinner';
import CodeFrequency from '../components/CodeFrequency';

class CommitActivityContainer extends Component {
    state = {
        loading: true,
        data: null,
        error: ''   
    }

    componentDidMount(){
        const {owner, repo} = this.props;
        
        Fetch.getStatsCodeFrequency(owner, repo)
        .then(({data}) => {
            this.setState({loading: false, data: data})
        })
        .catch(err => {
            console.log(err.message)
            this.setState({loading: false, error: err})
        })
    }
    
    render(){
        if (this.state.loading)
            return <LoadingSpinner/>

        if (this.state.error)
            return <div>{this.state.error.message}</div>

        return <CodeFrequency data={this.state.data}/>
    }
}

export default CommitActivityContainer;