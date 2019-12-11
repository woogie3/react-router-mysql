import React from 'react';
import ReactDOM from 'react-dom';
import Root from './client/Root';
import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './index.css';

const theme = createMuiTheme ({
    typography: {
        fontFamily:'"Noto Sans KRm serif',
    }
})

ReactDOM.render(<MuiThemeProvider theme ={theme}><Root/></MuiThemeProvider>, document.getElementById('root'));
serviceWorker.unregister();
