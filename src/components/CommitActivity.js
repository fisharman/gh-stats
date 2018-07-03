import React, { PureComponent } from 'react';
import {XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis, Hint} from 'react-vis';
import { getTicksTotalFromSize } from 'react-vis/dist/utils/axis-utils';
import '../../node_modules/react-vis/dist/style.css';
import moment from 'moment';

const HEIGHT = 300;
const WIDTH = 700;

class CommitActivity extends PureComponent {
    state = {
        hint: null
    }

    handleMouseOver = dp => {
        let {week, total} = this.props.data[dp.x];
        week = moment.unix(week).utc().format('MMM/D YYYY');
        this.setState({hint: {commits: total, week}})
    }

    handleMouseOut = () => {
        this.setState({hint: null})
    }

    render(){
        const data = this.props.data.map((week,idx) => {
            return {x: idx, y: week.total}
        });
        const hint = this.state.hint ? <Hint value={this.state.hint}/> : null;
        return (
            <XYPlot height={HEIGHT} width={WIDTH}>
                <HorizontalGridLines tickTotal={getTicksTotalFromSize(HEIGHT)/2} />
                <YAxis tickTotal={getTicksTotalFromSize(HEIGHT)/2} />
                <VerticalBarSeries 
                    data={data}
                    color={'#FF9833'}
                    onValueMouseOver={this.handleMouseOver} 
                    onValueMouseOut={this.handleMouseOut}
                />
                {hint}
                <XAxis tickFormat={idx => moment.unix(this.props.data[idx].week).utc().format('MMM/D')} />
            </XYPlot>
        )    
    }
}

export default CommitActivity;