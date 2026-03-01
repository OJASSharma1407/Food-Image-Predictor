# Food-Image-Predictor
Trained a CNN model using Transfer learning on custom image dataset

> **Note:** The model may produce incorrect predictions occasionally due to underfitting (GPU training limits were exhausted during development).

## Project Structure

```
Food-Image-Predictor/
│
├── backend/              # FastAPI backend
│   ├── main.py          # FastAPI app
│   ├── model_loader.py  # Model loading logic
│   ├── utils.py         # Preprocessing utilities
│   └── requirements.txt # Python dependencies
│
├── frontend/            # Web interface
│   ├── index.html      # Upload page
│   ├── style.css       # Styling
│   └── script.js       # Frontend logic
│
├── models/             # Trained model files (.h5, .keras, .pth)
│
├── notebooks/          # Jupyter notebooks for training
│
├── data/
│   ├── raw/           # Original dataset
│   └── processed/     # Preprocessed data
│
└── README.md
```

## Setup

### Backend (Render)
1. Navigate to `backend/`
2. Install dependencies: `pip install -r requirements.txt`
3. Run: `uvicorn main:app --reload`

### Frontend (Vercel)
1. Navigate to `frontend/`
2. Open `index.html` in browser for local testing
3. Deploy to Vercel

## Deployment
- **Backend**: Deploy to Render
- **Frontend**: Deploy to Vercel
