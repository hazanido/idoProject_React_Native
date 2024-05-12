import appInit from "./App";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

appInit().then((app) => {
    if (process.env.NODE_ENV == "development") {
        const options = {
        definition: {
        openapi: "3.0.0",
        info: {
        title: "ido project react",
        version: "1.0.0",
        description: "REST server including authentication using JWT",
        },
        servers: [{url: "http://localhost:"+process.env.PORT,},],
        },
        apis: ["./src/routes/*.ts"],
        };
        const specs = swaggerJsDoc(options);
        app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
       }
   app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
}); 
});

