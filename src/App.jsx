import { useState } from 'react'

import Header from './Components/Header/Header'
import MainInputBox from './Components/MainInputBox/MainInputBox'

// import { sendApiRequest } from './Services/apiService'
import { ResponsePanel } from "./Components/Response";
function App() {

    const [response, setResponse] = useState(null);

    async function handleApiRequest(data) {

        const result = await sendApiRequest(
            data.URL,
            data.method
        );

        console.log(result);

        setResponse(result);
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <Header />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">

                {/* Request on the left, response on the right (stacked on small screens) */}
                <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">

                    <MainInputBox
                        onSubmit={handleApiRequest}
                    />

                    <ResponsePanel/>

                </div>

            </main>

        </div>
    )
}

export default App
