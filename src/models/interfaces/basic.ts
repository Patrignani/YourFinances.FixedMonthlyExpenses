export interface IBasic extends Document {
    _id: string;
    createdAt: Date;
    updatedAt: Date;

    save();
}