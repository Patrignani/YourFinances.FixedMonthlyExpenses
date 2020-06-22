import { Schema, model } from 'mongoose';
import { IBasic } from './interfaces/basic';
import { IResultModel } from './interfaces/result-model';
import { ResultModel } from './response/result-model';

export interface IEstimatedMonthlyValue extends IBasic {
    identification: string;
    initialMonthAndYear: Date;
    finalMonthAndYear: Date;
    noEndDate: boolean;
    typeRegister: Number;
    numberDay: Number;
    value: Number;
    accountId: Number;
    active: boolean;
    editionUserId: Number;
    cashFlowGrouping: Schema.Types.ObjectId;
}

export function ValidEstimatedMonthlyValue(estimatedMonthlyValue: IEstimatedMonthlyValue): IResultModel<IEstimatedMonthlyValue> {

    let value = new ResultModel<IEstimatedMonthlyValue>();

    if (!estimatedMonthlyValue.identification) {
        value.messages.push("Campo Identificação é obigatória!")
    }
    else if (estimatedMonthlyValue.identification.trim().length < 1) {
        value.messages.push("Identificação tem que conter no mínimo 1 caracter!")
    }
    else if (estimatedMonthlyValue.identification.trim().length > 200) {
        value.messages.push("Identificação tem que conter no máximo 200 caracter!")
    }

    if (!estimatedMonthlyValue.value) {
        value.messages.push("Campo Valor é obigatória!")
    }
    if (!estimatedMonthlyValue.accountId) {
        value.messages.push("Campo Conta Id é obigatória!")
    }
    if (!estimatedMonthlyValue.cashFlowGrouping) {
        value.messages.push("Campo Agrupamento de fluxos de caixa é obigatória!")
    }

    if (!estimatedMonthlyValue.typeRegister || estimatedMonthlyValue.typeRegister <= 0) {
        value.messages.push("Campo Tipo de Registro é obigatória!")
    }
    else if (estimatedMonthlyValue.typeRegister > 3) {
        value.messages.push("Campo Tipo de Registro é invalido!")
    }
    else{
        switch (estimatedMonthlyValue.typeRegister) {
            case 1:
                if (!estimatedMonthlyValue.initialMonthAndYear) {
                    value.messages.push("Campo Mês e Ano inicial é obigatória!")
                }
                if (!estimatedMonthlyValue.finalMonthAndYear && !estimatedMonthlyValue.noEndDate) {
                    value.messages.push("Campo Mês e Ano Final é obigatória!")
                }
                break;
            case 2:
            case 3:
    
                if (!estimatedMonthlyValue.numberDay || estimatedMonthlyValue.numberDay <= 0) {
                    value.messages.push("Campo de Dias é obigatória!")
                }
                break;
        }    
    }
    if (!estimatedMonthlyValue.active) {
        value.messages.push("Campo 'Ativo?' é obigatória!")
    }
    if (!estimatedMonthlyValue.editionUserId) {
        value.messages.push("Id do usuário de edição é obigatória!")
    }

    value.success = value.messages.length == 0;

    value.data = estimatedMonthlyValue;

    return value;
}

const EstimatedMonthlyValueSchema: Schema = new Schema({
    identification: {
        type: String,
        require: true
    },
    initialMonthAndYear: {
        type: Date,
        require: false
    },
    finalMonthAndYear: {
        type: Date,
        require: false
    },
    noEndDate: {
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
    typeRegister:
    {
        type: Number,
        require: true
    },
    numberDay:
    {
        type: Number,
        require: false
    },
    active:
    {
        type: Boolean,
        require: true
    },
    editionUserId:
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

EstimatedMonthlyValueSchema.index({ identification: 1, accountId: 1 }, { unique: true });

export default model<IEstimatedMonthlyValue>('EstimatedMonthlyValue', EstimatedMonthlyValueSchema);
