import axios from "axios";
import swal from "sweetalert";

export const handleAddToCart = (data) => {
  axios.post(`api/v1/add-to-cart`, data).then((res) => {
    if (res.data.status === 201) {
      swal("Success", res.data.message, "success");
    } else if (res.data.status === 409) {
      swal("Success", res.data.message, "success");
    } else if (res.data.status === 401) {
      swal("Error", res.data.message, "error");
    } else if (res.data.status === 404) {
      swal("Warning", res.data.message, "warning");
    }
  });
};
