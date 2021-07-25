import styled from 'styled-components';
import {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import { Doughnut } from 'react-chartjs-2';

const StyledDiv = styled.div`
    width: 500px;
    padding: 10px;
    margin: 10px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`;

const StyledGraphTitle = styled.h1`
    font-size: 25px;
`

const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const GraphBlock = (props) => {
    const { dataFetcher, dataFetcherName, title, displayLegend } = props;
    console.log('DISPLAY LEGEND:', displayLegend);
    const { isLoading, error, data } = useQuery(dataFetcherName, dataFetcher)
    const [graphData, setGraphData] = useState();

    useEffect(() => {
        if(isLoading) return;
        if (data.hasOwnProperty('invalidFetchMessage')) return;

        const graphData = {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    generateRandomColor(), generateRandomColor(),
                ]
            }]
        }

        setGraphData(graphData);

    }, [isLoading, data])

    if (isLoading) {
        return (
            <StyledDiv>
                <StyledGraphTitle>{title}</StyledGraphTitle>
                <p>Loading...</p>
            </StyledDiv>
        )
    } else if(data.hasOwnProperty('invalidFetchMessage') || !graphData || !graphData.datasets) {
        return (
            <StyledDiv>
                <StyledGraphTitle>{title}</StyledGraphTitle>
                <p>Insufficient data to show telemetry</p>
            </StyledDiv>
        )
    } else {
        return (
            <StyledDiv>
                <StyledGraphTitle>{title}</StyledGraphTitle>
                <Doughnut data={graphData} 
                options={{ }}/>
            </StyledDiv>
        );
    }
}

export default GraphBlock;