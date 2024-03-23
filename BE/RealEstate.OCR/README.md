
Sản phẩm nhận diện giấy tờ tùy thân với loại CCCD mới


## **Cài đặt**
Chạy các thư viện cần có bằng lệnh sau

``` bash
pip install -r requirements.txt
```
## **Chạy Project**
Chạy project

``` python
python run.py
```

## **Sử dụng**
Sau khi chạy project mở với port

``` path
http://localhost:8080/docs
```
Trong đó: type= 1 là mặt trước, 2 là mặt sau.

- Dữ liệu được custom và export dataset trên [roboflow](https://universe.roboflow.com/)
- Colab train mô hình yolov5 [tại đây](https://colab.research.google.com/github/roboflow-ai/yolov5-custom-training-tutorial/blob/main/yolov5-custom-training.ipynb#scrollTo=eaFNnxLJbq4J)
- Colab train mô hình yolov8 [tại đây](https://colab.research.google.com/github/roboflow-ai/notebooks/blob/main/notebooks/train-yolov8-object-detection-on-custom-dataset.ipynb)
## **Mô tả**
- Sản phẩm sử dụng mô hình YOLOv5, YOLOv8 để dự đoán 4 góc của căn cước và nội dụng của giấy tờ.
- Xử dụng một số phương pháp để xử lý ảnh và cắt thông tin ảnh
- Sử dụng mô hình [VietOCR](https://universe.roboflow.com/) để dự đoán thông tin nội dung
- FastAPI để viết API
