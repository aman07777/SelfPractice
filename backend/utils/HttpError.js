class HttpError extends Error{
    constructor(statusPoint,message){
        super(message)
        this.statusPoint = statusPoint
    }
}
export default HttpError