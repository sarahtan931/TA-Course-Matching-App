import React from "react";
import Button from "@material-ui/core/Button";

const LoginButton = () => {
	return (
		<Button
			type="submit"
			color="primary"
			value="Submit"
			variant="contained"
			size="large"
			fullWidth
			style={{
				backgroundColor: "#FFA62B",
			}}
		>
			Sign In
		</Button>
	);
};

export default LoginButton;
