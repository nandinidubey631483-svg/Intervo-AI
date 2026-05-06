import React from 'react'
import '../styles/panels.scss'

const JobDescriptionPanel = ({ value, onChange, charCount = 0, maxChars = 5000 }) => {
    return (
        <div className="panel panel--center">
            <div className="panel__header">
                <span className="panel__icon">🎯</span>
                <h2 className="panel__title">Target Job Description</h2>
            </div>

            <div className="panel__content">
                <textarea
                    className="panel__textarea"
                    placeholder="Paste the job description here... e.g., Senior Software Engineer with 5+ years of experience in React, Node.js..."
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    maxLength={maxChars}
                />
                <div className="char-counter">
                    {charCount}/{maxChars} chars
                </div>
            </div>
        </div>
    )
}

export default JobDescriptionPanel
