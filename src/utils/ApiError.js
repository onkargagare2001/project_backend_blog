class ApiError extends Error{
    constructor(statuscode,errors=[],message,stack=""){
        super(message);
        this.statuscode=statuscode;
        this.success=false;
        this.errors=errors;

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}