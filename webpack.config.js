module.exports = {
    // ... autre configuration
    resolve: {
      alias: {
        'browserslist': require.resolve('browserslist') // Résout browserslist directement
      }
    }
};