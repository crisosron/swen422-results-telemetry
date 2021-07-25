import styled from 'styled-components';
import {useState, useEffect} from 'react';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import StatisticsBlock from './StatisticsBlock';

const StyledDiv = styled.div`
    width: 500px;
    padding: 10px;
    margin: 20px;
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
    const [datasets, setDatasets] = useState([]);

    const options = {
        plugins: {
            legend: {
                display: !!displayLegend
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Attempts'
                }
            },

            y: {
                title: {
                    display: true,
                    text: 'Reaction time (ms)'
                }
            }
        }
    }

    const graphData = {
        labels: Array.from({length: 10}, (_, i) => i + 1),
        datasets,
    };

    useEffect(() => {
        if(isLoading) return;
        console.log("Master data: ", data);
        if (data.hasOwnProperty('invalidFetchMessage')) return;
        const datasets = data.map((entry, i) => {
            console.log("Entry:", entry);
            return {
                label: i,
                data: entry.attempts,
                borderColor: generateRandomColor(),
                tension: 0.5
            }
        });

        setDatasets(datasets);

    }, [isLoading, data])

    if (isLoading) {
        return (
            <StyledDiv>
                <StyledGraphTitle>{title}</StyledGraphTitle>
                <p>Loading...</p>
            </StyledDiv>
        )
    } else if(data.hasOwnProperty('invalidFetchMessage') || datasets.length === 0) {
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
                <Line data={graphData} options={options}></Line>
                <StatisticsBlock data={data} />
            </StyledDiv>
        );
    }
}

export default GraphBlock;