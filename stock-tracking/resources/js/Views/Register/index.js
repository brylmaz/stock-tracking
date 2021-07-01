import React from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
const Register = () => {

    const handleSubmit = (values) => {
        axios.post('/api/auth/register', { ...values })
            .then((res) => {
                if (res.data.success) {
                    const userData = {
                        id: res.data.id,
                        name: res.data.name,
                        email: res.data.email,
                        access_token:res.data.access_token
                    };
                    const appState = {
                        isLoggedIn:true,
                        user:userData
                    };

                }
                else {
                    alert('Giriş Yapamadınız')
                }
            })
            .catch(error => {
                console.log(error)
            });
    }
    return (
        <div style={{ maxWidth: 330, textAlign: 'center' }} className=" justify-content-center">
            <div class="form-signin">
                <img class="mb-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
                <h1 class="h3 mb-3 font-weight-normal">Hemen Kayıt Ol</h1>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        password_confirmation: ''
                    }}
                    onSubmit={handleSubmit}
                    validationSchema={
                        Yup.object().shape({
                            email: Yup
                                .string()
                                .email('Email Formatı Hatalı')
                                .required('Email Zorunludur'),
                            name: Yup
                                .string()
                                .required('Ad Soyad Zorunludur'),
                            password: Yup
                                .string()
                                .required('Şifre Zorunldur'),
                            password_confirmation: Yup
                                .string()
                                .oneOf([Yup.ref('password'), null], 'Şifreler Eşleşmiyor')

                        })
                    }
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        handleBlur,
                        errors,
                        isValid,
                        isSubmitting,
                        touched
                    }) => (

                        <div>
                            <div className="form-group">
                                <label for="inputEmail" class="sr-only">Ad Soyad</label>
                                <input type="text" name="name" class="form-control" placeholder="Ad Soyad" value={values.name} onChange={handleChange('name')} onBlur={handleBlur} />
                                {(errors.name && touched.name) && <p>{errors.name}</p>}
                            </div>
                            <div className="form-group">
                                <label for="inputEmail" class="sr-only">Email adres</label>
                                <input type="email" class="form-control" placeholder="Email adres" value={values.email} onChange={handleChange('email')} />
                                {(errors.email && touched.email) && <p>{errors.email}</p>}
                            </div>
                            <div class="form-group">
                                <label for="inputPassword" class="sr-only">Şifre</label>
                                <input type="password" class="form-control" placeholder="Şifre" value={values.password} onChange={handleChange('password')} />
                                {(errors.password && touched.password) && <p>{errors.password}</p>}
                            </div>
                            <div class="form-group">
                                <label for="inputPassword" class="sr-only">Şifre Tekrarı</label>
                                <input type="password" class="form-control" placeholder="Şifre Tekrarı" value={values.password_confirmation} onChange={handleChange('password_confirmation')} />
                                {(errors.password_confirmation && touched.password_confirmation) && <p>{errors.password_confirmation}</p>}
                            </div>


                            <button class="btn btn-lg btn-primary btn-block" type="button" onClick={handleSubmit} disabled={!isValid || isSubmitting}>Kayıt Ol</button>
                        </div>
                    )}
                </Formik>
                <Link className="mt-3" style={{ display: "block" }} to="/login">Giriş Yap</Link>
                <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
            </div>
        </div>
    )
};
export default Register;

