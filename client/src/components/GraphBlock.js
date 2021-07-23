import styled from 'styled-components';
import { useQuery } from 'react-query';

const StyledDiv = styled.div`
    color: red;
    border: 1px solid black;
    width: 200px;
    height: 200px;
`;

const GraphBlock = (props) => {
    const { dataFetcher, dataFetcherName, title } = props;
    const { isLoading, error, data } = useQuery(dataFetcherName, dataFetcher)
    console.log(data);
    return (
        <StyledDiv>
            {
                isLoading ? <p>Loading....</p> 
                :
                <p>{title}</p>
            }
        </StyledDiv>
    );
}

export default GraphBlock;