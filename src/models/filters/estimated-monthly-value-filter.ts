import { BasicFilter } from "./basic-filter";

export class EstimatedMonthlyValueFilter extends BasicFilter {

    public Active?: boolean;
    public Identification?: string;
    public TypeRegister?: number;
    public CashFlowGrouping?: string;

    constructor(req: any, token: any) {

        super(req, token)

        if (req.query) {
            this.Active = this.Filters.active;
            this.Identification = this.Filters.identification;
            this.TypeRegister = this.Filters.typeBox;
            this.CashFlowGrouping = this.Filters.cashflowgrouping;
        }
    }

    async GetAllPerFilter(estimatedMonthly: any) {

        let query;

        if (this.Identification) {
            query = estimatedMonthly
                .find({
                    identification: {
                        $regex: new RegExp(this.Identification), $options: 'i'
                    },
                    accountId: this.AccountId
                });
        }
        else {
            query = estimatedMonthly.find({ accountId: this.AccountId });
        }

        query.populate({
            path: "cashFlowGrouping",
            match: this.CashFlowGrouping ? {
                identification: {
                    $regex: new RegExp(this.CashFlowGrouping), $options: 'i'
                },
                accountId: this.AccountId
            } : true,
            select: ['_id', 'identification', 'typeBox'],
        })

        if (this.Active)
            query.where("active").equals(this.Active);

        if (this.TypeRegister)
            query.where("typeRegister").equals(this.TypeRegister);

        var perPage = (this.Page - 1) * this.Top;

        var estimed = await query
            .sort(this.Sort)
            .skip(perPage)
            .limit(this.Top)
            .exec();

        return estimed.filter((value) => value.cashFlowGrouping != null);
    }

}