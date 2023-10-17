import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import {Default} from "../Default";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Default">
                <Default/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;