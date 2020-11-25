/* process.on('unhandledRejection', (_reason, promise) => {
    console.log('ocurrio una exepcion inesperada en: ', promise);
});
process.on('uncaughtException', (error) => {
    console.log('ocurrio una exepcion inesperada: ', error);
    process.exit();
});

import App from './app';

let app = new App();

app.listen(); */

const express = require('express');
const expbhs = require('express-handlebars')
const path = require('path')

// Initializations
const app = express();

// Settings
app.set('views', path.join(__dirname, 'views'))
app.engine('hsb', expbhs({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialDir: path.join(app.get('views'), 'layouts'),
}))

// Start Server
app.listen(3000, () => {
    console.log('Server on port', 3000)
})
