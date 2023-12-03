import { Navigate } from "react-router-dom";
function Protected({ isLoggedIn, children, next }){
  if (!isLoggedIn) {
    return <Navigate to={{
      pathname : '/login',
      search : '?next='+next
    }} replace />;
  }
  if(next === 'admin' && localStorage.getItem('role') !== 'admin'){
    return <Navigate to='/faculty' replace/>
  }
  return children;
};
export default Protected;