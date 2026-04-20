from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psutil
import uvicorn

app = FastAPI(title="KubeFlowX API", version="1.0.0")

# Enable CORS for cross-device testing
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for easier testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def health_check():
    return {"status": "healthy", "message": "KubeFlowX is running"}

@app.get("/cpu")
async def get_cpu_usage():
    cpu_percent = psutil.cpu_percent(interval=1)
    return {"cpu_usage_percent": cpu_percent}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)