<script>
    import { getCurrentStage } from '$lib/state/progress.svelte.js';
    
    // Accept stages as a prop to allow manual definition
    let { stages = [] } = $props();
    
    // Use the centralized current stage
    let currentStage = $derived(getCurrentStage());
    
    function getStageStatus(stageId) {
        if (stageId < currentStage) return 'completed';
        if (stageId === currentStage) return 'active';
        return 'inactive';
    }
    
    function getStageClasses(status) {
        switch (status) {
            case 'completed':
                return {
                    circle: 'bg-sky-600 text-white border border-sky-600',
                    text: 'text-gray-900 font-semibold',
                    header: 'bg-blue-50/50 border border-sky-200',
                    content: 'bg-blue-50/30',
                    connector: 'bg-sky-400'
                };
            case 'active':
                return {
                    circle: 'border-2 border-blue-600 bg-white',
                    numberText: 'text-blue-600 font-semibold',
                    text: 'text-gray-900 font-semibold',
                    header: 'bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 ring-1 ring-blue-200',
                    content: 'bg-white',
                    connector: 'bg-gray-300'
                };
            case 'inactive':
            default:
                return {
                    circle: 'border border-gray-300 bg-gray-50',
                    numberText: 'text-gray-500 font-medium',
                    text: 'text-gray-500',
                    header: 'bg-gray-50/70 border border-gray-200',
                    content: 'bg-gray-50/20',
                    connector: 'bg-gray-300'
                };
        }
    }
</script>

<!-- Progress Accordion -->
<div class="space-y-3">
    {#each stages as stage, index (stage.id)}
        {@const status = getStageStatus(stage.id)}
        {@const classes = getStageClasses(status)}
        {@const isExpanded = status === 'active'}
        
        <div class="rounded-xl overflow-hidden {classes.header} transition-all duration-300 ease-in-out">
            <!-- Stage Header -->
            <div class="flex items-center p-6">
                    <!-- Connector line (not shown for first item) -->
                    {#if index > 0}
                        <div class="absolute left-8 -top-4 w-0.5 h-4 {classes.connector}"></div>
                    {/if}
                    
                <!-- Stage Circle -->
                <div class="flex items-center justify-center w-12 h-12 rounded-full {classes.circle} mr-5 relative z-10 transition-all duration-200">
                    {#if status === 'completed'}
                        <!-- Checkmark for completed stages -->
                        <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" fill-rule="evenodd" />
                        </svg>
                    {:else}
                        <!-- Stage number with leading zero -->
                        <span class="text-sm {classes.numberText} transition-colors duration-200">{stage.id.toString().padStart(2, '0')}</span>
                    {/if}
                </div>
                
                                 <!-- Stage Info -->
                 <div class="flex-1 min-w-0">
                     <h3 class="text-lg {classes.text} transition-colors duration-200">{stage.name}</h3>
                     <p class="text-sm text-gray-600 mt-1">{stage.description}</p>
                 </div>
                

                </div>
                
            <!-- Stage Content (only shown when active) -->
            {#if isExpanded}
                                 <div class="px-6 pt-4 pb-8 {classes.content} border-t border-gray-100">
                    {#if stage.content === 'upload'}
                        <!-- Upload Documents Content -->
                        <div class="space-y-6">
                            <div>
                                <label for="file-upload" class="block text-sm font-medium text-gray-900 mb-3">Choose your document</label>
                                <div class="mt-2 flex justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-10 bg-blue-50/30">
                                    <div class="text-center">
                                        <svg class="mx-auto h-12 w-12 text-blue-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                        <div class="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label for="file-upload" class="relative cursor-pointer rounded-md font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2">
                                                <span>Upload a file</span>
                                                <input id="file-upload" type="file" name="file-upload" class="sr-only" />
                                            </label>
                                            <p class="pl-1">or drag and drop</p>
                                        </div>
                                        <p class="text-xs leading-5 text-gray-600">PDF, PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Successfully Uploaded (example) -->
                            <div class="rounded-xl bg-sky-50 p-4 border border-sky-200">
                                <div class="flex">
                                    <div class="flex-shrink-0">
                                        <svg class="h-5 w-5 text-sky-600" viewBox="0 0 20 20" fill="currentColor">
                                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                    <div class="ml-3 flex-1">
                                        <p class="text-sm font-medium text-sky-900">Successfully uploaded "MSA Pricelist V2 2025.pdf"</p>
                                        <div class="mt-3 flex space-x-3">
                                            <button class="text-sm font-medium text-sky-800 bg-sky-100 px-3 py-1 rounded-md">Preview</button>
                                            <button class="text-sm font-medium text-sky-800 bg-sky-100 px-3 py-1 rounded-md">Replace</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else if stage.content === 'process'}
                        <!-- Processing Content -->
                        <div class="space-y-6">
                            <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                                <div class="flex items-center space-x-4 mb-4">
                                    <div class="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
                                    <div>
                                        <h4 class="font-semibold text-gray-900">Processing Document</h4>
                                        <p class="text-sm text-gray-600">Analyzing structure and extracting data...</p>
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <div class="bg-white/70 rounded-full h-3 overflow-hidden">
                                        <div class="bg-gradient-to-r from-blue-500 to-sky-500 h-3 rounded-full transition-all duration-300 ease-out" style="width: 45%"></div>
                                    </div>
                                    <div class="flex justify-between text-sm">
                                        <span class="text-gray-600">Processing...</span>
                                        <span class="font-medium text-blue-600">45%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    {:else if stage.content === 'configure'}
                        <!-- Configuration Content -->
                        <div class="space-y-6">
                            <div class="grid gap-6">
                                <div>
                                    <label for="data-mapping" class="block text-sm font-medium text-gray-900 mb-3">Data Mapping Strategy</label>
                                    <select id="data-mapping" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white text-gray-900">
                                        <option>Auto-detect columns</option>
                                        <option>Manual mapping</option>
                                        <option>Use custom template</option>
                                    </select>
                                </div>
                                <div>
                                    <h4 class="text-sm font-medium text-gray-900 mb-4">Import Options</h4>
                                    <div class="space-y-4 bg-blue-50/40 p-4 rounded-xl">
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded" checked />
                                            <span class="ml-3 text-sm text-gray-700">Skip duplicate entries</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded" />
                                            <span class="ml-3 text-sm text-gray-700">Validate data before import</span>
                                        </label>
                                        <label class="flex items-center cursor-pointer">
                                            <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded" />
                                            <span class="ml-3 text-sm text-gray-700">Create backup before import</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex justify-end pt-4">
                                    <button class="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                        Start Import
                                    </button>
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            {/if}
        </div>
    {/each}
</div>
<style>
    /* Additional custom styles if needed */
    .connector-line {
        height: 2px;
    }
</style>
