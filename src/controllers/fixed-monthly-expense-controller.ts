import { ResultModel } from "../models/response/result-model";
import EstimatedMonthlyValue, { IFixedMonthlyExpense, ValidFixedMonthlyExpense } from "../models/fixed-monthly-expense";
import * as  noder from 'noder.io';
import { Ioc } from "../config/ioc";
import CashFlowGrouping from "../models/cash-flow-grouping";
import { EstimatedMonthlyValueFilter } from "../models/filters/estimated-monthly-value-filter";

export async function Post(req: any, res: any) {

    let value = new ResultModel<IFixedMonthlyExpense>();

    try {

        let result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        let estimatedMonthlyValue: IFixedMonthlyExpense = new EstimatedMonthlyValue(
            {
                active: req.body.active,
                identification: req.body.identification,
                accountId: result.Account_Id,
                editionUserId: result.Id_User,
                initialMonthAndYear: req.body.initialMonthAndYear,
                finalMonthAndYear: req.body.finalMonthAndYear,
                noEndDate: req.body.noEndDate,
                typeRegister: req.body.typeRegister,
                numberDay: req.body.numberDay,
                value: req.body.value,
                cashFlowGrouping: req.body.cashFlowGrouping
            });

        value = ValidFixedMonthlyExpense(estimatedMonthlyValue);

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
    let value = new ResultModel<IFixedMonthlyExpense>();
    try {
        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        const estimatedMonthlyValue = await EstimatedMonthlyValue
        .findOne({ _id: req.params.id, accountId: result.Account_Id })
        .populate({
            path: "cashFlowGrouping",
            select: ['_id', 'identification', 'typeBox'],
        });
    
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

export async function GetAll(req: any, res: any) {
    try {

        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        var filter = new EstimatedMonthlyValueFilter(req, result);
        var object: IFixedMonthlyExpense[] = await filter.GetAllPerFilter(EstimatedMonthlyValue);

        res.status(200).json(object);
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
}

export async function ActiveInactive(req: any, res: any) {
    let value = new ResultModel<IFixedMonthlyExpense>();
    try {

        const estimatedMonthlyValue = await EstimatedMonthlyValue.findOne({ _id: req.params.id });

        if (estimatedMonthlyValue) {
            var result = noder.$inject(Ioc.TOKEN, function (user) {
                return user;
            });

            estimatedMonthlyValue.active = req.query.active;
            estimatedMonthlyValue.editionUserId = result.Id_User;
        }

        await estimatedMonthlyValue.save();

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

export async function Delete(req: any, res: any) {
    let value = new ResultModel<IFixedMonthlyExpense>();
    try {
        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        const estimatedMonthlyValue = await EstimatedMonthlyValue.findOne({ _id: req.params.id, accountId: result.Account_Id });
        estimatedMonthlyValue.delete();
        await estimatedMonthlyValue.save();

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

export async function Update(req: any, res: any) {
    let value = new ResultModel<IFixedMonthlyExpense>();
    try {

        var result = noder.$inject(Ioc.TOKEN, function (user) {
            return user;
        });

        const estimatedMonthlyValue = await EstimatedMonthlyValue.findOne({ _id: req.params.id, accountId: result.Account_Id });

        if (estimatedMonthlyValue) {

            estimatedMonthlyValue.active = req.body.active;
            estimatedMonthlyValue.identification = req.body.identification;
            estimatedMonthlyValue.editionUserId = result.Id_User;
            estimatedMonthlyValue.initialMonthAndYear = req.body.initialMonthAndYear;
            estimatedMonthlyValue.finalMonthAndYear = req.body.finalMonthAndYear;
            estimatedMonthlyValue.noEndDate = req.body.noEndDate;
            estimatedMonthlyValue.typeRegister = req.body.typeRegister;
            estimatedMonthlyValue.numberDay = req.body.numberDay;
            estimatedMonthlyValue.value = req.body.value;
            estimatedMonthlyValue.cashFlowGrouping = req.body.cashFlowGrouping;

            value = ValidFixedMonthlyExpense(estimatedMonthlyValue);

            if (value.success) {
                await estimatedMonthlyValue.save();

                value.data = estimatedMonthlyValue;
                res.status(200).json(value);
            }
            else {
                res.status(400).json(value);
            }
        }
        else {
            value.messages.push("Não foi encontrado nenhum registro com esse Id");
            value.success = false;
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

