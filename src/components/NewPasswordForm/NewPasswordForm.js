import './NewPasswordForm.css';


function NewPasswordForm(){
    return(
        <div className='newpassword-form'>
        <form>
        <div class="input">
           <label for="password" class="form-lable">Password</label>
           <input type="password" class="form-control" placeholder="Enter Your New Password"/>
        </div>
        <div class="input">
           <label for="password" class="form-lable">Confirm Password</label>
           <input type="password" class="form-control" placeholder='Re-Enter Your New Password'/>
        </div>
       </form> 
    </div>
    );
}

export default NewPasswordForm;