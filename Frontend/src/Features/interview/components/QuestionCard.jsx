import React, { useState } from 'react'

export const QuestionCard = ({ question, intention, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="question-card">
            <div className="question-card__header" onClick={() => setIsOpen(!isOpen)}>
                <span className="question-card__index">Q{index + 1}</span>
                <p className="question-card__text">{question}</p>
                <span className={`question-card__chevron ${isOpen ? 'question-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </span>
            </div>

            {isOpen && (
                <div className="question-card__body">
                    <div className="question-card__section">
                        <span className="section-tag section-tag--intention">INTENTION</span>
                        <p className="section-content">{intention}</p>
                    </div>
                    <div className="question-card__section">
                        <span className="section-tag section-tag--answer">MODEL ANSWER</span>
                        <p className="section-content">{answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
