let checkLoginStatus = () => {
	let loginstate = false;
	window.FB.getLoginStatus((response) => {
      if(response.status === 'connected'){
        loginstate = true;
      }
    });
	return loginstate;
}

export default checkLoginStatus;