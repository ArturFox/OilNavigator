import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function useRedirectEmptyCard () {

    const navigate = useNavigate();

    const [isShouldRedirect, setIsShouldRedirect] = useState<boolean>(false);
    const [isTargetBrigadeId, setIsTargetBrigadeId] = useState<string | null>(null);

    useEffect(() => {

        if(!isShouldRedirect && isTargetBrigadeId === null){
            return;
        }

        navigate(`/replaseWorkerCoreAdd?personId=${null}&brigadeId=${isTargetBrigadeId}&date=${null}&isCorePage=${String(true)}`);
        
    }, [isShouldRedirect, isTargetBrigadeId, navigate])

    return{

        isShouldRedirect,
        setIsShouldRedirect,

        isTargetBrigadeId,
        setIsTargetBrigadeId
        
    }
}