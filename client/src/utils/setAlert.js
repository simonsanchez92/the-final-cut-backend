import toastr from "toastr";
import "../toastr.min.css";

const setAlert = (type, msg) => {
  toastr.options = {
    hideDuration: 800,
    preventDuplicates: true,
    hideEasing: "linear",
    newestOnTop: false,
    timeOut: 1300,
    positionClass: "toast-bottom-center",
  };

  switch (type) {
    case "success":
      return toastr.success(`${msg}`);

    case "deleted":
    case "error": {
      return toastr.error(`${msg}`);
    }
    case "warning":
      return toastr.warning(`${msg}`);
    default:
      return;
  }
};

export default setAlert;
