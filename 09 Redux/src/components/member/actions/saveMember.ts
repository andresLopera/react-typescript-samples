import { FormValidationResult } from 'lc-form-validation';
import * as toastr from 'toastr';
import { actionTypes } from '../../../common/constants/actionTypes';
import { MemberEntity } from '../../../model';
import { memberAPI } from '../../../api/member';
import { memberFormValidation } from '../memberFormValidation';

export const saveMemberAction = (member: MemberEntity) => (dispatch) => {
  memberFormValidation.validateForm(member)
    .then((formValidationResult) => {
      if (formValidationResult.succeeded) {
        saveMember(member);
      }
      dispatch(saveMemberActionCompleted(formValidationResult));
    });
};

const saveMember = (member: MemberEntity) => {
  memberAPI.saveMember(member)
    .then(() => {
      toastr.success('Member saved.');
      history.back();
    })
    .catch(toastr.error);
};

const saveMemberActionCompleted = (formValidationResult: FormValidationResult) => ({
  type: actionTypes.SAVE_MEMBER,
  payload: formValidationResult,
});
