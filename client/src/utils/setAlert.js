import toastr from 'toastr';
import '../toastr.min.css';


const setAlert = (type, msg) => {
    toastr.options = {
        hideDuration: 800,
        
        timeOut: 3000,
        positionClass: 'toast-bottom-center'
      }

      if(type === 'success'){
        return toastr.success(`${msg}`, '')
      }else if(type === 'deleted' || type === 'error'){
          return toastr.error(`${msg}`,'')
      }

}


export default setAlert
