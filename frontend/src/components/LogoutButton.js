import React from "react";
import Button from "@material-ui/core/Button";

const LogoutButton = () => {

    function logout(){
     
    }

    return (
        <button
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
        </button>
    );
};

export default LogoutButton;