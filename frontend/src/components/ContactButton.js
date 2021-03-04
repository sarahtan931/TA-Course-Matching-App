import React from "react";
import Button from "@material-ui/core/Button";

const ContactButton = () => {
	return (
		<Button
			type="submit"
			value="Submit"
			variant="contained"
			color="primary"
			href="/login"
			size="large"
			fullWidth
			style={{
				backgroundColor: "#FFA62B",
			}}
		>
			Send Message
		</Button>
	);
};

export default ContactButton;
