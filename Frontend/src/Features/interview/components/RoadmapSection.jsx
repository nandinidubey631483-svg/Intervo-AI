import React from 'react'

const RoadmapDay = ({ day, tasks, focus }) => {
    return (
        <div className="roadmap-day">
            <div className="roadmap-day__header">
                <span className="roadmap-day__badge">Day {day}</span>
                <h3 className="roadmap-day__focus">{focus}</h3>
            </div>
            <ul className="roadmap-day__tasks">
                {tasks && tasks.map((task, index) => (
                    <li key={index} className="roadmap-task">
                        <span className="roadmap-task__bullet" />
                        <span className="roadmap-task__text">{task}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export const RoadmapSection = ({ preparationPlan }) => {
    return (
        <main className="interview-content">
            <section className="content-section">
                <div className="content-header">
                    <h2 className="content-header__title">Preparation Road Map</h2>
                    <span className="content-header__count">{preparationPlan?.length || 0}-day plan</span>
                </div>

                <div className="roadmap-list">
                    {preparationPlan && preparationPlan.length > 0 ? (
                        preparationPlan.map((dayData, index) => (
                            <RoadmapDay
                                key={index}
                                day={dayData.day}
                                focus={dayData.focus}
                                tasks={dayData.tasks}
                            />
                        ))
                    ) : (
                        <p className="empty-state">No roadmap available</p>
                    )}
                </div>
            </section>
        </main>
    )
}
