import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postNewBreed, setStatus } from "../../redux/dogSlice"
import { fetchAllTemperaments } from "../../redux/temperamentSlice"

//import styled from "styled-components"
import Create, { Input } from "./CreateNew.styled"
// components
import NavBar from "../../pages/HomePage/NavBar"
import { Clock, Camera, CheckOK } from "../../img/SvgIcons"
import validate from "../../validate"
import ErrorMessage from "../../components/ErrorMessage"

export default function CreateNew() {
	const history = useHistory()
	const dispatch = useDispatch()

	// STATE
	const initialState = {
		id: "",
		name: "",
		heightMin: "",
		heightMax: "",
		weightMin: "",
		weightMax: "",
		lifeSpan: "",
		image: "/assets/placeholder_dog.png",
		bredFor: "",
		temperaments: [],
		lifeSpanMin: "",
		lifeSpanMax: "",
	}
	const [field, setField] = useState(initialState)
	const [error, setError] = useState({})
	const [loading, setLoading] = useState(false)
	// lifeSpan
	const lifeSpanMin = useRef()
	const lifeSpanMax = useRef()
	let status = useSelector((state) => state.dogs.status)

	// TEMPERAMENTS
	useEffect(() => {
		if (status) {
			// show and clean ERROR
			setTimeout(() => {
				dispatch(setStatus(""))
			}, 4000)
		}
		dispatch(fetchAllTemperaments())
		lifeSpanMin.current.scrollIntoView()
	}, [dispatch, status])

	const temperaments = useSelector((state) => state.temperaments.list)
	const options = temperaments
		? temperaments.map((t) => {
				return { label: t.name, value: t.name }
		  })
		: []

	// handle Temperaments behavior
	const handleSelectChange = ({ target }) => {
		// add temperaments to state
		if (!field.temperaments.includes(target.value) && target.value !== "0") {
			if (field.temperaments.length < 6) {
				setField((state) => ({
					...state,
					temperaments: [...state.temperaments, target.value],
				}))
			} else {
				setError({ ...error, temperament: "Only 6 temperaments allowed!" })
			}
		}
	}
	const handleDelTemperament = (name) => {
		setField((state) => ({
			...state,
			temperaments: state.temperaments.filter((t) => t !== name),
		}))
		if (field.temperaments.length <= 6) {
			setError({ ...error, temperament: "" })
		}
	}

	const handleChange = ({ target }) => {
		const lifespan =
			lifeSpanMin.current.value + " - " + lifeSpanMax.current.value + " years"
		setField((state) => ({
			...state,
			[target.name]: target.value,
			lifeSpan: lifespan,
		}))
		setError(validate(field))
	}
	// handle errors
	const handleBlur = () => {
		setError(validate(field))
	}

	// set a random photo to image
	const getRandomImage = async () => {
		setLoading(true)
		const { data } = await axios.get("https://dog.ceo/api/breeds/image/random")
		setField((state) => ({
			...state,
			image: data.message,
		}))
		setLoading(false)
	}

	// SUBMIT
	const handleSubmit = async (e) => {
		e.preventDefault()
		const valid = validate(field)
		const isError = Object.values(valid).filter((err) => err !== "").length
		// if no local errors submit
		if (isError === 0) {
			const response = await dispatch(postNewBreed(field))
			if (response) {
				console.log(response);
				setField((state) => ({
					...state,
					id: response.id,
				}))
				setTimeout(() => {
					dispatch(setStatus(""))
					history.push(`/detail/${response.payload.id}`)
				}, 2000)
			}
		} else {
			setError(valid)
		}
	}
	
	return (
		<div>
			<NavBar search={false} />

			<Create>
				<div className='card-img'>
					<img src={field.image} alt='Load...' />
					<button className='loadbtn' type='button' onClick={getRandomImage}>
						{loading ? (
							<>
								<Clock />
								<span>Loading...</span>
							</>
						) : (
							<>
								<Camera />
								<span>Random Photo</span>
							</>
						)}
					</button>
				</div>
				<div className='card-info'>
					<div className='card-text'>
						<h1>Create your breed</h1>
						<form onSubmit={handleSubmit} noValidate>
							{status && status !== "OK" ? <ErrorMessage msg={status} /> : ""}
							<Input>
								<input
									type='text'
									value={field.name}
									name='name'
									className='input_field'
									required
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Name</label>
								<label className='input_error'>
									{error.name && error.name}
								</label>
							</Input>
							<Input>
								<input
									type='text'
									value={field.bredFor}
									name='bredFor'
									required
									className='input_field'
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Bred For</label>
								<label className='input_error'>
									{error.bredFor && error.bredFor}
								</label>
							</Input>

							{/* WEIGHT */}
							<Input width='50%' float='left'>
								<input
									type='text'
									value={field.weightMin}
									name='weightMin'
									required
									className='input_field'
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Weight: Min</label>
								<label className='input_error'>
									{error.weightMin && error.weightMin}
								</label>
							</Input>
							<Input width='40%'>
								<input
									type='text'
									value={field.weightMax}
									name='weightMax'
									required
									className='input_field'
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Max</label>
								<label className='input_error'>
									{error.weightMax && error.weightMax}
								</label>
								<label className='label_measure'>KG</label>
							</Input>
							{/* HEIGHT */}
							<Input width='50%' float='left'>
								<input
									type='text'
									value={field.heightMin}
									name='heightMin'
									required
									className='input_field'
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Height: Min</label>
								<label className='input_error'>
									{error.heightMin && error.heightMin}
								</label>
							</Input>
							<Input width='40%'>
								<input
									type='text'
									value={field.heightMax}
									name='heightMax'
									required
									className='input_field'
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Max</label>
								<label className='input_error'>
									{error.heightMax && error.heightMax}
								</label>
								<label className='label_measure'>CM</label>
							</Input>
							{/* LIFESPAN */}
							<Input width='50%' float='left'>
								<input
									type='text'
									value={field.lifeSpanMin}
									name='lifeSpanMin'
									ref={lifeSpanMin}
									required
									className='input_field'
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Life Span: Min</label>
							</Input>
							<Input width='40%'>
								<input
									type='text'
									value={field.lifeSpanMax}
									name='lifeSpanMax'
									ref={lifeSpanMax}
									required
									className='input_field'
									onBlur={handleBlur}
									onChange={handleChange}
								/>
								<label className='input_label'>Max</label>
								<label className='input_error'>
									{error.lifeSpanMax && error.lifeSpanMax}
								</label>
								<label className='label_measure'>Years</label>
							</Input>

							{/* Life span field for database */}
							<input
								type='text'
								value={field.lifeSpan}
								name='lifeSpan'
								onChange={handleChange}
								hidden
							/>
							<Input height='90px'>
								<div className='input_select'>
									<select
										name='selectTemperament'
										onChange={handleSelectChange}
									>
										<option key='0' value='0'>
											Select Temperaments...
										</option>
										{options.map((option) => (
											<option key={option.value} value={option.value}>
												{option.label}
											</option>
										))}
									</select>
									<label className='input_error select'>
										{error.temperament && error.temperament}
									</label>
								</div>
								<div>
									{!field.temperaments.length ||
										field.temperaments.map((t) => (
											<span className='temperament-tag' key={t}>
												{t}
												<span
													className='remove'
													onClick={() => handleDelTemperament(t)}
												>
													x
												</span>
											</span>
										))}
								</div>
							</Input>

							<div className='card-btn'>
								<button
									className='cancel'
									type='button'
									onClick={() => history.goBack()}
								>
									{status === "OK" ? "Return" : "Cancel"}
								</button>
								<button
									className={
										status === "OK" ? "success" : status !== "" ? "error" : ""
									}
									disabled={status === "OK"}
									type='submit'
								>
									{status === "" ? (
										"Save"
									) : status === "OK" ? (
										<CheckOK />
									) : (
										"Error!"
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</Create>
		</div>
	)
}
