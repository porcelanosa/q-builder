import {ElMessage} from 'element-plus';

export const successMsg = ({msg, close = true}) => {
  ElMessage({
    showClose: close,
    message: msg,
    type: 'success',
    duration: 5000
  });
};
export const warningMsg = ({msg, close = true}) => {
  ElMessage({
    showClose: close,
    message: msg,
    type: 'warning',
    duration: 0
  });
};
export const useMsg = ({msg, close = true}) => {
  ElMessage({
    showClose: close,
    message: msg,
    type: 'warning',
    duration: 0
  });
};

