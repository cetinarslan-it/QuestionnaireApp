import React from 'react'
import { useNavigate } from 'react-router';
import useStateContext from '../hooks/useStateContext'

export default function Result() {
  const { context, setContext } = useStateContext()
  const navigate = useNavigate()

  const restart = () => {
    setContext({
      selectedOptions: []
    })
    navigate("/quest")
  }

  const submitQuest = () => {
    alert("Your questionaire successfully submitted! You can safely log out...")
  }

  return (
    <>
      <div className="result-container">
      <p className="result-container--text-1">Thank you!...</p>
        <p className="result-container--text">This is the end of the questionaire.</p>
        <p className="result-container--text">You can submit or review your answers.</p>
        <button className="result-container__submit-button"
          onClick={submitQuest}>
          Submit
        </button>
        <button className="result-container__review-button"
          onClick={restart}>
          Review
        </button>
      </div>
    </>
  )
}
