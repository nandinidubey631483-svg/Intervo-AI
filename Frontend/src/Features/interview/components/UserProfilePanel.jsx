import React from 'react'
import '../styles/panels.scss'

const UserProfilePanel = ({ 
    resumeFile, 
    onResumeChange, 
    selfDescription, 
    onSelfDescriptionChange,
    resumeInputRef,
    error
}) => {
    return (
        <div className="panel panel--right">
            <div className="panel__header">
                <span className="panel__icon">👤</span>
                <h2 className="panel__title">Your Profile</h2>
            </div>

            <div className="panel__content">
                {/* Resume Upload Section */}
                <div className="upload-section">
                    <label className="section-label">
                        <span>📄</span>
                        UPLOAD RESUME (BEST RESULTS)
                    </label>
                    <div 
                        className="dropzone"
                        onClick={() => resumeInputRef?.current?.click()}
                    >
                        <div className="dropzone__icon">📁</div>
                        <p className="dropzone__title">Click to upload or drag & drop</p>
                        <p className="dropzone__subtitle">PDF or DOCX (Max 10MB)</p>
                        <input
                            ref={resumeInputRef}
                            type="file"
                            accept=".pdf,.docx"
                            onChange={onResumeChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {resumeFile && (
                        <p className="upload-success">✓ {resumeFile.name} uploaded</p>
                    )}
                </div>

                {/* Or Divider */}
                <div className="or-divider">OR</div>

                {/* Self Description Section */}
                <div className="self-description">
                    <label className="section-label">
                        <span>✍️</span>
                        QUICK SELF-DESCRIPTION
                    </label>
                    <textarea
                        className="panel__textarea panel__textarea--short"
                        placeholder="Briefly describe your experience, skills, and what role you're targeting..."
                        value={selfDescription}
                        onChange={(e) => onSelfDescriptionChange(e.target.value)}
                    />
                </div>

                {/* Error Message */}
                {error && (
                    <div className="error-box">
                        <span className="error-icon">⚠️</span>
                        <div className="error-content">
                            <p className="error-title">Either a Resume or a Self Description is required for personalized plans</p>
                            <p className="error-message">{error}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UserProfilePanel
