import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.js';
import Home from './pages/Home.js';
import Subjects from './pages/Subjects.js';
import LessonPage from './pages/LessonPage.js';
import LabPage from './pages/LabPage.js';
import PracticePage from './pages/PracticePage.js';
import ChargePage from './pages/ChargePage.js';
import WorldPage from './pages/WorldPage.js';
import DuelPage from './pages/DuelPage.js';
import AccountPage from './pages/AccountPage.js';
import PyqPage from './pages/PyqPage.js';
import StudioPage from './pages/StudioPage.js';
import PyqTrackPage from './pages/PyqTrackPage.js';
import PyqQuizPage from './pages/PyqQuizPage.js';
import PyqPracticePage from './pages/PyqPracticePage.js';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="subjects" element={<Subjects />} />
          <Route path="lesson/:lessonId" element={<LessonPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="charge" element={<ChargePage />} />
          <Route path="world" element={<WorldPage />} />
          <Route path="duel/:trainer" element={<DuelPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="lab" element={<LabPage />} />
          <Route path="pyq" element={<PyqPage />} />
          <Route path="pyq/:track" element={<PyqTrackPage />} />
          <Route path="pyq/:track/practice/:subject?/:tier?" element={<PyqPracticePage />} />
          <Route path="pyq/:track/:year" element={<PyqQuizPage />} />
          <Route path="studio" element={<StudioPage />} />
          <Route path="studio/:track" element={<PyqTrackPage />} />
          <Route path="studio/:track/practice/:subject?/:tier?" element={<PyqPracticePage />} />
          <Route path="studio/:track/:year" element={<PyqQuizPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}