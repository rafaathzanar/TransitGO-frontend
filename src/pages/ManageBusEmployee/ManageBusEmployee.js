import CRUDtableBus from '../../components/CRUDtableBus/CRUDtableBus';
import Navbar from '../../components/navbar/Navbar';
import './ManageBusEmployee.css';

function ManageBusEmployee(){
    return(
        <div className='ManageBusEmployee'>
          <div className='nav-bar'>
            <Navbar></Navbar>
          </div>
          <div className='main'>
              <div className='main-header'>
                 <div className='main-left'>
                     <h5>Search bar</h5>
                 </div>
                 <div className='main-right'>
                    <div className='main-right-notification'>
                      <h5>notification icon</h5>
                    </div>
                    <div className='main-right-profile'>
                      <h5>profile icon</h5>
                    </div>
                 </div>
              </div>
              <div className='main-subject'>
                    <CRUDtableBus></CRUDtableBus>
              </div>
          </div>
        </div>
    );
}

export default ManageBusEmployee;