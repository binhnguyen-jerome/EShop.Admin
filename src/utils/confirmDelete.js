import Swal from "sweetalert2";

const confirmDelete = async (id, deleteCallback) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover this product!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, keep it",
  });

  if (result.isConfirmed) {
    try {
      await deleteCallback(id);
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "There was an error deleting this product.", "error");
    }
  }
};

export default confirmDelete;
