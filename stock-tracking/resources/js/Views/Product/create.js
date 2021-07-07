import { inject, observer } from 'mobx-react';
import React from 'react';
import Layout from '../../Components/Layout/front.layout';

const Create = (props) => {
    
    
    
    return (
        <>
        <Layout><div >Burası create js  </div></Layout>
        </>
    )
};
export default inject("AuthStore")(observer(Create));
