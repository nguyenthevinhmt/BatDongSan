from src import app
from fastapi import UploadFile, File
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import yolov5
import os
from PIL import Image
from src.utils import utils
import numpy as np
from vietocr.tool.predictor import Predictor
from vietocr.tool.config import Cfg
import src.config.config as cfg
from ultralytics import YOLO

""" ---- Setup ---- """
# Model Yolov5
CORNER_MODEL_V5 = yolov5.load(cfg.CORNER_MODEL_PATH_V5)
CONTENT_FRONT_MODEL_V5 = yolov5.load(cfg.CONTENT_FRONT_MODEL_PATH_V5)
CONTENT_BACK_MODEL_V5 = yolov5.load(cfg.CONTENT_BACK_MODEL_PATH_V5)

# Thiết lập các ngưỡng dự đoán cho yolov5
# Set conf and iou threshold -> Remove overlap and low confident bounding boxes
CONTENT_FRONT_MODEL_V5.conf = cfg.CONF_FRONT_CONTENT_THRESHOLD_V5
CONTENT_FRONT_MODEL_V5.iou = cfg.IOU_FRONT_CONTENT_THRESHOLD_V5

CONTENT_BACK_MODEL_V5.conf = cfg.CONF_BACK_CONTENT_THRESHOLD_V5
CONTENT_BACK_MODEL_V5.iou = cfg.IOU_BACK_CONTENT_THRESHOLD_V5

CORNER_MODEL_V5.conf = cfg.CONF_CORNER_THRESHOLD_V5
CORNER_MODEL_V5.iou = cfg.IOU_CORNER_THRESHOLD_V5

# Model Yolov8
CONTENT_BACK_MODEL_V8 = YOLO(cfg.CONTENT_BACK_MODEL_PATH_V8)

# Config directory
UPLOAD_FOLDER = cfg.UPLOAD_FOLDER
SAVE_DIR = cfg.SAVE_DIR
FACE_CROP_DIR = cfg.FACE_DIR

""" Recognizion detected parts in ID """
config = Cfg.load_config_from_name('vgg_seq2seq') # OR vgg_transformer -> acc || vgg_seq2seq -> time
config['cnn']['pretrained']=False
config['device'] = cfg.DEVICE
config['predictor']['beamsearch']=False
detector = Predictor(config)

# Upload hình ảnh dự đoán
@app.post("/ocr-id")
async def upload(file: UploadFile = File(...), type: int = 1):
    INPUT_IMG = os.listdir(UPLOAD_FOLDER)
    if INPUT_IMG is not None:
        for uploaded_img in INPUT_IMG:
            os.remove(os.path.join(UPLOAD_FOLDER, uploaded_img))

    file_location = f"./{UPLOAD_FOLDER}/{file.filename}"
    contents = await file.read()
    with open(file_location, 'wb') as f:
        f.write(contents)
    
    # Validating file
    INPUT_FILE = os.listdir(UPLOAD_FOLDER)[0]
    if INPUT_FILE == 'NULL':
        os.remove(os.path.join(UPLOAD_FOLDER, INPUT_FILE))
        error = "No file selected!"
        return JSONResponse(status_code=404, content={"message": error})
    elif INPUT_FILE == 'WRONG_EXTS':
        os.remove(os.path.join(UPLOAD_FOLDER, INPUT_FILE))
        error = "This file is not supported!"
        return JSONResponse(status_code=415, content={"message": error})
    if type == 1:
        return await front_extract_info(file_location)
    elif type == 2:
        return await back_extract_info(file_location)
        
# Dự đoán các góc, xoay và cắt ảnh
async def corner_image(file_location):
    img = file_location
    CORNER = CORNER_MODEL_V5(img)
    # CORNER.save(save_dir='src/dataloader/check-test/test/')
    # CORNER.show()
    
    predictions = CORNER.pred[0]
    labels = predictions[:, 5].tolist()
    if len(labels) != 4:
        error = "Xác định các góc của giấy tờ không thành công!"
        return JSONResponse(status_code=404, content={"message": error})
    
    boxes = utils.class_Order(predictions[:, :4].tolist(), labels) # x1, x2, y1, y2
    IMG = Image.open(img)
    # IMG.show()
    center_points = list(map(utils.get_center_point, boxes))

    """ Temporary fixing """
    c2, c3 = center_points[2], center_points[3]
    c2_fix, c3_fix = (c2[0],c2[1]+30), (c3[0],c3[1]+30)
    center_points = [center_points[0], center_points[1], c2_fix, c3_fix]
    center_points = np.asarray(center_points)
    image_crop = utils.four_point_transform(IMG, center_points)
    # Convert from OpenCV to PIL format
    image_crop = Image.fromarray(image_crop)
    # Hình ảnh đã cắt 4 góc
    # image_crop.save('src/dataloader/check-test/test/')
    return image_crop 

# Dự đoán thông tin căn cước mặt trước
async def front_extract_info(file_location):
    # Hình ảnh đã được cắt góc
    image_crop = await corner_image(file_location)
    CONTENT = CONTENT_FRONT_MODEL_V5(image_crop)
    # CONTENT.save(save_dir='src/dataloader/check-test/test/')
    predictions = CONTENT.pred[0]
    labels = predictions[:, 5].tolist()  # Class
    if 7 not in labels:
        if len(labels) < 9:
            error = "Phát hiện thiếu thông tin giấy tờ!"
            return JSONResponse(status_code=400, content={"message": error})
    elif 7 in labels:
        if len(labels) < 10:
            error = "Phát hiện thiếu thông tin giấy tờ!"
            return JSONResponse(status_code=400, content={"message": error})

    boxes = predictions[:,:4].tolist()

    """ Non Maximum Suppression """
    boxes, labels = utils.non_max_suppression_fast(np.array(boxes), labels, 0.7)
    boxes = utils.class_Order(boxes, labels) # x1, x2, y1, y2
    if not os.path.isdir(SAVE_DIR):
        os.mkdir(SAVE_DIR)
    else:
        for f in os.listdir(SAVE_DIR):
            os.remove(os.path.join(SAVE_DIR, f))

    for index, box in enumerate(boxes):
        left, top, right, bottom = box
        if 5 < index < 9:
            # right = c3[0] 
            right = right + 100
        cropped_image = image_crop.crop((left,top,right,bottom))
        cropped_image.save(os.path.join(SAVE_DIR, f'{index}.jpg'))

    FIELDS_DETECTED = [] # Collecting all detected parts
    for idx, img_crop in enumerate(sorted(os.listdir(SAVE_DIR))):
        if idx > 0:
            img_ = Image.open(os.path.join(SAVE_DIR,img_crop))
            s = detector.predict(img_)
            FIELDS_DETECTED.append(s)

    if 7 in labels:
        FIELDS_DETECTED = FIELDS_DETECTED[:6] + [FIELDS_DETECTED[6] + ', ' + FIELDS_DETECTED[7]] + [FIELDS_DETECTED[8]]

    response = {
        "data": {
        "idNo": FIELDS_DETECTED[0],
        "name": FIELDS_DETECTED[1],
        "dateOfBirth": FIELDS_DETECTED[2],
        "sex": FIELDS_DETECTED[3],
        "nationality": FIELDS_DETECTED[4],
        "placeOfOrigin": FIELDS_DETECTED[5],
        "placeOfResidence": FIELDS_DETECTED[6],
        "idIssueExpDate": FIELDS_DETECTED[7]
        }
    }

    response = jsonable_encoder(response)
    return JSONResponse(content=response) 

# Dự đoán thông tin căn cước mặt sau
async def back_extract_info(file_location):
    
    # Hình ảnh đã được cắt góc
    image_crop = await corner_image(file_location)
    CONTENT = CONTENT_BACK_MODEL_V5(image_crop)
    CONTENT.save(save_dir='src/dataloader/check-test/test/')
    # CONTENT.show()
    predictions = CONTENT.pred[0]
    labels = predictions[:, 5].tolist()  # Class
    boxes = predictions[:,:4].tolist()

    """ Non Maximum Suppression """
    boxes, labels = utils.non_max_suppression_fast(np.array(boxes), labels, 0.7)
    boxes = utils.class_Order(boxes, labels) # x1, x2, y1, y2
    if not os.path.isdir(SAVE_DIR):
        os.mkdir(SAVE_DIR)
    else:
        for f in os.listdir(SAVE_DIR):
            os.remove(os.path.join(SAVE_DIR, f))

    for index, box in enumerate(boxes):
        left, top, right, bottom = box
        if 5 < index < 9:
            # right = c3[0] 
            right = right + 100
        cropped_image = image_crop.crop((left,top,right,bottom))
        cropped_image.save(os.path.join(SAVE_DIR, f'{index}.jpg'))

    FIELDS_DETECTED = [] # Collecting all detected parts
    for idx, img_crop in enumerate(sorted(os.listdir(SAVE_DIR))):
        # if idx > 0:
        img_ = Image.open(os.path.join(SAVE_DIR,img_crop))
        s = detector.predict(img_)
        FIELDS_DETECTED.append(s)

    if 2 in labels:
        FIELDS_DETECTED = FIELDS_DETECTED[:1] + [FIELDS_DETECTED[1] + ' ' + FIELDS_DETECTED[2]]

    response = {
        "data": {
        "idDate": FIELDS_DETECTED[0],
        "idIssuer": FIELDS_DETECTED[1],
        #"idIssuer2": FIELDS_DETECTED[2]
        }
    }

    response = jsonable_encoder(response)
    return JSONResponse(content=response) 

async def back_extract_info_yolo_v8(file_location):
    
    # Hình ảnh đã được cắt góc
    image_crop = await corner_image(file_location)
    CONTENT = CONTENT_BACK_MODEL_V8(image_crop)
    # CONTENT = CONTENT_BACK_MODEL_V8.predict(image_crop, conf=cfg.CONF_BACK_CONTENT_THRESHOLD_V8)
    # CONTENT.save(save_dir='src/dataloader/test/')
    
    res = CONTENT[0]
    img_array = res.plot()
    img = Image.fromarray(img_array[..., ::-1])
    # img.show()
    # img.save(save_dir='src/dataloader/check-test/image.jpg')
    
    labels = res.boxes.cls.tolist()
    boxes = res.boxes.xyxy.tolist()

    """ Non Maximum Suppression """
    boxes, labels = utils.non_max_suppression_fast(np.array(boxes), labels, 0.7)
    boxes = utils.class_Order(boxes, labels) # x1, x2, y1, y2
    if not os.path.isdir(SAVE_DIR):
        os.mkdir(SAVE_DIR)
    else:
        for f in os.listdir(SAVE_DIR):
            os.remove(os.path.join(SAVE_DIR, f))

    for index, box in enumerate(boxes):
        left, top, right, bottom = box
        if 5 < index < 9:
            # right = c3[0] 
            right = right + 100
        cropped_image = image_crop.crop((left,top,right,bottom))
        cropped_image.save(os.path.join(SAVE_DIR, f'{index}.jpg'))

        FIELDS_DETECTED = [] # Collecting all detected parts
        for idx, img_crop in enumerate(sorted(os.listdir(SAVE_DIR))):
            # if idx > 0:
            img_ = Image.open(os.path.join(SAVE_DIR,img_crop))
            s = detector.predict(img_)
            FIELDS_DETECTED.append(s)

        # if 2 in labels:
        #     FIELDS_DETECTED = FIELDS_DETECTED[:2]

    response = {
        "data": {
        "idDate": FIELDS_DETECTED[0],
        "idIssue": FIELDS_DETECTED[1],
        "idIssue2": FIELDS_DETECTED[2]
        }
    }

    response = jsonable_encoder(response)
    return JSONResponse(content=response)