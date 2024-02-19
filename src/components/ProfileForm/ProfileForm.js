import './ProfileForm.css';
import CommonButton from '../CommonButton/CommonButton';

import {Link} from 'react-router-dom';


function ProfileForm(){
    return(
    <div className='profile-form'>
        <div className='form'>
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
        <div className='other-option'>
           <div className='option'>
             <Link to='/LoginGeneralUser'>Change Password</Link>
           </div>
        </div>
        </form>
        </div>
        <div className='edit-and-save'>
             <div className='edit'>
                <CommonButton buttonTitle='Edit'></CommonButton>
             </div>
             <div className='save'>
                <CommonButton buttonTitle='Save Change'></CommonButton>
             </div>
        </div>
    </div>
    );
}

export default ProfileForm;