const appInit = require("./App");


appInit().then((app) => {
   app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
}); 
});

