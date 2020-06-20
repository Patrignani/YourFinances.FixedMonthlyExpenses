import { BasicFilter } from "./basic-filter";

export class CashFlowGroupingFilter extends BasicFilter {

    public Active?: boolean;
    public Identification?: string;
    public TypeBox?: number;


    constructor(req: any, token: any) {
        super(req, token)

        if (req.query) {
            this.Active =this.Filters.active;
            this.Identification = this.Filters.identification;
            this.TypeBox = this.Filters.typeBox;
        }
    }

    async GetAllCashFlowGroupingPerFilter(cashFlow: any) {

        let query;

        if (this.Identification) {
            query = cashFlow
                .find({
                    identification: {
                        $regex: new RegExp(this.Identification), $options: 'i'
                    },
                    accountId: this.AccountId
                });
        }
        else {
            query = cashFlow.find({accountId: this.AccountId});
        }

        if (this.Active)
            query.where("active").equals(this.Active);

        if (this.TypeBox)
            query.where("typeBox").equals(this.TypeBox);

        var perPage = (this.Page - 1) * this.Top;

        return await query
            .sort(this.Sort)
            .skip(perPage)
            .limit(this.Top)
            .exec();
    }

}