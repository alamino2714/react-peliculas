import { BrowserRouter } from 'react-router';
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import "./App.css";
import Menu from "./componentes/Menu";
import AppRoute from './AppRoute';

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="container">
            <AppRoute/>          
        </div>
      </BrowserRouter>
    </>
  )
}


