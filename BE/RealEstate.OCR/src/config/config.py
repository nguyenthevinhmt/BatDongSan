PORT = 8080

# Yolov5
CONF_FRONT_CONTENT_THRESHOLD_V5 = 0.6
IOU_FRONT_CONTENT_THRESHOLD_V5 = 0.6
CONF_BACK_CONTENT_THRESHOLD_V5 = 0.3
IOU_BACK_CONTENT_THRESHOLD_V5 = 0.1
CONF_CORNER_THRESHOLD_V5 = 0.5
IOU_CORNER_THRESHOLD_V5 = 0.5

CORNER_MODEL_PATH_V5 = "src/models/OCR/weights/corner_v5_test1.pt"
CONTENT_FRONT_MODEL_PATH_V5 = "src/models/OCR/weights/front_content_v5.pt"
CONTENT_BACK_MODEL_PATH_V5 = "src/models/OCR/weights/back_content_v5.pt"


CONF_BACK_CONTENT_THRESHOLD_V8 = 0.3
CONTENT_BACK_MODEL_PATH_V8 = "src/models/OCR/weights/back_content_v5.pt"

DEVICE = "cpu" # or "cuda:0" if using GPu
# Config directory
UPLOAD_FOLDER = 'src/dataloader/uploads'
SAVE_DIR = 'src/dataloader/results'
FACE_DIR = 'src/dataloader/face'