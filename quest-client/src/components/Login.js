import React, { useEffect } from 'react'
import useForm from '../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'
import '../App.css'

const getFreshModel = () => ({
    name: '',
    email: ''
})

export default function Login() {

    const { setContext, resetContext } = useStateContext();
    const navigate = useNavigate()
    const {
        values,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext()
    }, [])

    const login = e => {
        e.preventDefault();
        if (validate())
            createAPIEndpoint(ENDPOINTS.participant)
                .post(values)
                .then(res => {
                    setContext({ participantId: res.data.participantId })
                    navigate('/quest')
                })
         else { 
            alert("Please type required info in correct form.");
        }; 
    }

    const validate = () => {
        return (/\S+@\S+\.\S+/).test(values.email)   
    }

    return (
        <div>
            <form className="form-container" noValidate autoComplete="off" onSubmit={login}>
                <h3>Questionnaire APP</h3>

                <label for="Email">Email</label>
                <input label="Email"
                    name="email"
                    value={values.email}
                    placeholder="example@exmail.com"
                    onChange={handleInputChange}
                    variant="outlined"
                     />

                <label for="name">Username</label>
                <input label="Name"
                    name="name"
                    value={values.name}
                    placeholder="Cetin Arslan"
                    onChange={handleInputChange}
                    variant="outlined"
                     />

                <button type="submit"
                    variant="contained"
                    size="large">Log In</button>
            </form>
        </div>
    )
}
