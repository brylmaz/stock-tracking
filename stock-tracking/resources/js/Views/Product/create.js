import { inject, observer } from 'mobx-react';
import React, { useEffect,useState } from 'react';
import Layout from '../../Components/Layout/front.layout';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../Components/Form/CustomInput';
import Select from 'react-select';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const Create = (props) => {

    const [categories, setCategories] = useState([
        
    ]);

    useEffect(() => {

        axios.get(`/api/product/create`,{
            headers: {
                Authorization: 'Bearer ' + props.AuthStore.appState.user.access_token
            }
        }).then((res) => {
            setCategories(res.data.categories);
        })
            .catch(e => {
                console.log(e);
            });
    }, [])

    const handleSubmit = () => {

    };

    return (
        <>
            <Layout>
                <div className="content">
                    <div className="container">
                        <Formik
                            initialValues={{

                                email: '',
                                password: ''

                            }}
                            onSubmit={handleSubmit}
                            validationSchema={
                                Yup.object().shape({
                                    email: Yup
                                        .string()
                                        .email('Email Formatı Hatalı')
                                        .required('Email Zorunludur'),

                                    password: Yup
                                        .string()
                                        .required('Şifre Zorunludur')


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
                                setFieldValue,
                                isSubmitting,
                                touched
                            }) => (

                                <div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <Select 
                                                onChange={(e) => setFieldValue('categoryId',e.id)}
                                                placeholder={"Ürün Kategorisi Seçiniz"}
                                                getOptionLabel={option => option.name}
                                                getOptionValue={option => option.id}
                                                options={categories} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="Ürün Adı"
                                                value={values.name}
                                                handleChange={handleChange('name')}
                                            />
                                            {(errors.name && touched.name) && <p>{errors.name}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="Ürün Model Kodu"
                                                value={values.modelCode}
                                                handleChange={handleChange('modelCode')}
                                            />
                                            {(errors.modelCode && touched.modelCode) && <p>{errors.modelCode}</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="Barkod"
                                                value={values.barcode}
                                                handleChange={handleChange('barcode')}
                                            />
                                            {(errors.barcode && touched.barcode) && <p>{errors.barcode}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="Marka"
                                                value={values.brand}
                                                handleChange={handleChange('brand')}
                                            />
                                            {(errors.brand && touched.brand) && <p>{errors.brand}</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="Stok"
                                                type="number"
                                                value={values.stock}
                                                handleChange={handleChange('stock')}
                                            />
                                            {(errors.stock && touched.stock) && <p>{errors.stock}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="KDV"
                                                value={values.tax}
                                                handleChange={handleChange('tax')}
                                            />
                                            {(errors.tax && touched.tax) && <p>{errors.tax}</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="Alış Fiyatı"
                                                type="number"
                                                value={values.buyingPrice}
                                                handleChange={handleChange('buyingPrice')}
                                            />
                                            {(errors.buyingPrice && touched.buyingPrice) && <p>{errors.buyingPrice}</p>}
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                title="Satış Fiyatı"
                                                type="number"
                                                value={values.sellingPrice}
                                                handleChange={handleChange('sellingPrice')}
                                            />
                                            {(errors.sellingPrice && touched.sellingPrice) && <p>{errors.sellingPrice}</p>}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <CustomInput
                                                title="Açıklama"
                                                type="text"
                                                value={values.text}
                                                handleChange={handleChange('text')}
                                            />
                                            {(errors.text && touched.text) && <p>{errors.text}</p>}
                                        </div>

                                    </div>
                                    <button className="btn btn-lg btn-primary btn-block" type="button" onClick={handleSubmit} disabled={!isValid || isSubmitting}>Ürün Ekle</button>
                                </div>
                            )}
                        </Formik>
                    </div>
                </div>
            </Layout>
        </>
    )
};
export default inject("AuthStore")(observer(Create));
