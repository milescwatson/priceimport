export const progressState = $state({
    currentStage: null
});

export function setProgressStage(newStage){
    progressState.currentStage = newStage;
}