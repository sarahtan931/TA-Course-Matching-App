import React from "react";
import Button from "@material-ui/core/Button";

const LoginButton = () => {

    return (
        <Button
			type="submit"
			value="Submit"
			variant="contained"
			color="primary"
			href="/"
			size="large"
			fullWidth
			style={{
				backgroundColor: "#FFA62B"
			}}
			// Add onClick
		>
            Sign In
        </Button>
    );
};

export default LoginButton;