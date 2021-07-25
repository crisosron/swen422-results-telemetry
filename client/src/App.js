import './App.css';
import { getAllUserEntries, 
  getLatestEntry, 
  getLatestEntryWithTraining,
  getTrainingEntries,
  getActualEntries } from './fetchers/user-entry-fetcher';
import GraphBlock from './components/GraphBlock'
import styled from 'styled-components';
import titleImage from './app-title-image.png'

const StyledPageWrapper = styled.div`
  padding: 20px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
          <div>
            <GraphBlock title="Global Statistics" dataFetcherName="globalAverage" dataFetcher={ getAllUserEntries } />
            <GraphBlock title="Latest Entry with Training" displayLegend dataFetcherName="latestEntryWithTraining" dataFetcher={ getLatestEntryWithTraining } />
            <GraphBlock title="Training Entries" displayLegend dataFetcherName="trainingEntries" dataFetcher={ getTrainingEntries } />
          </div>
          <div>
            <GraphBlock title="Latest Entry" dataFetcherName="latestEntry" dataFetcher={ getLatestEntry } />
            <GraphBlock title="Training Sets" dataFetcherName="latestEntry" dataFetcher={ getLatestEntry } />
            <GraphBlock title="Actual Entries" displayLegend dataFetcherName="actualEntries" dataFetcher={ getActualEntries } />
          </div>
      </StyledPageWrapper>
    </>
  );
}

export default App;
