import React, { useState } from "react";

import ResponseBody from "./ResponseBody";
import ResponseHeaders from "./ResponseHeaders";
import ResponseOverview from "./ResponseOverview";
import ResponseTabs from "./ResponseTabs";
import ResponseTiming from "./ResponseTiming";

function ResponsePanel(){

    const [activeTab, setActiveTab] = useState("Overview");

    return(
        <div className="panel">

            {/* Response Panel Heading */}
            <div className="border-b border-gray-200 px-5 py-3">
                <h2 className="section-title">Response</h2>
            </div>

            {/* Response Tabs */}
            <div className="border-b border-gray-200 px-5">
                <ResponseTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            </div>

            {/* Selected Tab Content */}
            <div className="p-5">

                {activeTab === "Overview" &&
                    <ResponseOverview />
                }

                {activeTab === "Headers" &&
                    <ResponseHeaders />
                }

                {activeTab === "Body" &&
                    <ResponseBody />
                }

                {activeTab === "Timing" &&
                    <ResponseTiming />
                }

            </div>

        </div>
    )
}

export default ResponsePanel;
