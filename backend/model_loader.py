import torch
import torch.nn as nn
import os
from torchvision import models

class ModelLoader:
    def __init__(self):
        self.model = None
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
    def load_model(self, model_path: str):
        """Load PyTorch model"""
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model not found at {model_path}")
        
        checkpoint = torch.load(model_path, map_location=self.device)
        
        # If it's a state_dict, recreate model architecture
        if isinstance(checkpoint, dict) and 'state_dict' not in checkpoint:
            # EfficientNet_B4
            self.model = models.efficientnet_b4(pretrained=False)
            self.model.classifier[1] = nn.Linear(self.model.classifier[1].in_features, 101)
            self.model.load_state_dict(checkpoint)
        elif isinstance(checkpoint, dict) and 'state_dict' in checkpoint:
            self.model = models.efficientnet_b4(pretrained=False)
            self.model.classifier[1] = nn.Linear(self.model.classifier[1].in_features, 101)
            self.model.load_state_dict(checkpoint['state_dict'])
        else:
            self.model = checkpoint
        
        self.model.to(self.device)
        self.model.eval()
        return self.model
    
    def predict(self, input_tensor):
        """Run prediction"""
        with torch.no_grad():
            input_tensor = input_tensor.to(self.device)
            output = self.model(input_tensor)
            probabilities = torch.nn.functional.softmax(output, dim=1)
            confidence, predicted_class = torch.max(probabilities, 1)
            return predicted_class.item(), confidence.item()

model_loader = ModelLoader()
