import React from 'react';
import {XYPlot, MarkSeries, HorizontalGridLines, XAxis, YAxis} from 'react-vis';
import { getTicksTotalFromSize } from 'react-vis/dist/utils/axis-utils';
import '../../node_modules/react-vis/dist/style.css';

const HEIGHT = 400;
const WIDTH = 700;
const day =['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']


const PunchCard = props => {
    const data = props.data.map(stat => {
        return {x: stat[1], y: stat[0] , size: stat[2]}
    })
    
    return (
        <XYPlot height={HEIGHT} width={WIDTH} color={'#FF9833'}>
            <HorizontalGridLines tickTotal={getTicksTotalFromSize(HEIGHT)/2} top={-20}/>
            <YAxis
                tickFormat={idx => day[idx]}
                tickTotal={getTicksTotalFromSize(HEIGHT)/2}
                left={-5}
                tickSize={0}
                style={{
                    line: {visibility: 'hidden'},
                }}
            />
            <MarkSeries
                className="mark-series-example"
                sizeRange={[0, 10]}
                data={data}
            />
            <XAxis
                style={{
                    line: {visibility: 'hidden'},
                }}
            />
        </XYPlot>
    )
}

export default PunchCard;