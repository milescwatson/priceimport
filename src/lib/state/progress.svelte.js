// Progress state management using Svelte 5 runes
let progressState = $state({
    currentStage: 1
});

// Export functions to access and modify state
export function getProgressState() {
    return progressState;
}

export function getCurrentStage() {
    return progressState.currentStage;
}

export function setCurrentStage(newStage) {
    if (newStage >= 1) {
        progressState.currentStage = newStage;
    }
}

export function nextStage() {
    progressState.currentStage++;
}

export function previousStage() {
    if (progressState.currentStage > 1) {
        progressState.currentStage--;
    }
}

export function resetProgress() {
    progressState.currentStage = 1;
}

// Legacy function name for backwards compatibility
export function setProgressStage(newStage) {
    setCurrentStage(newStage);
}