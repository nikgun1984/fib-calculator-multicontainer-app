import axios from "axios";
import { useState, useEffect } from "react";

const Fib = () => {
	const [vals, setVals] = useState({});
	const [input, setInput] = useState({ index: "" });
	const [seenIndexes, setSeenIndexes] = useState([]);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setInput((fData) => ({
			...fData,
			[name]: value,
		}));
	};

	const submitForm = async (e) => {
		e.preventDefault();
		sendIndex();
	};

	async function sendIndex() {
		await axios.post("/api/values", {
			index: input,
		});
		setInput("");
	}

	useEffect(() => {
		async function fetchValues() {
			const values = await axios.get("/api/values/current");
			setVals({ ...values.data });
		}

		async function fetchIndexes() {
			const seenIndexes = await axios.get("/api/values/all");
			setSeenIndexes([...seenIndexes.data]);
		}

		fetchValues();
		fetchIndexes();
		sendIndex();
	}, []);
	return (
		<div>
			<form onSubmit={submitForm}>
				<label For="index">Enter your Index:</label>
				<input
					type="text"
					placeholder="Enter your Index"
					onChange={input.index}
					id="index"
				/>
				<button>Submit</button>
			</form>

			<h3>Indexes I have seen</h3>
			{seenIndexes.map((idx) => idx).join(", ")}
			<h3>Calculated Values</h3>
			{Object.keys(vals).map((key) => (
				<div key={key}>
					For index {key} I calculated {vals[key]}
				</div>
			))}
		</div>
	);
};

export default Fib;
