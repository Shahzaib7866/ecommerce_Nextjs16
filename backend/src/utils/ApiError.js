//error handling class for api errors


//using Error class of nodejs to handle errors in a better way




class ApiError extends Error{

    //apny constructor me status code or message pass krty hain

    constructor(
        statusCode,
        message
    ){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}