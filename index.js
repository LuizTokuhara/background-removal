import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.5.2';
const modelId = 'Xenova/modnet';
let model;
let image;

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const outputImage = document.getElementById('output-image');
const previewContainer = document.getElementById('preview-container');
const resetButton = document.getElementById('reset-button');
const title = document.getElementById('title');
const loadScreen = document.getElementById('loader-container');

const sampleOne = document.getElementById('sample-one');
const sampleTwo = document.getElementById('sample-two');
const sampleThree = document.getElementById('sample-three');
const sampleFour = document.getElementById('sample-four');

try {
  model = await pipeline('background-removal', modelId, { device: 'wasm' });
  loadScreen.remove();
  console.log(`Model loaded successfully`);
} catch (error) {
  console.error(error);
}

async function showImagePreview(currentImage) {
  if (!currentImage) return;

  const url = currentImage.src;
  const output = await model(url);
  const { data, width, height } = output[0];

  // Create temporary canvas
  const tmpCanvas = document.createElement('canvas');
  tmpCanvas.width = width;
  tmpCanvas.height = height;
  const tmpCtx = tmpCanvas.getContext('2d');
  const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
  tmpCtx.putImageData(imageData, 0, 0);

  const img = tmpCanvas.toDataURL('image/png');
  outputImage.innerHTML = `<img src="${img}" alt="Processed Image">`;
  title.innerText = 'Image Preview';
  resetButton.classList.remove('hide');
  previewContainer.classList.add('hide');
}

function handleFiles(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onloadend = async function (e) {
    previewContainer.innerHTML = '';
    const preview = document.createElement('img');

    if (!isValidFileType(file)) {
      alert('Select only image file (JPEG, PNG, GIF, WEBP)!');
      return;
    }

    preview.src = e.target.result;
    preview.classList.add('preview-image');
    previewContainer.appendChild(preview);
    dropArea.classList.add('hide');
    title.innerText = 'Processing Image...';
    await showImagePreview(preview)
  };
}

function handleDrop(e) {
  e.preventDefault();
  image = e.dataTransfer.files[0];
  if (image) {
    fileInput.file = image;
    handleFiles(image);
  }
}

function reset() {
  const previewContainer = document.getElementById('preview-container');
  previewContainer.innerHTML = '';
  dropArea.classList.remove('hide');
  previewContainer.classList.remove('hide');
  fileInput.value = '';
  outputImage.innerHTML = '';
  title.innerText = 'Background Removal';
  resetButton.classList.add('hide');
}

function isValidFileType(file) {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  return allowedTypes.includes(file.type);
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFiles(file);
  }
});

resetButton.addEventListener('click', reset);

async function prepareSampleImage(filename) {
  reset();
  const response = await fetch(`./images/${filename}`);
  const blob = await response.blob();
  const file = new File([blob], `${filename}`, { type: blob.type });
  handleFiles(file); 
}

sampleOne.addEventListener('click', async () => {
  await prepareSampleImage('dog.jpg');
});
sampleTwo.addEventListener('click', async () => {
  await prepareSampleImage('parrot.webp');
});
sampleThree.addEventListener('click', async () => {
  await prepareSampleImage('woman.webp');
});
sampleFour.addEventListener('click', async () => {
  await prepareSampleImage('family.jpg');
});

dropArea.addEventListener('dragover', preventDefaults);
dropArea.addEventListener('dragenter', preventDefaults);
dropArea.addEventListener('dragleave', preventDefaults);
dropArea.addEventListener('drop', handleDrop);

dropArea.addEventListener('dragover', () => {
  dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
  dropArea.classList.remove('drag-over');
});

dropArea.addEventListener('click', () => {
  fileInput.click();
});
