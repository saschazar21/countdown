import { render } from 'preact';
import { App } from './app';
import './index.css';

const app = document.getElementById('app') as HTMLElement;
render(<App />, app);
