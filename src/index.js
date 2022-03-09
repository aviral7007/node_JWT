const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.urlencoded({ extended: true }));

dotenv.config();

let PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
console.log(`Server is up and running on ${PORT} ...`);
});

app.post("/user/create", (req, res) => {
	
	let jwtSecretKey =`${process.env.JWT_SECRET_KEY}`;
	let data = {
    time:Date(),
    userID:10

	}

	const token = jwt.sign(data, jwtSecretKey);

	res.send(token);
});


app.get("/user/validuser", (req, res) => {
	
	let tokenHeaderKey = `${process.env.TOKEN_HEADER_KEY}`;
	let jwtSecretKey = `${process.env.JWT_SECRET_KEY}`;

	try {
		const token = req.header(tokenHeaderKey);

		const verified = jwt.verify(token, jwtSecretKey);
		if(verified){
			return res.send("Successfully Verified");
		}else{
			// Access Denied
			return res.status(401).send(error);
		}
	} catch (error) {
		// Access Denied
		return res.status(401).send(error);
	}
});
