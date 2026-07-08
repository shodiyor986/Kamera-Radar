import cv2
import json
import time

def start_ai_stream_analysis(source_url=0):
    """
    source_url = 0 -> Kompyuter veb-kamerasi
    Real tizimda bu yerga RTSP link beriladi (masalan: rtsp://admin:12345@192.168.1.50/live)
    """
    cap = cv2.VideoCapture(source_url)
    
    if not cap.isOpened():
        print(json.dumps({"status": "ERROR", "message": "Kamera oqimini ochib bo'lmadi"}))
        return

    print(json.dumps({"status": "STARTED", "message": "Python AI Core ishga tushdi"}))

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # [TEST REJIMI] Bu yerda OpenCV orqali oddiy kadr o'lchami tahlil qilinmoqda.
        # Haqiqiy AI model qo'yilganda (YOLOv8), bu yerda person/car obyektlari aniqlanadi.
        height, width, _ = frame.shape
        
        # Simulyatsiya logi
        ai_result = {
            "fps": 25,
            "resolution": f"{width}x{height}",
            "detected_objects": ["person" if time.time() % 5 == 0 else "none"]
        }
        
        # Kadrlarni ekranda ko'rish (Yopish uchun 'q' ni bosing)
        cv2.putText(frame, "AI ANALYSIS ACTIVE", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
        cv2.imshow('POLICE AI CORE STREAM', frame)
        
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # Mahalliy kamerani test qilish uchun ishga tushirish
    start_ai_stream_analysis(0)
