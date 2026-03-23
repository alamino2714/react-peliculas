import '../node_modules/bootstrap/dist/css/bootstrap.css'
import "./App.css";
import Menu from "./componentes/Menu";
import AppRoute from './AppRoute';
import { HashRouter } from 'react-router';

export default function App() {

  return (
    <>
       <HashRouter>
        <Menu />
        <div className="container mb-4">
            <AppRoute/>          
        </div>
        </HashRouter>
      
    </>
  )
}


