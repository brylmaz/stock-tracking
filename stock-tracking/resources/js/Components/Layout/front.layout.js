import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { inject, observer } from 'mobx-react';
import {useHistory} from 'react-router-dom';

const Layout = (props) => {
    const [user,setUser] = useState({});
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    props.AuthStore.getToken();
    const history = useHistory();
    
    useEffect(() => {
        const token = (props.AuthStore.appState != null) ? props.AuthStore.appState.user.access_token : null;
        axios.post(`/api/authenticate`,{},{
            headers:{
                Authorization: 'Bearer '+ token
            }
        }).then((res) => {
            if(!res.data.isLoggedIn){
                history.push('/login');
            }
            setUser(res.data.user);
            setIsLoggedIn(res.data.isLoggedIn);
        })
        .catch(e => {
            history.push('/login');
        }); 
    },[])

    const logout = () => {
        
        axios.post(`/api/logout`,{},{
            headers:{
                Authorization: 'Bearer '+ props.AuthStore.appState.user.access_token
            }
        }).then(res => console.log(res)).catch(e => console.log(e));
        props.AuthStore.removeToken();
        history.push('/login');
    }
    
    return (
        <>
            <div>
            <button onClick={logout}>Çıkış</button>
            </div>
            <div>
                {props.children}
            </div>
        </>
    )
}

export default inject("AuthStore")(observer(Layout));