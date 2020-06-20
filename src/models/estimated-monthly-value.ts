import { Schema, model } from 'mongoose';
import { IBasic } from './interfaces/basic';
import { IResultModel } from './interfaces/result-model';
import { ResultModel } from './response/result-model';

export interface IEstimatedMonthlyValue extends IBasic {
    identification: string;
    initialDate: Date;
    finalDate: Date;
    noEndDate: boolean;
    value: Number;
    accountId: number;
    cashFlowGrouping: Schema.Types.ObjectId;
}

export function ValidBoxGroup(estimatedMonthlyValue: IEstimatedMonthlyValue): IResultModel<IEstimatedMonthlyValue> {
   
    let value = new ResultModel<IEstimatedMonthlyValue>();

    if (!estimatedMonthlyValue.identification) 
    {
        value.messages.push("Campo Identificação é obigatória!")
    }
    else if(estimatedMonthlyValue.identification.trim().length < 1)
    {
        value.messages.push("Identificação tem que conter no mínimo 1 caracter!")
    } 
    else if (estimatedMonthlyValue.identification.trim().length > 200)
    {
        value.messages.push("Identificação tem que conter no máximo 200 caracter!")
    }

    if(!estimatedMonthlyValue.initialDate)
    {
        value.messages.push("Campo Data inicial é obigatória!")
    }
    if(!estimatedMonthlyValue.finalDate)
    {
        value.messages.push("Campo Data Final é obigatória!")
    }
    if(!estimatedMonthlyValue.value)
    {
        value.messages.push("Campo Valor é obigatória!")
    }
    if(!estimatedMonthlyValue.accountId)
    {
        value.messages.push("Campo Conta Id é obigatória!")
    }
    if(!estimatedMonthlyValue.cashFlowGrouping)
    {
        value.messages.push("Campo Agrupamento de fluxos de caixa é obigatória!")
    }

    value.success = value.messages.length == 0;

    value.data = estimatedMonthlyValue;

    return value;
}

const EstimatedMonthlyValueSchema: Schema = new Schema({
    identification:{
        type: String,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    finalDate: {
        type: Date,
        require: true
    },
    noEndDate:{
        type: Boolean,
        require: false
    },
    value: {
        type: Number,
        require: true
    },
    accountId:
    {
        type: Number,
        require: true
    },
    cashFlowGrouping:
    {
        type: Schema.Types.ObjectId,
        ref: 'CashFlowGrouping',
        require: true
    }
},
    {
        timestamps: true,

    });

export default model<IEstimatedMonthlyValue>('EstimatedMonthlyValue', EstimatedMonthlyValueSchema);
