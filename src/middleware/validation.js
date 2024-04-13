const dataMethods = ['body','query', 'params','headers'];
const validation =(schema)=>{

    return (req, res, next) => {
        const validationArray = [];
        dataMethods.forEach(method => {
        if (schema[method]){
            const validtionResult = schema[method].validate(req[method],{abortEarly:false});
            if(validtionResult.error){
                validationArray.push(validtionResult.error);
            }
        }
    });
      
        if(validationArray.length>0 )
        {
            return res.json({message:"validation error",error:validationArray});
        }
        
        next();
    };
};

export default validation;