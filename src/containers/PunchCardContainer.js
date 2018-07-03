import React, { Component } from 'react';
import Fetch from '../utils/Fetch';
import LoadingSpinner from '../components/LoadingSpinner';
import PunchCard from '../components/PunchCard';

class CommitActivityContainer extends Component {
    state = {
        loading: true,
        data: null,
        error: ''   
    }

    componentDidMount(){
        const {owner, repo} = this.props;
        
        Fetch.getStatsPunchCard(owner, repo)
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

        return <PunchCard data={this.state.data}/>
    }
}

export default CommitActivityContainer;