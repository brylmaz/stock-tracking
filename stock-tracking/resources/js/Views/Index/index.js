import { inject, observer } from 'mobx-react';
import React from 'react';
import Layout from '../../Components/Layout/front.layout';

const Index = (props) => {
    props.AuthStore.getToken();
    
    
    return (
        <>
        <Layout><div >Burası İndex  </div></Layout>
        </>
    )
};
export default inject("AuthStore")(observer(Index));
