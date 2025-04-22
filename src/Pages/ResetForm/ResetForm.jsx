import css from './ResetForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { resetPassword } from '../../api/api';
import toast from 'react-hot-toast';
YupPassword(Yup);

const initialValues = {
  password: '',
  confirmPassword: '',
};

const resetPasswordFormSchema = Yup.object().shape({
  password: Yup.string().password().required('Required'),
  confirmPassword: Yup.string()
    .password()
    .test({
      name: 'comparePasswords',
      message: 'Passwords do not match',
      test: (value, context) => value === context.parent.password,
    })
    .required('Required'),
});

const ResetForm = () => {
  const token = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    token.current = searchParams.get('token');
    console.log(`token = ${token.current}`);
    const hasToken = Boolean(token.current);
    if (!hasToken) navigate('/404', { replace: true });
  }, [searchParams, navigate, token]);

  const handleSubmit = ({ password }, actions) => {
    const creds = {
      token: token.current,
      password,
    };
    resetPassword(creds).then(data => {
      console.log('data = ', data);
      navigate('/');
      toast.success('Password has been successfully reset.', {
        duration: 4000,
      });
    });
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={resetPasswordFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.resetPwdForm}>
        <h2>Reset your password</h2>
        <label className={css.pwdItem}>
          <span className={css.inputLabel}>Password</span>
          <Field
            className={css.pwdInput}
            type="password"
            name="password"
            autoComplete="new-password"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="password"
            component="span"
          />
        </label>
        <label className={css.pwdItem}>
          <span className={css.inputLabel}>Confirm</span>
          <Field
            className={css.pwdInput}
            type="password"
            name="confirmPassword"
            autoComplete="new-confirm-password"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="confirmPassword"
            component="span"
          />
        </label>
        <button className={css.submitBtn} type="submit">
          Submit
        </button>
      </Form>
    </Formik>
  );
};
export default ResetForm;
