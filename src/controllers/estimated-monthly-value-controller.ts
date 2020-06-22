import { ResultModel } from "../models/response/result-model";
import EstimatedMonthlyValue, { IEstimatedMonthlyValue, ValidEstimatedMonthlyValue } from "../models/estimated-monthly-value";
import * as  noder from 'noder.io';
import { Ioc } from "../config/ioc";
import CashFlowGrouping from "../models/cash-flow-grouping";
export async function Post(req: any, res: any) {

    let value = new ResultModel<IEstimatedMonthlyValue>();

    try {

        let result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        let estimatedMonthlyValue: IEstimatedMonthlyValue = new EstimatedMonthlyValue(
            {
                active: req.body.active,
                identification: req.body.identification,
                accountId: result.Account_Id,
                editionUserId: result.Id_User,
                initialMonthAndYear: req.body.initialMonthAndYear,
                finalMonthAndYear:req.body.finalMonthAndYear,
                noEndDate: req.body.noEndDate,
                typeRegister:req.body.typeRegister,
                numberDay: req.body.numberDay,
                value: req.body.value,
                cashFlowGrouping: req.body.cashFlowGrouping
            });

        value = ValidEstimatedMonthlyValue(estimatedMonthlyValue);

        if (value.success) {
            await estimatedMonthlyValue.save()
            res.status(201).json(value);
        }
        else {
            res.status(400).json(value);
        }
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}

export async function GetById(req: any, res: any) {
    let value = new ResultModel<IEstimatedMonthlyValue>();
    try {
        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        const estimatedMonthlyValue = await EstimatedMonthlyValue.findOne({ _id: req.params.id, accountId: result.Account_Id });
        var cashFlowGrouping = await CashFlowGrouping.findOne({ _id: estimatedMonthlyValue.cashFlowGrouping, accountId: result.Account_Id });
     
        estimatedMonthlyValue["accountcashFlowGroupingId"] = {};
        estimatedMonthlyValue["cashFlowGrouping"] =cashFlowGrouping;

        value.data = estimatedMonthlyValue;

        res.status(200).json(value);
    }
    catch (e) {
        console.log(e);
        value.success = false;
        value.messages.push("Não foi possível realizara ação");
        res.status(400).send(value);
    }
}