import React, { useEffect, useState } from 'react'
import { createAPIEndpoint, ENDPOINTS} from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'

export default function Quest() {

    const [qns, setQns] = useState([])
    const [qnIndex, setQnIndex] = useState(0)
    const {context, setContext} = useStateContext()
    const navigate = useNavigate()

    useEffect(() => {
        setContext({
            selectedOptions: []
        })
        createAPIEndpoint(ENDPOINTS.question)
            .fetch()
            .then(res => {
                setQns(res.data)
            })
            .catch(err => { console.log(err); })
    },[])

    const updateAnswer = (qnId, optionIdx) => {
        const temp = [...context.selectedOptions]
        temp.push({
            qnId,
            selected: optionIdx
        })
        if (qnIndex < 4) {
            setContext({ selectedOptions: [...temp] })
            setQnIndex(qnIndex + 1)
        }
        else {
            setContext({ selectedOptions: [...temp] })
            navigate("/result")
        }
    }

    return (
        qns.length !== 0
            ? <div className="quest-container">
                <h1 className="quest-container__title">
                    {'Question ' + (qnIndex + 1) + ' of 5'}
                </h1>
                <div>
                    <div className="quest-container__question">
                        {qns[qnIndex].qnInWords}
                    </div>
                    <div className="quest-container__options">
                        {qns[qnIndex].options.map((item, idx) =>
                            <div className="quest-container__option" key={idx} onClick={() => updateAnswer(qns[qnIndex].qnId, idx)}>
                                <div >
                                    <b>{String.fromCharCode(65 + idx) + " . "}</b>{item}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            : null
    )
}
