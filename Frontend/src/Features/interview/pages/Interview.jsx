import React, { useState, useEffect } from "react";
import "../styles/interview.scss";

import { useInterview } from "../hooks/useInterview.js";
import { useParams } from "react-router";

import {
    Sidebar,
    ContentArea,
    RightSidebar,
    RoadmapSection,
    LoadingState,
} from "../components";

import {
    Search,
    Bell,
    Shield,
} from "lucide-react";



const Interview = () => {

    const [activeNav, setActiveNav] = useState("technical");

    const {
        report,
        getReportById,
        loading,
        generateResumePdf,
    } = useInterview();

    const { interviewId } = useParams();



    useEffect(() => {

        if(interviewId){
            getReportById(interviewId);
        }

    }, [interviewId]);



    if(loading || !report){
        return <LoadingState />;
    }



    const getContentBySection = () => {

        switch(activeNav){

            case "technical":

                return (
                    <ContentArea
                        activeSection={activeNav}
                        questions={report.technicalQuestions}
                        title="Technical Questions"
                        count={`${report.technicalQuestions?.length || 0} questions`}
                    />
                );

            case "behavioral":

                return (
                    <ContentArea
                        activeSection={activeNav}
                        questions={report.behavioralQuestions}
                        title="Behavioral Questions"
                        count={`${report.behavioralQuestions?.length || 0} questions`}
                    />
                );

            case "roadmap":

                return (
                    <RoadmapSection
                        preparationPlan={report.preparationPlan}
                    />
                );

            default:
                return null;
        }
    };



    return (

        <div className="interview-page">


            {/* HEADER */}
            <header className="top-header">


                {/* LEFT */}
                <div className="top-header__left">

                    <h1>
                        NeuralPrep
                    </h1>

                    <span>
                        Tactical Intelligence
                    </span>

                </div>



                {/* CENTER SEARCH */}
                <div className="top-header__search">

                    <Search size={16} />

                    <input
                        type="text"
                        placeholder="Search interview insights..."
                    />

                </div>



                {/* RIGHT */}
                <div className="top-header__right">

                    <button>
                        <Shield size={16} />
                    </button>

                    <button>
                        <Bell size={16} />
                    </button>

                    <button className="top-header__active">
                        Analytics
                    </button>

                </div>

            </header>



            {/* MAIN CONTAINER */}
            <div className="interview-shell">


                {/* LAYOUT */}
                <div className="interview-layout">


                    {/* LEFT SIDEBAR */}
                    <Sidebar
                        activeNav={activeNav}
                        onNavChange={setActiveNav}
                        onDownloadResume={() =>
                            generateResumePdf({
                                interviewReportId: interviewId
                            })
                        }
                        loading={loading}
                    />



                    {/* CENTER CONTENT */}
                    <main className="center-scroll-area">

                        <div className="content-wrapper">

                            {getContentBySection()}

                        </div>

                    </main>



                    {/* RIGHT SIDEBAR */}
                    <RightSidebar
                        matchScore={report.matchScore}
                        skillGaps={report.skillGaps}
                    />

                </div>

            </div>

        </div>
    );
};

export default Interview;