import joi from "joi";


export const signupSchema ={
    body: joi.object({
        userName:joi.string().alphanum().min(3).max(20).required().messages({
            "string.empty": "username is required",
            "any.required": "username is required"
        }),
        email:joi.string().email().required(),
        password:joi.string().min(5).max(20).required(),
        cPassword:joi.valid(joi.ref('password')).required(),
        }),

    // query:joi.object({
    //     test:joi.boolean().required()
    // })

};

export const signinSchema = 
{
    body:joi.object({
        email:joi.string().email().required(),
        password:joi.string().min(5).max(20).required(),
        })
};