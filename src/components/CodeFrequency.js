import React from 'react';
import {XYPlot, VerticalBarSeries, HorizontalGridLines, XAxis, YAxis, DiscreteColorLegend} from 'react-vis';
import { getTicksTotalFromSize } from 'react-vis/dist/utils/axis-utils';
import '../../node_modules/react-vis/dist/style.css';
import moment from 'moment';

const HEIGHT = 400;
const WIDTH = 700;

const CodeFrequency = props => {
    const addition = [];
    const deletion = [];

    props.data.forEach((week,idx) => {
        addition.push({x: idx, y: week[1]});
        deletion.push({x: idx, y: week[2]});
    })
    
    return (
        <XYPlot height={HEIGHT} width={WIDTH}>
            <HorizontalGridLines tickTotal={getTicksTotalFromSize(HEIGHT)} />
            <YAxis tickFormat={idx => (idx < 1000 && idx > -1000) ? idx : idx/1000 + 'K'}/>
            <VerticalBarSeries data={addition} color={'green'}/>
            <VerticalBarSeries data={deletion} color={'red'}/>
            <XAxis 
                tickTotal={getTicksTotalFromSize(HEIGHT)/1.2}
                tickFormat={idx => moment.unix(props.data[idx][0]).utc().format('MMM/YYYY')}
            />
             <DiscreteColorLegend
                orientation="horizontal"
                width={200}
                items={[{title: 'Addition', color: 'green'},{title: 'Deletion', color: 'red'}]}
            />
        </XYPlot>
    )
}

export default CodeFrequency;