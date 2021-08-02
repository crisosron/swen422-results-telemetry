import './App.css';
import { 
  getAllMouseClickTime,
  getAllMouseStillTime,
  getAllMouseTotalTime,
  getAllMouseTravelTime
} from './fetchers/user-entry-fetcher';
import GraphBlock from './components/GraphBlock';
import styled from 'styled-components';
import titleImage from './app-title-image.png';

const StyledPageWrapper = styled.div`
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div`
  width: 85%;
  text-align: center;
`

const TitleImageWrapper = styled.div`
  margin: 20px;
`

const baseDataFetchers = [ 
  getAllMouseClickTime,
  getAllMouseStillTime,
  getAllMouseTotalTime,
  getAllMouseTravelTime
]

// The purpose of this function is to 'save' the functions with their arguments instead of
// executing them so we can pass the function (with the pre-defined arguments) to each graph
// block so it can get executed by the graph block
//
// By doing this, the graph blocks are able to track the status of each data fetch individually,
// rather than doing it here which could get very convoluted
const createDataFetchers = (options) => {
  const dataFetchers = [];
  baseDataFetchers.forEach((baseDataFetcher) => {
    dataFetchers.push(baseDataFetcher.bind(null, options));
  })

  return dataFetchers;
}

const App = () => {

  const dataFetchers = [
      ...createDataFetchers({forTraining: false, forAbstractImages: false}),
      ...createDataFetchers({forTraining: true, forAbstractImages: false}),
      ...createDataFetchers({forTraining: false, forAbstractImages: true}),
      ...createDataFetchers({forTraining: true, forAbstractImages: true})
    ]

  return (
    <>
      <TitleImageWrapper>
        <img src={titleImage} alt="Title Image" width="1000" />
      </TitleImageWrapper>
      <StyledPageWrapper>
        <StyledWrapper>
          {dataFetchers.map((dataFetcher) => {
            return <GraphBlock dataFetcher={dataFetcher}></GraphBlock>
          })}
        </StyledWrapper>
      </StyledPageWrapper>
    </>
  );
}

export default App;
