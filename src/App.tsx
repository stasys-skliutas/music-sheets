import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import React, { useEffect, useRef, useState } from "react";

import { Loader } from "./Loader";

function App() {
    const ref = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const display = new OpenSheetMusicDisplay(ref.current || "");
        // display.load("MuzioClementi_SonatinaOpus36No1_Part2.xml").then((value) => {
        //     display.render();
        //     setLoading(false);
        // });
        display.load("ActorPreludeSample.musicxml").then(() => {
            display.render();
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {loading && <Loader />}
            <div ref={ref}></div>
        </div>
    );
}

export default App;
