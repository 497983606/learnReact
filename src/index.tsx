import ReactDOM from 'react-dom/client';
import './assets/rest.css';
import './assets/cover.scss';
import Org from './views/org/Index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render( <Org /> );

