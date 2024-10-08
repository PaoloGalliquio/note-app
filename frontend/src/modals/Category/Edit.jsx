import React, { useContext, useState } from "react";
import { ModalForm } from "../../components/modalComponents/ModalForm";
import { usePropsInputs } from "../../hooks/useProps/usePropsInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteCategoryAPI, updateCategoryAPI } from "../../consumers/backendApisUrls";
import { AuthContext } from "../../hooks/context/authContext";
import { useManagePutRequest } from "../../hooks/useManagePutRequest/useManagePutRequest";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useManageDeleteRequest } from "../../hooks/useManageDeleteRequest/useManageDeleteRequest";
import InputText from "../../components/Inputs/InputText";

export const Edit = ({ category, toggleModal, onChangeCategory, refreshPage }) => {
  const { state } = useContext(AuthContext);
  const [isSending, setIsSending] = useState(false);
  const [formValues, setFormValues] = useState(category);
  const [commomProps] = usePropsInputs(formValues, setFormValues);
  const [executePut] = useManagePutRequest();
  const [executeDelete] = useManageDeleteRequest();

  function handleEdit(e) {
    e.preventDefault();
    onChangeCategory(formValues);
  }

  async function handleEdit(e) {
    setIsSending(true);
    e.preventDefault();
    const payload = { ...formValues, userId: state.user.id };
    const response = await executePut(updateCategoryAPI(formValues.id), payload, refreshPage, true);
    if (response.status === 200) {
      await refreshPage();
      toggleModal();
    }
    setIsSending(false);
  }

  async function handleDelete(e) {
    setIsSending(true);
    e.preventDefault();
    const response = await executeDelete(deleteCategoryAPI(formValues.id), refreshPage, true);
    if (response.status === 200) {
      await refreshPage();
      toggleModal();
    }
    setIsSending(false);
  }

  const deleteButton = (
    <button className={`btnCustom btnPrimaryOutlinedCustom me-3`} disabled={isSending} onClick={handleDelete}>
      Delete
      {isSending && <FontAwesomeIcon icon={faCircleNotch} transform="left-9" className="hand-pointer spinner ml-3" />}
    </button>
  );

  return (
    <ModalForm
      onSubmit={handleEdit}
      showModal={toggleModal}
      title="Edit category"
      saveButtonDisabled={isSending}
      aditionalFooterButtons={deleteButton}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <InputText label="Category" {...commomProps("name")} />
          </div>
          <div className="col-md-12 mt-3">
            <InputText label="Icon" {...commomProps("icon")} />
          </div>
        </div>
      </div>
    </ModalForm>
  );
};
