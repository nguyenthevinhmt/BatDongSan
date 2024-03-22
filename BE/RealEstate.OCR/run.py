import uvicorn
from src.config.config import PORT

if __name__ == "__main__":
    uvicorn.run("src:app", host='0.0.0.0', port=int(PORT), reload=True) # workers=1