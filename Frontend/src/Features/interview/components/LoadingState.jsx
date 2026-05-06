import React from 'react'

export const LoadingState = () => {
    return (
        <main className="loading-container">
            <div className="loading-content">
                <div className="spinner" />
                <h1 className="loading-title">Loading your interview plan...</h1>
                <p className="loading-subtitle">Please wait while we prepare your personalized interview preparation</p>
            </div>
        </main>
    )
}
