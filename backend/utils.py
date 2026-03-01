from PIL import Image
import torch
from torchvision import transforms

def preprocess_image(image: Image.Image):
    """Preprocess image for EfficientNet_B4"""
    transform = transforms.Compose([
        transforms.Resize((380, 380)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])
    return transform(image).unsqueeze(0)
