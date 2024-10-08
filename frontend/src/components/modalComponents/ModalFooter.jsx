import React from 'react'
import './modalComponent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ModalFooter = ({ isDisabled, isSubmitting, aditionalButtons }) => {
  return (
    <div className="footerWrapper mt-4">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-end">
            {aditionalButtons}
            <button type="submit" className={`btnCustom btnPrimaryCustom`} disabled={isDisabled || isSubmitting}>
              Save
              {isSubmitting && (
                <FontAwesomeIcon icon="spinner" transform="left-9" className="hand-pointer spinner ml-3" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
