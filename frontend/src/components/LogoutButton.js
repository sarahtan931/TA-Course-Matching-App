import React from "react";
import Button from "@material-ui/core/Button";

const LogoutButton = () => {

    function logout(){
     
    }

    return (
        <a
            type="submit"
            color="primary"
            value="Submit"
            variant="contained"
            size="large"
            fullWidth
            href="/"
            style={{
                backgroundColor: "#FFA62B"
            }}
			onClick={logout()}
		>
            Sign Out
        </a>
    );
};

export default LogoutButton;