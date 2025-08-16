<script>
    import ProgressBar from '$lib/ProgressBar.svelte';
    // let currentStage = $state(null);
    // function onStateChange(event) {
    //     console.log('event = ', event);
    //     currentStage = 1;
    // }
    // export function getCurrentStage(){
    //     return currentStage;
    // }
    // export function setCurrentStage(newStage){
    //     currentStage = newStage;
    // }
</script>

<ProgressBar on:onStateChange={onStateChange} />
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  <!-- We've used 3xl here, but feel free to try other max-widths based on your needs -->
  <div class="mx-auto max-w-3xl">
    <!-- Content goes here -->

     <h2 class="text-xl font-semibold">Upload a File</h2>

    <div class="col-span-full">
        <label for="cover-photo" class="block text-sm/6 font-medium text-gray-900">File Upload</label>
        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div class="text-center">
            <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" class="mx-auto size-12 text-gray-300">
            <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" fill-rule="evenodd" />
            </svg>
            <div class="mt-4 flex text-sm/6 text-gray-600">
            <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input id="file-upload" type="file" name="file-upload" class="sr-only" />
            </label>
            <p class="pl-1">or drag and drop</p>
            </div>
            <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
        </div>
        </div>
    </div>

    <!-- Successfully Uploaded -->
    <div class="rounded-md bg-green-50 p-4">
    <div class="flex">
        <div class="shrink-0">
        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 text-green-400">
            <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
        </div>
        <div class="ml-3">
        <p class="text-sm font-medium text-green-800">Successfully uploaded "MSA Pricelist V2 2025.pdf"</p>
        <a href="#">Preview</a>
        <a href="#">Replace</a>
        </div>
    </div>
    </div>
  </div>
</div>