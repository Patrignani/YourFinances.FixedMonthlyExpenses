import { Schema, model } from 'mongoose';
import { IBasic } from './interfaces/basic';
import { IResultModel } from './interfaces/result-model';
import { ResultModel } from './response/result-model';

export enum TypeBox {
    Output = -1,
    Input = 1
};

export interface ICashFlowGrouping extends IBasic {
    active: boolean;
    identification: string;
    accountId: number;
    typeBox: number;
    editionUserId:number;
}

export function ValidCashFlowGrouping (cashFlowGrouping: ICashFlowGrouping) : IResultModel<ICashFlowGrouping> {

    let value = new ResultModel<ICashFlowGrouping>();


    if (!cashFlowGrouping.identification) 
    {
        value.messages.push("Campo Identificação é obigatória!")
    }
    else if(cashFlowGrouping.identification.trim().length < 1)
    {
        value.messages.push("Identificação tem que conter no mínimo 1 caracter!")
    } 
    else if (cashFlowGrouping.identification.trim().length > 200)
    {
        value.messages.push("Identificação tem que conter no máximo 200 caracter!")
    }

    if(cashFlowGrouping.active == null || cashFlowGrouping.active == undefined)
    {
        value.messages.push("Campo Ativo é obigatória!")
    }

    if(!cashFlowGrouping.accountId)
    {
        value.messages.push("Campo Conta Id é obigatória!")
    }

    if(!cashFlowGrouping.typeBox)
    {
        value.messages.push("Campo Tipo de Caixa é obigatória!")
    }

    if(cashFlowGrouping.typeBox != -1 && cashFlowGrouping.typeBox != 1)
    {
        value.messages.push("Campo Tipo de Caixa é inválido!")
    }

    value.success = value.messages.length == 0;

    value.data = cashFlowGrouping;

    return value;

}

const CashFlowGroupingSchema: Schema = new Schema({
    identification: {
        type: String,
        require: true
    },
    active: {
        type: Boolean,
        require: true
    },
    accountId:
    {
        type: Number,
        require: true
    },
    typeBox: {
        type: Number,
        require: true
    },
    editionUserId:
    {
        type: Number,
        require: true
    }
},
{
    timestamps: true,
});

    export default model<ICashFlowGrouping>('CashFlowGrouping', CashFlowGroupingSchema);