import React from 'react'

export const RightSidebar = ({ matchScore, skillGaps }) => {
    const getScoreStatus = (score) => {
        if (score >= 80) return { text: 'Strong match for this role', class: 'score--high' }
        if (score >= 60) return { text: 'Good match for this role', class: 'score--medium' }
        return { text: 'Room for improvement', class: 'score--low' }
    }

    const scoreStatus = getScoreStatus(matchScore)

    return (
        <aside className="interview-sidebar--right">
            {/* Match Score Section */}
            <div className="score-section">
                <p className="score-section__label">MATCH SCORE</p>
                <div className={`score-ring ${scoreStatus.class}`}>
                    <div className="score-ring__content">
                        <span className="score-ring__value">{matchScore}</span>
                        <span className="score-ring__percent">%</span>
                    </div>
                </div>
                <p className="score-section__status">{scoreStatus.text}</p>
            </div>

            <div className="sidebar-divider" />

            {/* Skill Gaps Section */}
            <div className="skill-section">
                <p className="skill-section__label">SKILL GAPS</p>
                <div className="skill-tags">
                    {skillGaps && skillGaps.map((gap, index) => (
                        <span key={index} className={`skill-tag skill-tag--${gap.severity || 'medium'}`}>
                            {gap.skill || gap}
                        </span>
                    ))}
                </div>
            </div>
        </aside>
    )
}
