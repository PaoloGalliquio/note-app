import React from 'react'
import "./modalComponent.css";
import { ModalFooter } from './ModalFooter';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

export const ModalForm = ({
  onSubmit,
  showModal,
  title,
  isSubmitting = false,
  children,
  saveButtonDisabled = false,
  aditionalFooterButtons,
}) => {
  return (
    <div className="modalFormWrapper">
      <div className="modalFormHeader mb-3">
        <div className="container mb-2">
          <div className="row">
            <div className="col">
              <h2>{title}</h2>
            </div>
            <div className="col">
              <div className="text-end">
                <FontAwesomeIcon
                  size="lg"
                  icon={faCircleXmark}
                  className="cursorPointer closeButton"
                  onClick={() => showModal()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modalFormContent">
        <div className="modalBody">
          <form onSubmit={onSubmit}>
            {children}
            <ModalFooter
              isSubmitting={isSubmitting}
              isDisabled={saveButtonDisabled}
              aditionalButtons={aditionalFooterButtons}
            />
          </form>
        </div>
      </div>
    </div>
  );
};
