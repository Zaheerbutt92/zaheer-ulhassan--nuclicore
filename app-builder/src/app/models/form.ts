import { FieldModel } from "./fields";

export interface Form {
    id: string;
    formName: string;
    formData: string;
    date:string;
    fields: FieldModel[];
}