import React from 'react'
import '../styles/strategy-generator.scss'

const StrategyGenerator = ({ 
    onGenerate, 
    loading, 
    error,
    hasJobDescription,
    hasSelfDescription,
    hasResume
}) => {
    const isFormValid = hasJobDescription || hasSelfDescription || hasResume

    return (
        <div className="strategy-generator">
            <button 
                className={`strategy-btn ${!isFormValid ? 'strategy-btn--disabled' : ''}`}
                onClick={onGenerate}
                disabled={!isFormValid || loading}
            >
                <span className="strategy-btn__icon">⚡</span>
                <span className="strategy-btn__text">
                    {loading ? 'GENERATING...' : 'GENERATE MY INTERVIEW STRATEGY'}
                </span>
                <span className="strategy-btn__flash">⚡</span>
            </button>

            <div className="strategy-footer">
                <p className="strategy-note">
                    <span className="note-icon">🤖</span>
                    AI-Powered Strategy Generation • Approve 30s
                </p>
            </div>
        </div>
    )
}

export default StrategyGenerator
