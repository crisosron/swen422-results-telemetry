import './App.css';
import { getAllUserEntries, 
  getLatestEntry, 
  getLatestEntryWithTraining,
  getTrainingEntries,
  getActualEntries,
  getSuccessFailRatio } from './fetchers/user-entry-fetcher';
import GraphBlock from './components/GraphBlock';
import RatioGraphBlock from './components/RatioGraphBlock';
import styled from 'styled-components';
import titleImage from './app-title-image.png';

const StyledPageWrapper = styled.div`
  padding: 20px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto;
`;

const TitleImageWrapper = styled.div`
  margin: 20px;
`
const App = () => {
  return (
    <>
      <TitleImageWrapper>
        <img src={titleImage} alt="Title Image" width="1000" />
      </TitleImageWrapper>
      <StyledPageWrapper>
            <GraphBlock title="Global Statistics" dataFetcherName="globalAverage" dataFetcher={ getAllUserEntries } />
            <GraphBlock title="Latest Entry with Training" displayLegend dataFetcherName="latestEntryWithTraining" dataFetcher={ getLatestEntryWithTraining } />
            <GraphBlock title="Latest Entry" dataFetcherName="latestEntry" dataFetcher={ getLatestEntry } />
            <GraphBlock title="Training Entries" dataFetcherName="trainingEntries" dataFetcher={ getTrainingEntries } />
            <GraphBlock title="Actual Entries" dataFetcherName="actualEntries" dataFetcher={ getActualEntries } />
            <RatioGraphBlock title="Success-Fail Ratio" dataFetcherName="successFailRatio" dataFetcher={ getSuccessFailRatio } />
      </StyledPageWrapper>
    </>
  );
}

export default App;
