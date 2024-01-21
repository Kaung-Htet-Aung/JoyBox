import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default UserToken = (props) => {

    const dispatch = useDispatch();
    const user = useSelector(state => state.user.user);
    useEffect(async () => {
        const getToken = dispatch(userActions.setUser(await AsyncStorage.getItem('userData')))
        getToken();
    }, [])

}
