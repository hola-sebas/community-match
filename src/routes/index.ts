/**
 * @author Danny Palma
 * @fileoverview Creates the routes
 */

import { Application, Request, Response, ErrorRequestHandler, NextFunction } from "express";
import routerMain from "./main/main.router";
import routerUsers from "./users/users.router";
import routerGui from "./gui/gui.router";
import routerProjects from "./projects/projects.router";
import routerPayment from "./pay/pay.router";

export default class routes {
    constructor(private app: Application) {
        this.app.use(routerMain);
        this.app.use('/users', routerUsers);
        this.app.use('/projects', routerProjects);
        this.app.use('/pago', routerPayment);
        if (process.env.NODE_ENV != 'production') this.developmentRoutes();
        this.errors();
    };
    private developmentRoutes(): void {
        this.app.use('/gui', routerGui);
    };
    private errors(): void {
        // Error 404
        this.app.use((req: Request, res: Response) => {
            return res.status(404).json({ error: 'the page noesn\'t exist' });
        });
        // Error 500
        this.app.use((error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
            console.log(error)
            res.status(500).json({ error: 'something wrong :(', details: error.toString() });
            return next();
        });
    };
};
