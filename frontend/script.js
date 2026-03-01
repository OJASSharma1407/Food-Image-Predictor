const API_URL = 'http://localhost:8000'; // Change to your Render URL after deployment

const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
const previewImage = document.getElementById('previewImage');
const predictBtn = document.getElementById('predictBtn');
const result = document.getElementById('result');
const loading = document.getElementById('loading');
const foodName = document.getElementById('foodName');
const confidence = document.getElementById('confidence');

let selectedFile = null;

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#764ba2';
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.style.borderColor = '#667eea';
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.style.borderColor = '#667eea';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        handleFile(file);
    }
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
});

function handleFile(file) {
    selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        preview.classList.remove('hidden');
        predictBtn.classList.remove('hidden');
        result.classList.add('hidden');
    };
    reader.readAsDataURL(file);
}

predictBtn.addEventListener('click', async () => {
    if (!selectedFile) return;

    loading.classList.remove('hidden');
    result.classList.add('hidden');
    predictBtn.disabled = true;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error('Prediction failed');

        const data = await response.json();
        
        foodName.textContent = data.predicted_class.replace(/_/g, ' ');
        confidence.textContent = `Confidence: ${data.confidence}%`;
        
        result.classList.remove('hidden');
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        loading.classList.add('hidden');
        predictBtn.disabled = false;
    }
});
