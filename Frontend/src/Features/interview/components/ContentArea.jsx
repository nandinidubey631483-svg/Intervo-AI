import React from 'react'
import { QuestionCard } from './QuestionCard'

export const ContentArea = ({ activeSection, questions, title, count }) => {
    return (
        <main className="interview-content">
            <section className="content-section">
                <div className="content-header">
                    <h2 className="content-header__title">{title}</h2>
                    <span className="content-header__count">{count}</span>
                </div>

                <div className="questions-list">
                    {questions && questions.length > 0 ? (
                        questions.map((item, index) => (
                            <QuestionCard
                                key={index}
                                index={index}
                                question={item.question}
                                intention={item.intention}
                                answer={item.answer}
                            />
                        ))
                    ) : (
                        <p className="empty-state">No questions available</p>
                    )}
                </div>
            </section>
        </main>
    )
}
