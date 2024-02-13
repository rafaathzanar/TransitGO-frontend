import './SignUpForm.css';

import {Link} from 'react-router-dom';


function SignUpForm(){
    return(
        <div className='signup-form'>
        <form>
        <div class="input name">
            <div className='fn'>
               <label for="firstname" class="form-label">First Name</label>
               <input type="text" class="form-control" placeholder="Enter Your First Name"/>
           </div>
           <div className='ln'>
               <label for="lasttname" class="form-label">Last Name</label>
               <input type="text" class="form-control" placeholder="Enter Your Last Name"/>
           </div>
        </div>
        <div class="input">
           <label for="email" class="form-label">E-mail</label>
           <input type="email" class="form-control" placeholder='Enter Your E-mail'/>
        </div>
        <div class="input">
           <label for="username" class="form-label">User Name</label>
           <input type="text" class="form-control" placeholder='Enter Your User Name'/>
        </div>
        <div class="input">
           <label for="password" class="form-label">Password</label>
           <input type="password" class="form-control" placeholder='Enter Your Password'/>
        </div>
        <div class="input">
           <label for="password" class="form-label">Confirm Password</label>
           <input type="password" class="form-control" placeholder='Enter Your Password'/>
        </div>
        <div className='other-option'>
           <label for="text" class="form-label">Already Have an Account?</label>
           <div className='option'>
             <Link to='/LoginGeneralUser'>Login</Link>
           </div>
        </div>
       </form> 
    </div>
    );
}

export default SignUpForm;