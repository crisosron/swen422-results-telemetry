import styled from 'styled-components';
import { min, max, mean, standardDeviation, median } from 'simple-statistics';

const StyledDiv = styled.div`
    padding: 10px;
    text-align: center;
    color: black;
`;

const StatTitle = styled.span`
    font-size: 20px;
    display: block;
`;

const StatText = styled.span`
    font-size: 15px;
`

const TextBlock = styled.div`
    display: inline-block;
    margin: 20px;
`

const SIG_FIG = 3

const StatisticsBlock = (props) => {
    const { data } = props;
    console.log("Data in statsblock: ", data);

    if(data.hasOwnProperty('invalidFetchMessage') || !data || data.length === 0) {
        console.log("DATA EMPTY");
        return (
            <StyledDiv>
                <TextBlock>
                    <p>Insufficient data to display</p>
                </TextBlock>
            </StyledDiv>
        )
    }

    // If there is more than 1 dataset, we need to calculate the total statistics across
    // all the datasets. Otherwise, we just use the statistics of the only dataset in data
    let stats;
    if(data.length > 1) {
        const flatMappedAttempts = data.flatMap((entry) => entry.attempts);
        stats = {
            mean: mean(flatMappedAttempts).toPrecision(SIG_FIG),
            median: median(flatMappedAttempts).toPrecision(SIG_FIG),
            min: min(flatMappedAttempts).toPrecision(SIG_FIG),
            max: max(flatMappedAttempts).toPrecision(SIG_FIG),
            sd: standardDeviation(flatMappedAttempts).toPrecision(SIG_FIG)
        }
    } else {
        stats = {
            mean: data[0].mean.toPrecision(SIG_FIG),
            median: data[0].median.toPrecision(SIG_FIG),
            min: data[0].min.toPrecision(SIG_FIG),
            max: data[0].max.toPrecision(SIG_FIG),
            sd: data[0].sd.toPrecision(SIG_FIG)
        }
    }

    return (
        <StyledDiv>
            <TextBlock>
                <StatTitle>Mean</StatTitle>
                <StatText>{stats.mean}</StatText>
            </TextBlock>
            <TextBlock>
                <StatTitle>Median</StatTitle>
                <StatText>{stats.median}</StatText>
            </TextBlock>
            <TextBlock>
                <StatTitle>Min/Max</StatTitle>
                <StatText>{`${stats.min}/${stats.max}`}</StatText>
            </TextBlock>
            <TextBlock>
                <StatTitle>SD</StatTitle>
                <StatText>{stats.sd}</StatText>
            </TextBlock>
        </StyledDiv>
    )
}

export default StatisticsBlock;