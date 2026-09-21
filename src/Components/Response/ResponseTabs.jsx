import React from "react";

function ResponseTabs({
    activeTab,
    setActiveTab
}) {

    const tabs = ["Overview", "Headers", "Body", "Timing"];

    return (
        <div>
            <ul className="-mb-px flex gap-6">

                {tabs.map((tab) => (

                    <li key={tab}>
                        <button
                            type="button"
                            aria-current={activeTab === tab ? "page" : undefined}
                            className={
                                "cursor-pointer border-b-2 py-3 text-sm font-medium transition focus-visible:outline-none " +
                                (activeTab === tab
                                    ? "border-blue-600 text-gray-900"
                                    : "border-transparent text-gray-500 hover:text-gray-900")
                            }
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    </li>

                ))}

            </ul>
        </div>
    )
}

export default ResponseTabs;
