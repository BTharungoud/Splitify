import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fe4066', // Change this to your desired primary color
    },
  },
});
// theme.components = {
//   MuiTextField: {
//     styleOverrides: {
//       root: {
//         '& .MuiOutlinedInput-notchedOutline': {
//           borderColor: 'white', // Change this to your desired border color
//         },
//         '&:hover .MuiOutlinedInput-notchedOutline': {
//           borderColor: 'white', // Change this to your desired border color on hover
//         },
//       },
//     },
//   },
// };
// theme.overrides = {
//   MuiInputLabel: {
//     root: {
//       color: 'white', // Change this to your desired label text color
//     },
//   },
//   MuiInput: {
//     root: {
//       '&::placeholder': {
//         color: 'white', // Change this to your desired placeholder text color
//       },
//     },
//   },
// };
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
