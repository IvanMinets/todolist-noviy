import {ChangeEvent, useCallback} from "react";

export const Default = () => {
    const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        
    }, []);

    return (
        <div>
            <input type="text" onChange={onInputChange}/>
        </div>
    );
};