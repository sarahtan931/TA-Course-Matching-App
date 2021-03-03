import React from "react";
import Button from "@material-ui/core/Button";

const LogoutButton = () => {

    return (
        <Button
            type="submit"
            color="primary"
            value="Submit"
            variant="contained"
            size="large"
            fullWidth
            href="/login"
            style={{
                backgroundColor: "#FFA62B"
            }}
			// Add onClick
		>
            Sign Out
        </Button>
    );
};

export default LogoutButton;