let checkLoginStatus = () => {
	let loginstate = false;
	const FB = window.FB;
	FB.getLoginStatus((response) => {
      if(response.status === 'connected'){
        loginstate = true;
      }
    });
	return loginstate;
}

export default checkLoginStatus;