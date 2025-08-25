<script>
    import Progress from '$lib/Progress.svelte';
    import { getCurrentStage, setCurrentStage } from '$lib/state/progress.svelte.js';
    
    // Manually define the stages for this specific page
    const stages = [
        { 
            id: 1, 
            name: 'Upload Documents', 
            description: 'Upload your documents to begin processing',
            content: 'upload'
        },
        { 
            id: 2, 
            name: 'Process', 
            description: 'Processing uploaded documents',
            content: 'process'
        },
        { 
            id: 3, 
            name: 'Configuring', 
            description: 'Configure import settings',
            content: 'configure'
        }
    ];
    
    function onStateChange(event) {
        console.log('event = ', event);
        setCurrentStage(1);
    }
    
    // Export functions for external access if needed
    export function getCurrentStageValue(){
        return getCurrentStage();
    }
    
    export function setCurrentStageValue(newStage){
        setCurrentStage(newStage);
    }
</script>

<!-- Progress Component -->
<Progress {stages} />