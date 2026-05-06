import React, { useState, useRef } from "react";
import "../styles/home.scss";

import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router";

const Home = () => {

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");

    const resumeInputRef = useRef();

    const navigate = useNavigate();

    const { reports } = useInterview();

    return (

        <div className="home-page">

            {/* HEADER */}
            <div className="dashboard-header">

                <h1>
                    Create Your Custom
                    <span> Interview Plan</span>
                </h1>

                <p>
                    Generate a personalized AI-powered preparation strategy
                </p>

            </div>



            {/* MAIN CARD */}
            <div className="dashboard-card">

                {/* LEFT */}
                <div className="panel">

                    <div className="panel-title">
                        🎯 Target Job Description
                    </div>

                    <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        placeholder="Paste the full job description here..."
                        className="main-textarea"
                    />

                    <span className="char-count">
                        {jobDescription.length} / 5000 chars
                    </span>

                </div>



                {/* RIGHT */}
                <div className="panel">

                    <div className="panel-title">
                        👤 Your Profile
                    </div>

                    <label className="upload-label">
                        Upload Resume
                    </label>

                    <label
                        className="upload-box"
                        htmlFor="resume"
                    >

                        <div className="upload-icon">
                            ☁
                        </div>

                        <p>
                            Click to upload or drag & drop
                        </p>

                        <span>
                            PDF or DOCX (Max 5MB)
                        </span>

                        <input
                            ref={resumeInputRef}
                            hidden
                            type="file"
                            id="resume"
                        />

                    </label>



                    <div className="divider">
                        <span>OR</span>
                    </div>



                    <label className="upload-label">
                        Quick Self Description
                    </label>

                    <textarea
                        value={selfDescription}
                        onChange={(e) => setSelfDescription(e.target.value)}
                        placeholder="Briefly describe your experience, skills and projects..."
                        className="small-textarea"
                    />



                    <div className="info-box">

                        Either a Resume or Self Description is required
                        to generate a personalized plan.

                    </div>

                </div>

            </div>



            {/* GENERATE */}
            <div className="generate-section">

                <button className="generate-btn">
                    ✨ GENERATE MY INTERVIEW STRATEGY ⚡
                </button>

                <p>
                    🤖 AI-Powered Strategy Generation • Approx 30s
                </p>

            </div>



            {/* REPORTS */}
            {reports?.length > 0 && (

                <section className="recent-reports">

                    <h2>
                        My Recent Interview Plans
                    </h2>

                    <div className="reports-grid">

                        {reports.map((report) => (

                            <div
                                key={report._id}
                                className="report-card"
                                onClick={() => navigate(`/interview/${report._id}`)}
                            >

                                <h3>
                                    {report.title || "Interview Report"}
                                </h3>

                                <p>
                                    Generated on{" "}
                                    {new Date(report.createdAt).toLocaleDateString()}
                                </p>

                                <span>
                                    Match Score: {report.matchScore || 75}%
                                </span>

                            </div>

                        ))}

                    </div>

                </section>

            )}

        </div>
    );
};

export default Home;