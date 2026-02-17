const validator=require("validator");


const ValidateSignUpData=(req) =>
{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName||!lastName||!emailId)
    {
        throw new Error("Name is not valid!");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("email id is not valid!")

    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Not a valid password!");
    }
};
const validateEditFields = (req) => {
    const allowed_updates = ["firstName", "lastName", "age", "photoUrl", "about", "skills"];

    const isUpdateAllowed = Object.keys(req.body).every((field) =>
        allowed_updates.includes(field)
    );

    return isUpdateAllowed;
};

module.exports=
{
    ValidateSignUpData,
    validateEditFields,
}