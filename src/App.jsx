import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Navbar from './components/Navbar';
import AprovacaoRH from './components/AprovacaoRH';
import FormularioSolicitacao from './components/FormularioSolicitacao';
import ProtectedRoute from './components/ProtectedRoute';

// Páginas
import Dashboard from './pages/Dashboard';
import DashboardRh from './pages/DashboardRh';
import DashboardColaborador from './pages/DashboardColaborador';
import VacationRequest from './pages/VacationRequest';
import VacationHistory from './pages/VacationHistory';
import NovaSolicitacao from './pages/NovaSolicitacao';
import AbonoRequest from './pages/AbonoRequest';
import FolgaRequest from './pages/FolgaRequest';
import Home from './pages/Home';
import Cadastro from './pages/Cadastro';
import EscolhaLogin from './pages/EscolhaLogin';
import LoginColaborador from './pages/LoginColaborador';
import LoginRh from './pages/LoginRh';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Página inicial */}
        <Route path="/" element={<Home />} />

        {/* Login e cadastro */}
        <Route path="/login" element={<EscolhaLogin />} />
        <Route path="/login-colaborador" element={<LoginColaborador />} />
        <Route path="/login-rh" element={<LoginRh />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Dashboard principal */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Dashboards específicos */}
        <Route
          path="/dashboard-rh"
          element={
            <ProtectedRoute>
              <DashboardRh />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-colaborador"
          element={
            <ProtectedRoute>
              <DashboardColaborador />
            </ProtectedRoute>
          }
        />

        {/* Funcionalidades */}
        <Route path="/ferias" element={<VacationRequest />} />
        <Route path="/historico" element={<VacationHistory />} />
        <Route path="/solicitacao" element={<NovaSolicitacao />} />
        <Route path="/abono" element={<AbonoRequest />} />
        <Route path="/folga" element={<FolgaRequest />} />
        <Route path="/aprovacao" element={<AprovacaoRH />} />
        <Route path="/formulario" element={<FormularioSolicitacao />} />
      </Routes>
    </Router>
  );
}

export default App;