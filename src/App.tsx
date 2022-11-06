import { OpenSheetMusicDisplay } from "opensheetmusicdisplay";
import React, { useEffect, useRef, useState } from "react";

import { Loader } from "./Loader";
import { Button, Select } from "antd";
import styled from "styled-components";

const Container = styled.div`
    margin: auto;
    width: 80%;
`;

const Navigation = styled.nav`
    display: flex;
    gap: 16px;
    margin-top: 16px;
    padding: 16px;
`;

const App = () => {
    const ref = useRef(null);

    const [loading, setLoading] = useState(false);
    const [preset, setPreset] = useState<string>();
    // is this really how it should be stored?
    const [display, setDisplay] = useState<OpenSheetMusicDisplay>();

    useEffect(() => {
        setDisplay(new OpenSheetMusicDisplay(ref.current || ""));
        window.addEventListener("resize", () => {
            // @ts-ignore
            clearTimeout(window.resizedFinished);
            // @ts-ignore
            window.resizedFinished = setTimeout(function () {
                console.log("Resized finished.");
            }, 250);
        });
    }, []);

    return (
        <Container>
            <Navigation>
                <Select
                    placeholder="Choose preset"
                    style={{ width: 240 }}
                    onChange={(value) => {
                        setPreset(value);
                    }}
                    options={[
                        {
                            label: "Sheet 1",
                            value: "MuzioClementi_SonatinaOpus36No1_Part2.xml",
                        },
                        {
                            label: "Sheet 2",
                            value: "ActorPreludeSample.musicxml",
                        },
                        {
                            label: "Other",
                            value: "None",
                        },
                    ]}
                />
                <Button
                    disabled={loading || !preset}
                    onClick={() => {
                        if (!preset || !display) {
                            return;
                        }
                        setLoading(true);
                        display
                            .load(preset)
                            .then(() => {
                                display.render();
                                setLoading(false);
                            })
                            .catch((reason: any) => {
                                console.log(`Other type not supported. 'reason' in catch '${reason}'`);
                                setLoading(false);
                                display.clear();
                                display.updateGraphic();
                            });
                    }}
                    type="primary"
                >
                    Generate
                </Button>
            </Navigation>
            <main>
                {loading && <Loader />}
                <div ref={ref}></div>
            </main>
        </Container>
    );
};

export default App;
