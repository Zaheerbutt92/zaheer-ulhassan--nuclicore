export default class ApiResponse<T> {
    constructor(data:T,statusCode:HttpStatusCode,message:string) {
        this.data = data;
        this.statusCode = statusCode;
        this.message= message;
    }
    data?: T;
    statusCode: HttpStatusCode;
    message?:string; 
}
 
export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    Error=500
}