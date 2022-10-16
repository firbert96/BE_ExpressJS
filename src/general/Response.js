module.exports = {
    Format(status,message,param){
        let error = null;
        let data = null;
        if(status){
            data = param; 
        }
        else {
            error = param;
        }
        return {
            status,
            message,
            data,
            error,
        };
    }
}