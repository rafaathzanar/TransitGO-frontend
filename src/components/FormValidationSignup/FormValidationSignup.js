import { Message } from "@mui/icons-material";
import { isValid } from "date-fns";
import { Form } from "react-router-dom";


const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const phoneRegex = /^\d{10}$/;

export const validateFname = (fname) => {
    if (!fname.trim()) {
        return { isValid: false, Message: "First Name Required!." };
    }
    if (/\d/.test(fname)) {
        return { isValid: false, Message: "First Name should not contain numbers!." };
    }
    return { isValid: true, Message: "" };
}

export const validateLname = (lname) => {
    if (!lname.trim()) {
        return { isValid: false, Message: "Last Name Required!." };
    }
    if (/\d/.test(lname)) {
        return { isValid: false, Message: "Last Name should not contain numbers!." };
    }
    return { isValid: true, Message: "" };
}

export const validateUsername = (username) => {
    if (!username.trim()){
        return { isValid: false, Message: "Username is required." };
    }
    else if (username.length < 3){
        return { isValid: false, Message: "Username must be at least 3 characters long." };
    }
    return { isValid: true, Message: "" };
}

export const validateEmail = (email) => {
    if (!email.trim()) {
        return { isValid: false, Message: "Email is required." };
    }
    else if (!emailRegex.test(email)){
        return { isValid: false, Message: "Invalid email address." };
    }
    return { isValid: true, Message: "" };
}

export const validatePassword = (password) => {
    if (!password.trim()){
        return { isValid: false, Message: "Password is required." };
    }
    else if (password.length < 6){
        return { isValid: false, Message: "Password must be at least 6 characters long." };
    }
    return { isValid: true, Message: "" };
}

export const validateConfirmpassword = (password,confirmpassword)=> {
    if (!confirmpassword.trim()){
        return { isValid: false, Message: "Confirm Password is required." };
    }
    else if (confirmpassword !== password){
        return { isValid: false, Message: "Password does not match." };
    }
    return { isValid: true, Message: "" };
}

export const validatePhoneNumber = (phone) => {
    if (!phone.trim()) {
        return { isValid: false, Message: "Phone number is required." };
    }
    else if (!phoneRegex.test(phone)) {
        return { isValid: false, Message: "Invalid phone number. It must be 10 digits long." };
    }
    return { isValid: true, Message: "" };
}