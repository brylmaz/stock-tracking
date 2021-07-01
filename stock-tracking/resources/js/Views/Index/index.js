import { inject, observer } from 'mobx-react';
import React from 'react';

const Index = (props) => {
    props.AuthStore.getToken();
    console.log(props.AuthStore.appState);
    return <div className="container">Burası İndex</div>
};
export default inject("AuthStore")(observer(Index));
