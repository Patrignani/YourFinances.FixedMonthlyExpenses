import * as mongoose from "mongoose";
import * as express from "express";
import * as bodyParser from "body-parser";
import { SystemConfig } from '../src/config/system-config';
import fixedMonthlyExpensesRoutes from "./routes/fixed-monthly-expenses-routes";
import * as passport from "./config/auth";
import * as compression from "compression";

const app = express();

app.use(compression());

mongoose.connect(SystemConfig.MONGO_CONNECTION, 
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/cashFlowGroupingRoutes', passport.Authenticate(),fixedMonthlyExpensesRoutes);

export { app };